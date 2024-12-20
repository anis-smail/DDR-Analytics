from app import db
from datetime import datetime

class DrillingReport(db.Model):
    __tablename__ = 'drilling_reports'
    
    id = db.Column(db.Integer, primary_key=True)
    report_id = db.Column(db.String(100), unique=True)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    rig_name = db.Column(db.String(100))
    well_name = db.Column(db.String(100))
    current_depth = db.Column(db.Float)
    tvd = db.Column(db.Float)
    last_casing_size = db.Column(db.Float)
    operations = db.relationship('Operation', backref='report', lazy=True)
    mud_properties = db.relationship('MudProperty', backref='report', lazy=True)
