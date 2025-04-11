from flask import Blueprint, request, jsonify
from mongoengine import DoesNotExist
from models.project_model import Project, User, PermissionEnum
from models.user_model import User
from bson import ObjectId

project_bp = Blueprint('projects', __name__)


@project_bp.route('/create', methods=['POST'])
def create_project():
    data = request.json

    try:
        owner = User.objects.get(id=data['owner_id'])
    except DoesNotExist:
        return jsonify({'error': 'Owner not found'}), 404

    project = Project(
        title=data['title'],
        content=data.get('content', ''),
        owner=owner,
        shared_user_ids=[],
        shared_user_permissions=[]
    )
    project.save()
    return jsonify({'message': 'Project created', 'project_id': str(project.id)}), 201


@project_bp.route('/add-member', methods=['POST'])
def add_member():
    data = request.json
    project_id = data['project_id']
    user_id = data['user_id']
    permission = data.get('permission', 'view').lower()

    try:
        project = Project.objects.get(id=project_id)
        user = User.objects.get(id=user_id)
    except DoesNotExist:
        return jsonify({'error': 'Project or User not found'}), 404

    if user in project.shared_user_ids:
        return jsonify({'message': 'User already shared with this project'}), 400

   
    project.shared_user_ids.append(user)
    project.shared_user_permissions.append(PermissionEnum(permission))
    project.save()

    return jsonify({'message': f'User {user_id} added to project {project_id} with {permission} permission'}), 200
