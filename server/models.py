from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
import pdb

from config import db, metadata, bcrypt

metadata = metadata
db = db

class Swimmer(db.Model, SerializerMixin):
    __tablename__ = "swimmers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey("teams.id"))

    #relationships
    times = db.relationship("Time", back_populates="swimmer", cascade="all, delete-orphan")
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
    @validates("time")
    def validates_time(self, key, new_time):
        if not new_time:
            new_time = 0.00
        elif float(new_time) > 1000:
            raise ValueError("Time must be submitted in total seconds. Time can have 3 digits before the decimal, and 2 digits after.")

        new_time = round(float(new_time), 2)
        return new_time
   
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey("teams.id"))
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, new_password_string):
        byte_object = new_password_string.encode('utf-8')
        encrypted_hash_object = bcrypt.generate_password_hash(byte_object)
        hash_object_as_string = encrypted_hash_object.decode('utf-8')
        self._password_hash = hash_object_as_string

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    #relationships
    team = db.relationship("Team", back_populates="user")
    swimmers = association_proxy("team", "swimmer")

    #validations
    @validates("team_id")
    def validates_team(self, key, new_team_id):
        if not new_team_id:
            raise ValueError("A user must be affiliated with a team")
        else:
            return new_team_id

    @validates("first_name")
    def validates_first_name(self, key, new_first_name):
        if not new_first_name:
            raise ValueError("A first name must be provided")
        elif len(new_first_name) > 15:
            raise ValueError("A name must be shorter than 15 characters")
        else: 
            return new_first_name
        
    @validates("last_name")
    def validates_last_name(self, key, new_last_name):
        if not new_last_name:
            raise ValueError("A last name must be provided")
        elif len(new_last_name) > 20:
            raise ValueError("A last name must be shorter than 20 characters")
        else:
            return new_last_name
        
    @validates("username")
    def validates_username(self, key, new_username):
        if not new_username:
            raise ValueError("A username must be provided")
        elif len(new_username) > 20:
            raise ValueError("A username must be shorter than 15 characters")
        else: 
            existing_user = User.query.filter(new_username == User.username).first()
            if existing_user:
                raise ValueError("That username already exists")
            
            return new_username
        
    @validates("_password_hash")
    def validates_password(self, key, new_password):
        if not new_password:
            raise ValueError("Please set a password")
        has_letter = False
        has_number = False

        for char in new_password:
            if char.isalpha():
                has_letter = True
            elif char.isdigit():
                has_number = True

            if has_letter and has_number:
                break
            
        if not (has_letter and has_number):
            raise ValueError("Password must contain at least one letter AND at least one number")
        
        return new_password