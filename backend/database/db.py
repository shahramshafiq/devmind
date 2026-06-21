import datetime
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker
from config import DATABASE_URL

Base = declarative_base()


class RunRecord(Base):
    __tablename__ = "runs"
    id             = Column(Integer, primary_key=True, index=True)
    issue_title    = Column(String(500))
    issue_number   = Column(Integer)
    repo_name      = Column(String(200))
    review_decision = Column(String(20))
    iterations     = Column(Integer)
    pr_url         = Column(String(500), nullable=True)
    pr_title       = Column(String(500), nullable=True)
    pr_body        = Column(Text, nullable=True)
    tests_passed   = Column(Integer, nullable=True)
    tests_failed   = Column(Integer, nullable=True)
    tests_total    = Column(Integer, nullable=True)
    created_at     = Column(DateTime, default=datetime.datetime.utcnow)


engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)


def init_db():
    Base.metadata.create_all(bind=engine)


def save_run(data: dict):
    db = SessionLocal()
    record = RunRecord(**data)
    db.add(record)
    db.commit()
    db.close()


def get_history(limit: int = 50):
    db = SessionLocal()
    rows = db.query(RunRecord).order_by(RunRecord.created_at.desc()).limit(limit).all()
    result = []
    for r in rows:
        result.append({
            "id":              r.id,
            "issue_title":     r.issue_title,
            "issue_number":    r.issue_number,
            "repo_name":       r.repo_name,
            "review_decision": r.review_decision,
            "iterations":      r.iterations,
            "pr_url":          r.pr_url,
            "pr_title":        r.pr_title,
            "pr_body":         r.pr_body,
            "tests_passed":    r.tests_passed,
            "tests_failed":    r.tests_failed,
            "tests_total":     r.tests_total,
            "created_at":      r.created_at.isoformat() if r.created_at else None,
        })
    db.close()
    return result
