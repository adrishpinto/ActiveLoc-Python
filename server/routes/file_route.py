from flask import Blueprint, jsonify
import os

file_bp = Blueprint("file_routes", __name__)
BASE_FOLDER = "all_files"  # Base directory
UPLOADS_FOLDER = os.path.join(BASE_FOLDER, "uploads")
CONVERTED_FOLDER = os.path.join(BASE_FOLDER, "converted")


@file_bp.route("/list-folders", methods=["GET"])
def list_folders():
    """List only folders inside all_files."""
    try:
        folders = [
            f for f in os.listdir(BASE_FOLDER) if os.path.isdir(os.path.join(BASE_FOLDER, f))
        ]
        return jsonify({"folders": folders})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@file_bp.route("/list-files", methods=["GET"])
def list_files():
    """List files inside uploads and converted folders."""
    try:
        files = {
            "uploads": os.listdir(UPLOADS_FOLDER) if os.path.exists(UPLOADS_FOLDER) else [],
            "converted": os.listdir(CONVERTED_FOLDER) if os.path.exists(CONVERTED_FOLDER) else [],
        }
        return jsonify(files)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
