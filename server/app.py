#!/usr/bin/env python3

from flask import request, make_response, session
from flask_restful import Resource
from config import app, db, api
from models import User, Goal, Habit, Task
app.secret_key = b'\xf6\xd03L\x0fq%\xbat\xe0\x15r\x054\xbe\xcc'

@app.route('/')
def index():
    return '<h1>Phase 5 Project Server</h1>'

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            return make_response(user.to_dict(), 200)
        else:
            return make_response({'message': 'User not found'}, 401)
        
api.add_resource(UserById, '/users/<int:id>')

class Goals(Resource):
    def post(self):
        try:
            data = request.get_json()
            new_goal = Goal(
                name = data['name'],
                details = data['details'],
                user_id = data['user_id']
            )
            db.session.add(new_goal)
            db.session.commit()
            return make_response(new_goal.to_dict(), 201)
        except ValueError as e:
            return make_response({"error": str(e)}, 400)

api.add_resource(Goals, '/goals')

class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return make_response(user.to_dict(), 200)
        else:
            return make_response({'message': '401: Not Authorized'}, 401)

api.add_resource(CheckSession, '/check_session')

class Login(Resource):
    def post(self):
        user = User.query.filter(User.username == request.get_json()['username']).first()
        if user:
            user_pass = User.authenticate(user, request.get_json()['password'])
        else:
            return make_response({"error": "User not found"}, 400)
        if user_pass == True:
            session['user_id'] = user.id
            return make_response(user.to_dict(), 200)
        else:
            return make_response({"error": "Username or password incorrect"}, 400)
    
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({'message': '204: No Content'}, 204)

api.add_resource(Logout, '/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

