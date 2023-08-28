#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource
import random

# Local imports
from config import app, db, api

# Add your model imports
from models import Swimmer, Team, Event, Time, User

# Views go here!

#Current routes:
# Get/Post Swimmers
# Get/Patch/Delete Swimmers by ID
# Get/Post Teams
# Get/Patch/Delete Teams by ID
# Get Times
# Get TimesBySwimmerId
# Get/Patch TimesById
# Get/Post Users
# Get/Patch/Delete Users by ID


@app.route('/')
def index():
    return '<h1>Phase 5 Project Server</h1>'

def create_times(swimmer):
    all_events = Event.query.all()

    for event in all_events:
        time = 0

        time_entry = Time(swimmer=swimmer, event=event, time=time)

        db.session.add(time_entry)
        db.session.commit()

class Swimmers(Resource):

    def get(self):
        return make_response([s.to_dict(only=("id", "name", "team_id", 
            "team.name", "times", "-times.swimmer", "-times.event", 
            "-times.swimmer_id", )) for s in Swimmer.query.all()], 200)

    # might have to come back here and ajust inputs for events/times, not sure 
    def post(self):
        data = request.json
        try:
            swimmer = Swimmer(
                name = data["name"],
                team_id = data["team_id"],
            )
        except ValueError as v_error:
            return make_response({"errors" : [str(v_error)]}, 400)
        
        db.session.add(swimmer)
        db.session.commit()

        create_times(swimmer)

        return make_response(swimmer.to_dict(only=("id", "name", "team_id", 
            "team.name", "times", "-times.swimmer", "-times.event", "-times.id", 
            "-times.swimmer_id", )), 201)

api.add_resource(Swimmers, "/swimmers")

class SwimmersById(Resource):

    def get(self, id):
        swimmer = Swimmer.query.filter(Swimmer.id == id).first()
        if not swimmer:
            return make_response({"Error" : "Swimmer not found"}, 400)
        else:
            return make_response(swimmer.to_dict(only=("id", "name", "team_id", 
            "team.name", "times", "-times.swimmer", "-times.event", 
            "-times.swimmer_id", )), 200)
        
    def patch(self, id):
        swimmer = Swimmer.query.filter(Swimmer.id == id).first()
        if not swimmer:
            return make_response({"Error" : "Swimmer not found"}, 404)
        else:
            data = request.json
            for attr in data:
                try:
                    setattr(swimmer, attr, data[attr])
                except ValueError as v_error:
                    return make_response({"errors" : [str(v_error)]}, 400)
                
            db.session.commit()
            return make_response(swimmer.to_dict(only=("id", "name", "team_id", 
            "team.name", "times", "-times.swimmer", "-times.event", "-times.id", 
            "-times.swimmer_id", )), 200)
        
    def delete(self, id):
        swimmer = Swimmer.query.filter(Swimmer.id == id).first()
        if not swimmer:
            return make_response({"Error" : "Swimmer not found"}, 404)
        else:
            db.session.delete(swimmer)
            db.session.commit()

            return make_response(f"{swimmer.name}, ID: {swimmer.id}, deleted successfully", 204)

api.add_resource(SwimmersById, "/swimmers/<int:id>")

class Teams(Resource):

    def get(self):
        return make_response([t.to_dict(only= (
            "id", "name", "swimmer.name", "-swimmer.team", ) ) for t in Team.query.all()], 200)
    
    def post(self):
        data = request.json
        try:
            team = Team(
                name = data["name"]
            )
        except ValueError as v_error:
            return make_response({"Errors" : [str(v_error)]}, 400)
        
        db.session.add(team)
        db.session.commit()

        # might have to include a function that assigns swimmers?
        return make_response(team.to_dict(only=(
            "id", "name", "swimmer.name", "-swimmer.team", )), 201)

api.add_resource(Teams, "/teams")

class TeamsById(Resource):

    def get(self, id):
        team = Team.query.filter(Team.id == id).first()
        if not team:
            return make_response({"Error" : "Team not found"}, 400)
        else:
            return make_response(team.to_dict(only= (
            "id", "name", "swimmer.name", "swimmer.id", "swimmer.times",
             "-swimmer.times.swimmer_id",
            "-swimmer.times.swimmer", "-swimmer.times.event", "-swimmer.team", )),
            200)
        
    def patch(self, id):
        team = Team.query.filter(Team.id == id).first()
        if not team:
            return make_response({"Error" : "Team not found"}, 404)
        else:
            data = request.json
            for attr in data:
                try:
                    setattr(team, attr, data[attr])
                except ValueError as v_error:
                    return make_response({"errors" : [str(v_error)]}, 400)
                
            db.session.commit()
            return make_response(team.to_dict(only= (
            "id", "name", "swimmer.name", "-swimmer.team", )), 200)
        
    def delete(self, id):
        team = Team.query.filter(Team.id == id).first()
        if not team:
            return make_response({"Error" : "Team not found"}, 404)
        else:
            db.session.delete(team)
            db.session.commit()

            return make_response(f"{team.name}, ID: {team.id}, deleted successfully", 204)    

api.add_resource(TeamsById, "/teams/<int:id>")

class Times(Resource):

    def get(self):
        return make_response([t.to_dict(only=("id", "swimmer_id", "event_id",
            "time", "swimmer.name", "event.name", )) for t in Time.query.all()], 200)

api.add_resource(Times, "/times")

