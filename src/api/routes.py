"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200








@api.route("/login",methods=["POST"])
def login():
      email = request.json.get("email", None)
      password = request.json.get("password", None)
      user=User.query.filter_by(email=email).first()
      print(user) 
      if user is None:
          return jsonify({"msg":"not found"} )           
      
      if user.password != password :
         return jsonify({"msg": "Bad username or password"}), 401

      access_token = create_access_token(identity=email)
      return jsonify(access_token=access_token)   




@api.route("/signup", methods=["POST"])
def signup():
    body = request.get_json()    
    # email = request.json.get("email", None)
    # password = request.json.get("password", None)

    if not body or not body.get("email") or not body.get("password") :
        return jsonify({"msg": "Email y contraseña son requeridos"}), 400
    
    existing_user = User.query.filter_by(email=body["email"]).first()

    if existing_user:
        return jsonify({"msg": "Usuario ya existe"}), 400

           
    new_user = User(
        email=body["email"],  
        password=body["password"],                                    
        is_active=True     
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "Usuario creado con éxito"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al crear usuario", "error": str(e)}), 500


    
