from flask import Blueprint, request, jsonify
from models.project_model import Project, PermissionEnum
from models.user_model import User
from flask_jwt_extended import jwt_required,get_jwt_identity
from decorator.decorator import group_required

project_bp = Blueprint('projects', __name__)


@project_bp.route('/create-project', methods=['POST'])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def create_project():
    user_id = get_jwt_identity()
    owner = User.objects(id=user_id).first()

    if not owner:
        return jsonify({'error': 'Owner not found'}), 404

    data = request.json
    project = Project(
        title=data['title'],
        content=data.get('content', ''),
        owner=owner,
        shared_user_ids=[],
        shared_user_permissions=[]
    )
    project.save()

    return jsonify({
        'message': 'Project created',
        'project_id': str(project.id)
    }), 201


@project_bp.route('/add-member', methods=['POST'])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def add_member():
    data = request.json
    project = Project.objects(id=data.get('project_id')).first()
    user_email = data.get('email')
    permission = data.get('permission', 'view').lower()

    if not project or not user_email:
        return jsonify({'error': 'Project ID and email are required'}), 400

    user = User.objects(email=user_email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    if user in project.shared_user_ids:
        return jsonify({'message': 'User already shared with this project'}), 400

    try:
        permission_enum = PermissionEnum(permission)
    except ValueError:
        return jsonify({'error': 'Invalid permission'}), 400

    project.shared_user_ids.append(user)
    project.shared_user_permissions.append(permission_enum)
    project.save()

    return jsonify({
        'message': f'User {user.email} added to project {str(project.id)} with {permission_enum.value} permission'
    }), 200


@project_bp.route('/get-projects', methods=['GET'])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def get_projects():
    user_id = get_jwt_identity()
    user = User.objects(id=user_id).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    owned_projects = list(Project.objects(owner=user))
    shared_projects = list(Project.objects(shared_user_ids=user))

    all_projects = owned_projects + shared_projects

    project_list = [{
        "id": str(project.id),
        "title": project.title,
        "content": project.content,
        "owner": str(project.owner.id),
        "is_owner": project.owner == user,
        "shared_user_ids": [str(u.id) for u in project.shared_user_ids],
        "shared_user_permissions": [p.value for p in project.shared_user_permissions],
    } for project in all_projects]

    return jsonify({"projects": project_list}), 200



@project_bp.route('/project/<project_id>', methods=['GET'])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def get_project_by_id(project_id):
    user_id = get_jwt_identity()
    user = User.objects(id=user_id).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    project = Project.objects(id=project_id).first()
    if not project:
        return jsonify({'error': 'Project not found'}), 404

    if project.owner != user and user not in project.shared_user_ids:
        return jsonify({'error': 'Access denied'}), 403

    project_data = {
        "id": str(project.id),
        "title": project.title,
        "content": project.content,
        "owner": str(project.owner.id),
        "is_owner": project.owner == user,
        "shared_user_ids": [str(u.id) for u in project.shared_user_ids],
        "shared_user_permissions": [p.value for p in project.shared_user_permissions],
    }

    return jsonify(project_data), 200

