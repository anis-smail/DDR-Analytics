from flask import Blueprint, request, jsonify
from app.models.drilling_report import DrillingReport
from app import db

bp = Blueprint('reports', __name__, url_prefix='/api/reports')

@bp.route('/', methods=['GET'])
def get_reports():
    reports = DrillingReport.query.all()
    return jsonify([{
        'id': r.id,
        'report_id': r.report_id,
        'date': r.date.isoformat(),
        'rig_name': r.rig_name,
        'well_name': r.well_name,
        'current_depth': r.current_depth,
        'tvd': r.tvd
    } for r in reports])

@bp.route('/', methods=['POST'])
def create_report():
    data = request.json
    report = DrillingReport(
        report_id=data['report_id'],
        rig_name=data['rig_name'],
        well_name=data['well_name'],
        current_depth=data['current_depth'],
        tvd=data['tvd']
    )
    db.session.add(report)
    db.session.commit()
    return jsonify({'id': report.id}), 201
