#!/usr/bin/env python3

from flask import request, make_response, session
from flask_restful import Resource
from config import app, db, api
from models import User, Goal, Habit, Task
import datetime
app.secret_key = b'\xf6\xd03L\x0fq%\xbat\xe0\x15r\x054\xbe\xcc'

@app.route('/')
def index():
    return '<h1>Phase 5 Project Server</h1>'

class Users(Resource):
    def post(self):
        try:
            data = request.get_json()
            new_user = User(
                username = data['username'],
                password_hash = data['password']
            )
            db.session.add(new_user)
            db.session.commit()
            return make_response(new_user.to_dict(), 201)
        except ValueError as e:
            return make_response({"error": str(e)}, 400)
api.add_resource(Users, '/users')

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            return make_response(user.to_dict(), 200)
        else:
            return make_response({'message': 'User not found'}, 401)
        
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        db.session.delete(user)
        db.session.commit()
        return make_response({}, 200)
    
api.add_resource(UserById, '/users/<int:id>')

class Goals(Resource):
    def post(self):
        try:
            data = request.get_json()
            new_goal = Goal()
            for key in data:
                if key == 'due_date':
                    # print(data[key])
                    year = int(data[key].split('/')[::-1][0])
                    day = int(data[key].split('/')[::-1][1])+2
                    month = int(data[key].split('/')[::-1][2])
                    # print(year,month,day)
                    setattr(new_goal, key, datetime.date(year,month,day))
                else:
                    setattr(new_goal, key, data[key])
            db.session.add(new_goal)
            db.session.commit()
            return make_response(new_goal.to_dict(), 201)
        except ValueError as e:
            return make_response({"error": str(e)}, 400)
        

api.add_resource(Goals, '/goals')

class GoalById(Resource):
    def patch(self, id):
        try:
            goal = Goal.query.filter_by(id=id).first()
            data = request.get_json()
            for key in data:
                if data[key] != '':
                    if key == "password":
                        key = "password_hash"
                        setattr(goal, key, data["password"])
                    else:
                        setattr(goal, key, data[key])
            db.session.add(goal)
            db.session.commit()
            return make_response(goal.to_dict(), 200)
        except ValueError as e:
            return make_response({"error": str(e)}, 400)
        
    def delete(self, id):
        goal = Goal.query.filter_by(id=id).first()
        db.session.delete(goal)
        db.session.commit()
        return make_response({}, 200)


api.add_resource(GoalById, '/goals/<int:id>')

class Habits(Resource):
    def post(self):
        try:
            data = request.get_json()
            new_habit = Habit()
            for key in data:
                setattr(new_habit, key, data[key])
            db.session.add(new_habit)
            db.session.commit()
            return make_response(new_habit.to_dict(), 201)
        except ValueError as e:
            return make_response({"error": str(e)}, 400)
        
api.add_resource(Habits, '/habits')

class HabitById(Resource):
    def patch(self, id):
        try:
            habit = Habit.query.filter_by(id=id).first()
            data = request.get_json()
            for key in data:
                if data[key] != '':
                    setattr(habit, key, data[key])
            db.session.add(habit)
            db.session.commit()
            return make_response(habit.to_dict(), 200)
        except ValueError as e:
            return make_response({"error": str(e)}, 400)
        
    def delete(self, id):
        habit = Habit.query.filter_by(id=id).first()
        db.session.delete(habit)
        db.session.commit()
        return make_response({}, 200)


api.add_resource(HabitById, '/habits/<int:id>')

class Tasks(Resource):
    def post(self):
        try:
            data = request.get_json()
            new_task = Task()
            for key in data:
                setattr(new_task, key, data[key])
            db.session.add(new_task)
            db.session.commit()
            return make_response(new_task.to_dict(), 201)
        except ValueError as e:
            return make_response({"error": str(e)}, 400)
        
api.add_resource(Tasks, '/tasks')

class TaskById(Resource):
    def patch(self, id):
        try:
            task = Task.query.filter_by(id=id).first()
            data = request.get_json()
            for key in data:
                if data[key] != '':
                    setattr(task, key, data[key])
            db.session.add(task)
            db.session.commit()
            return make_response(task.to_dict(), 200)
        except ValueError as e:
            return make_response({"error": str(e)}, 400)
        
    def delete(self, id):
        task = Task.query.filter_by(id=id).first()
        db.session.delete(task)
        db.session.commit()
        return make_response({}, 200)


api.add_resource(TaskById, '/tasks/<int:id>')

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

