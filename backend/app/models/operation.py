from app import db

class Operation(db.Model):
    __tablename__ = 'operations'
    
    id = db.Column(db.Integer, primary_key=True)
    report_id = db.Column(db.Integer, db.ForeignKey('drilling_reports.id'))
    start_time = db.Column(db.String(50))
    end_time = db.Column(db.String(50))
    hours = db.Column(db.Float)
    phase = db.Column(db.String(50))
    activity = db.Column(db.String(200))
    depth_from = db.Column(db.Float)
    depth_to = db.Column(db.Float)
