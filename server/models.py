from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db, metadata

metadata = metadata
db = db

class Swimmer(db.Model, SerializerMixin):
    __tablename__ = "swimmers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey("teams.id"))

    #relationships
    times = db.relationship("Time", back_populates="swimmer")
    event = association_proxy("times", "event")
    team = db.relationship("Team", back_populates="swimmer")


    #validations
    

class Team(db.Model, SerializerMixin):
    __tablename__ = "teams"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    #relationships
    swimmer = db.relationship("Swimmer", back_populates="team")
    user = db.relationship("User", back_populates="team")

    #validations
        

class Event(db.Model, SerializerMixin):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    #relationships
    times = db.relationship("Time", back_populates="event")
    swimmer = association_proxy("times", "swimmer")

    #validations
    
    
class Time(db.Model, SerializerMixin):
    __tablename__ = "times"

    id = db.Column(db.Integer, primary_key=True)
    swimmer_id = db.Column(db.Integer, db.ForeignKey("swimmers.id"))
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"))
    time = db.Column(db.Numeric(precision=5, scale=2))

    #relationships
    swimmer = db.relationship("Swimmer", back_populates="times")
    event = db.relationship("Event", back_populates="times")

    #validations


    
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey("teams.id"))
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    #relationships
    team = db.relationship("Team", back_populates="user")
    swimmers = association_proxy("team", "swimmer")

    #validations


