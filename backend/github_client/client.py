import re
from github import Github, GithubException
from config import GITHUB_TOKEN


def parse_issue_url(issue_url):
    pattern = r'github\.com/([^/]+)/([^/]+)/issues/(\d+)'
    match = re.search(pattern, issue_url)
    if not match:
        raise ValueError(f"Could not parse GitHub issue URL: {issue_url}")
    owner, repo_name, issue_number = match.groups()
    return owner, repo_name, int(issue_number)


def fetch_issue(repo_full_name, issue_number):
    g = Github(GITHUB_TOKEN)
    repo = g.get_repo(repo_full_name)
    issue = repo.get_issue(int(issue_number))
    return {
        "title": issue.title,
        "body": issue.body or "(No description provided.)",
        "number": issue.number,
        "state": issue.state
    }


def parse_code_changes(text):
    pattern = r'FILE:\s*(.+?)\n```[^\n]*\n(.*?)```'
    matches = re.findall(pattern, text, re.DOTALL)
    files = {}
    for filepath, content in matches:
        filepath = filepath.strip()
        content = content.strip()
        if filepath and content:
            files[filepath] = content
    return files


def create_pr(repo_full_name, issue_number, pr_title, pr_body, code_changes_text):
    g = Github(GITHUB_TOKEN)
    repo = g.get_repo(repo_full_name)

    default_branch = repo.default_branch
    base_sha = repo.get_branch(default_branch).commit.sha

    branch_name = f"devmind/issue-{issue_number}"
    try:
        repo.create_git_ref(ref=f"refs/heads/{branch_name}", sha=base_sha)
    except GithubException as err:
        if err.status != 422:
            raise

    files = parse_code_changes(code_changes_text)
    committed = []

    for filepath, content in files.items():
        try:
            existing = repo.get_contents(filepath, ref=branch_name)
            repo.update_file(
                path=filepath,
                message=f"devmind: update {filepath}",
                content=content,
                sha=existing.sha,
                branch=branch_name
            )
        except GithubException:
            repo.create_file(
                path=filepath,
                message=f"devmind: create {filepath}",
                content=content,
                branch=branch_name
            )
        committed.append(filepath)

    try:
        pr = repo.create_pull(
            title=pr_title or f"DevMind: fix issue #{issue_number}",
            body=pr_body,
            head=branch_name,
            base=default_branch
        )
        return {
            "pr_url": pr.html_url,
            "branch": branch_name,
            "files_committed": committed
        }
    except GithubException as e:
        if e.status == 422:
            owner = repo_full_name.split('/')[0]
            existing = repo.get_pulls(state='open', head=f'{owner}:{branch_name}')
            for pull in existing:
                return {
                    "pr_url": pull.html_url,
                    "branch": branch_name,
                    "files_committed": committed
                }
        raise
