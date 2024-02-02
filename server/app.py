#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, render_template, session
from flask_restful import Resource, Api
from datetime import datetime

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Post

api = Api(app)
# Views go here! use either route!
@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

@app.errorhandler(500)
def internal_server_error(e):
    return render_template("index.html")

# localhost:5555/users GET
class Users(Resource):
    def get(self):
        users = [u.to_dict() for u in User.query.all()]
        return users, 200
    
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']
        password_confirmation = data['password_confirmation']
        character_top = data['character_top']
        character_mid = data['character_mid']
        character_bot = data['character_bot']

        if username and password == password_confirmation and character_top and character_mid and character_bot:
            newUser = User(username=username, 
                           character_top=character_top, 
                           character_mid=character_mid, 
                           character_bot=character_bot)
            newUser.password_hash = password
            db.session.add(newUser)
            db.session.commit()
            session["user_id"] = newUser.id

            return newUser.to_dict(), 201
        else:
            return {'error': 'Could not create user'}, 422

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            return user.to_dict(), 200
        else:
            return {'error': 'Could not find user'}, 404
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            try:
                for attr in request.get_json():
                    setattr(user, attr, request.get_json()[attr])

                db.session.add(user)
                db.session.commit()
                return user.to_dict(), 200
            
            except:
                return {'error': 'Could not update user'}, 422
        else:
            return {'error': 'Could not find user'}, 404
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return '', 204
        else:
            return {'error': 'Could not find user'}, 404
        
class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter_by(id=session.get('user_id')).first()

            return user.to_dict(), 200
        return {"error": "No active session"}, 404
    
class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']

        user = User.query.filter_by(username=username).first()
        if user.authenticate(password):
            session['user_id'] = user.id

            return user.to_dict(), 200
        return {'error': '401 Unauthorized'}, 401
    
class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session['user_id'] = None

            return {}, 204
        else:
            return {'Error': "Unauthorized/No login session"}
        
class Posts(Resource):
    def get(self):
        posts = [p.to_dict() for p in Post.query.all()]
        
        return posts, 200
    def post(self):
        data = request.get_json()
        user_id = session.get('user_id')
        title = data['title']
        content = data['content']

        if user_id and title and content:
            new_post = Post(user_id=user_id, title=title, content=content)

            db.session.add(new_post)
            db.session.commit()
            return new_post.to_dict(), 201
        else:
            return {"error": "Could not create new psot"}, 422

class PostById(Resource):
    def get(self, id):
        post = Post.query.filter_by(id=id).first()

        if post:
            return post.to_dict(), 200
        else:
            return {"error": "Could not find post"}, 404
    def patch(self, id):
        post = Post.query.filter_by(id=id).first()

        if post:
            try:
                for attr in request.get_json():
                    setattr(post, attr, request.get_json()[attr])
                    db.session.add(post)
                    db.session.commit()
                    return post.to_dict(), 200
            except:
                return {"error": "Could not update post"}, 422
        else:
            return {"error": "Could not find post"}, 404
    def delete(self, id):
        post = Post.query.filter_by(id=id).first()
        if post:
            db.session.delete(post)
            db.session.commit()
            return '', 204
        else:
            return {'error': 'Could not find post'}, 404

api.add_resource(Users, '/users', endpoint='users')
api.add_resource(UserById, '/users/<int:id>', endpoint='userById')

# api endpoints for sessions
api.add_resource(CheckSession, '/check_session', endpoint='checkSession')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Posts, '/posts', endpoint='post')
api.add_resource(PostById, '/posts/<int:id>', endpoint='postById')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

