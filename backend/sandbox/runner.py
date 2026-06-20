import os
import re
import sys
import subprocess
import tempfile


def parse_files(text):
    pattern = r'FILE:\s*(.+?)\n```[^\n]*\n(.*?)```'
    matches = re.findall(pattern, text, re.DOTALL)
    result = {}
    for filepath, content in matches:
        filepath = filepath.strip()
        content = content.strip()
        if filepath and content:
            result[filepath] = content
    return result


def _write_file(tmpdir, filepath, content):
    abs_path = os.path.join(tmpdir, filepath)
    dir_path = os.path.dirname(abs_path)
    if dir_path != tmpdir:
        os.makedirs(dir_path, exist_ok=True)
        init_path = os.path.join(dir_path, "__init__.py")
        if not os.path.exists(init_path):
            open(init_path, "w").close()
    with open(abs_path, "w", encoding="utf-8") as f:
        f.write(content)


def run_tests(code_changes_text, tests_text):
    if not tests_text or not tests_text.strip():
        return {
            "ran": False, "passed": False,
            "total": 0, "passed_count": 0, "failed_count": 0,
            "output": "No tests generated.", "error": None
        }

    code_files = parse_files(code_changes_text or "")
    test_files = parse_files(tests_text)

    if not test_files:
        raw_blocks = re.findall(r'```(?:python)?\n(.*?)```', tests_text, re.DOTALL)
        combined = "\n\n".join(raw_blocks).strip() if raw_blocks else tests_text.strip()
        if combined:
            test_files = {"test_generated.py": combined}

    if not test_files:
        return {
            "ran": False, "passed": False,
            "total": 0, "passed_count": 0, "failed_count": 0,
            "output": "Could not parse test files from QA output.", "error": None
        }

    with tempfile.TemporaryDirectory() as tmpdir:
        conftest = os.path.join(tmpdir, "conftest.py")
        with open(conftest, "w") as f:
            f.write("import sys, os\nsys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))\n")

        for filepath, content in code_files.items():
            _write_file(tmpdir, filepath, content)

        for filepath, content in test_files.items():
            _write_file(tmpdir, filepath, content)

        try:
            proc = subprocess.run(
                [sys.executable, "-m", "pytest", "-v", "--tb=short", "--no-header"],
                cwd=tmpdir,
                capture_output=True,
                text=True,
                timeout=60
            )
            output = (proc.stdout + proc.stderr).strip()

            passed_count = 0
            failed_count = 0

            m_pass = re.search(r'(\d+) passed', output)
            m_fail = re.search(r'(\d+) failed', output)
            m_err  = re.search(r'(\d+) error', output)

            if m_pass:
                passed_count = int(m_pass.group(1))
            if m_fail:
                failed_count += int(m_fail.group(1))
            if m_err:
                failed_count += int(m_err.group(1))

            total = passed_count + failed_count
            passed = proc.returncode == 0 and failed_count == 0

            return {
                "ran": True, "passed": passed,
                "total": total, "passed_count": passed_count, "failed_count": failed_count,
                "output": output[:4000],
                "error": None
            }

        except subprocess.TimeoutExpired:
            return {
                "ran": True, "passed": False,
                "total": 0, "passed_count": 0, "failed_count": 0,
                "output": "Tests timed out after 60 seconds.", "error": "timeout"
            }
        except Exception as exc:
            return {
                "ran": False, "passed": False,
                "total": 0, "passed_count": 0, "failed_count": 0,
                "output": str(exc), "error": "exception"
            }
