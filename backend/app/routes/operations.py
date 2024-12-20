from flask import Blueprint, request, jsonify
from app import db

bp = Blueprint('operations', __name__, url_prefix='/api/operations')

@bp.route('/', methods=['GET'])
def get_operations():
    return jsonify({"message": "Operations endpoint"})

@bp.route('/', methods=['POST'])
def create_operation():
    # TODO: Implement operation creation
    return jsonify({'status': 'success'}), 201
