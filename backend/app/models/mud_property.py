
from app import db

class MudProperty(db.Model):
    __tablename__ = 'mud_properties'
    
    id = db.Column(db.Integer, primary_key=True)
    report_id = db.Column(db.Integer, db.ForeignKey('drilling_reports.id'))
    weight = db.Column(db.Float)  # PCF
    funnel_viscosity = db.Column(db.Integer)  # seconds
    fluid_loss = db.Column(db.Float)
    pv = db.Column(db.Integer)  # Plastic Viscosity
    yp = db.Column(db.Integer)  # Yield Point
    ph = db.Column(db.Float)
    chlorides = db.Column(db.Integer)  # PPM