class TimesBySwimmerId(Resource):

    def get(self, id):
        times = Time.query.filter(Time.swimmer_id == id).all()
        
        if not times:
            return make_response({"Error" : "Times not found"}, 400)
        else:
            serialized_times = []
            for time in times:
                serialized_times.append(time.to_dict(only=("id", "time", "swimmer.name", "event.name")))
            
            return make_response(serialized_times, 200)

api.add_resource(TimesBySwimmerId, "/times/swimmers/<int:id>")

class TimesById(Resource):

    def get(self, id):
        time = Time.query.filter(Time.id == id).first()
        if not time:
            return make_response({"Error" : "Time not found"}, 404)
        else:
            return make_response(time.to_dict(only=("id", "time", 
                "swimmer.name", "event.name")), 200)
        
    def patch(self, id):
       time = Time.query.filter(Time.id == id).first()
       if not time:
           return make_response({"Error" : "Time not found"}, 404)
       else: 
            data = request.json
            for attr in data:
                try:
                    setattr(time, attr, data[attr])
                except ValueError as v_error:
                    return make_response({"errors" : [str(v_error)]}, 400)
            
            db.session.commit()
            return make_response(time.to_dict(only=("id", "time", 
                "swimmer.name", "event.name")), 200)

api.add_resource(TimesById, "/times/<int:id>")

class Users(Resource):

    def get(self):
        return make_response([u.to_dict(only=("id", "team_id", "first_name", 
            "last_name", "username", "team.name", "swimmers.name", )) 
            for u in User.query.all()])
    
    def post(self):
        data = request.json
        try:
            user = User(
                team_id = data["team_id"],
                first_name = data["first_name"],
                last_name = data["last_name"],
                username = data["username"],
                password_hash = data["password_hash"],
            )
        except ValueError as v_error:
            return make_response({"Errors" : [str(v_error)]}, 422)
        
        db.session.add(user)
        db.session.commit()

        return make_response(user.to_dict(only=("id", "team_id", "first_name", 
            "last_name", "username", "team.name", "swimmers.name",)))

api.add_resource(Users, "/users")

class UsersById(Resource):

    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response({"Error" : "User not found"}, 404)
        else:
            return make_response(user.to_dict(only=("id", "team_id", "first_name", 
            "last_name", "username", "team.name", "swimmers.name",)), 200)
        
    def patch(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response({"Error" : "User not found"}, 404)
        else:
            data = request.json
            for attr in data:
                try:
                    setattr(user, attr, data[attr])
                except ValueError as v_error:
                    return make_response({"Errors" : [str(v_error)]}, 400)
        
            db.session.commit()
            return make_response(user.to_dict(only=("id", "team_id", "first_name", 
                "last_name", "username", "team.name", "swimmers.name",)), 200)

    def delete(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response({"Error" : "User not found"}, 404)
        else:
            db.session.delete(user)
            db.session.commit()

            return make_response(f"User: {user.first_name} {user.last_name}, ID: {user.id}, deleted successfully.", 204)

api.add_resource(UsersById, "/users/<int:id>")

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    try:
        user = User.query.filter_by(username=data['username']).first()
        if user.authenticate(data['password']):
            session['user_id'] = user.id
            response = make_response(user.to_dict(only=("id", "team_id", "first_name", 
            "last_name", "username", )), 200)
            return response
    except Exception as e:
        print("Error: ", str(e))
        return make_response({'error': 'name or password incorrect'}, 401)
    
@app.route('/whodat', methods=['GET'])
def authorize():
    try:
        user = User.query.filter_by(id=session.get('user_id')).first()
        response = make_response(user.to_dict(only=("id", "team_id", "first_name", 
            "last_name", "username", )), 200)
        return response
    except:
        return make_response({
            "error": "User not found"
        }, 404)
    
@app.route('/logout', methods=['DELETE'])
def logout():
    session['user_id'] = None
    return make_response('', 204)


# #################################################################
# roster builder endpoint
@app.route("/roster-builder", methods=["POST"])
def set_lineup():
    data = request.json
    opposing_lineup = data["oppsLineupSnapshot"]
    user_time_map = data["userTimeMap"]

    event_id_dict = {
        "free200": 1, "IM200": 2, "free50": 3, "fly100": 4, "free100": 5,
        "free500": 6, "back100": 7, "breast100": 8, "back50": 9, "breast50": 10,
        "fly50": 11,
    }

    event_combined_data = {}  # New dictionary to hold combined data
    
    for event_name, times in opposing_lineup.items():
        if "medley" in event_name.lower() or "relay" in event_name.lower():
            continue
        user_event_times = [{},{},{},{}]
        opps_data = []
        event_id = event_id_dict[event_name]
        user_team_times = user_time_map.get(str(event_id))
        opps_event_times = times.values()

        for opps_time in opps_event_times:
            fastest_time = 999
            fastest_time_index = -1
            if opps_time == "":
                continue
            
            for index, user_swimmer in enumerate(user_team_times):
                user_time = float(user_swimmer.get("time"))
                if user_time < fastest_time:
                    fastest_time = user_time
                    fastest_time_index = index
                if user_time < float(opps_time):
                    user_event_times.append(user_swimmer)
                    opps_data.append(opps_time)
                    del user_team_times[index]
                    break
                elif index == len(user_team_times) - 1:
                    opps_data.append(opps_time)
                    user_event_times.append(user_team_times[fastest_time_index])
                    del user_team_times[fastest_time_index]

        event_combined_data[event_name] = {
            "opposing_lineup": opps_data,
            "user_lineup": user_event_times
        }

    try:
        return make_response(event_combined_data, 200)
    except ValueError as v_error:
        return make_response([str(v_error)], 422)

if __name__ == '__main__':
    app.run(port=5555, debug=True)