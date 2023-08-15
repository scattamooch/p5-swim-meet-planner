#!/usr/bin/env python3

# Standard library imports
import random

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import Swimmer, Team, Event, Time, User, db

def seed_users():
    user = User(
        first_name="Sean",
        last_name="Stevens",
        username="Sstevens",
        password="password1",
        team_id=4 
    )

    db.session.add(user)
    db.session.commit()

def create_swimmers(teams):
    fake = Faker()

    for team in teams:
        for _ in range(20):
            first_name = fake.first_name_male()
            last_name = fake.last_name()
            swimmer_name = f"{first_name} {last_name}"
            swimmer = Swimmer(name=swimmer_name, team=team)

            db.session.add(swimmer)  
            db.session.commit()

def create_times():
    all_swimmers = Swimmer.query.all()
    all_events = Event.query.all()

    for swimmer in all_swimmers:
        for event in all_events:
            if "50" in event.name and event.name != "500 Freestyle":
                time = round(random.uniform(20.0, 30.0), 2)
            elif event.name == "100 Freestyle":
                time = round(random.uniform(48.0, 60.0), 2)
            elif event.name in ("100 Backstroke", "100 Butterfly"):
                time = round(random.uniform(52.0, 65.0), 2)
            elif event.name == "100 Breaststroke":
                time = round(random.uniform(57.0, 75.0), 2)
            elif event.name == "200 Freestyle":
                time = round(random.uniform(108.0, 135.0), 2)
            elif event.name == "200 IM":
                time = round(random.uniform(117.0, 145.0), 2)
            elif event.name == "500 Freestyle":
                time = round(random.uniform(300.0, 390.0), 2)
            elif event.name in ("200 Freestyle Relay", "200 Medley Relay"):
                time = round(random.uniform(130.0, 150.0), 2)
            elif event.name == "400 Freestyle Relay":
                time = round(random.uniform(192.0, 240.0), 2)
            else:
                time = round(random.uniform(50.0, 300.0), 2)  # Default range

            time_entry = Time(swimmer=swimmer, event=event, time=time)
            db.session.add(time_entry)
            db.session.commit()
            
if __name__ == "__main__":
    with app.app_context():
        print("Clearing db...")
        User.query.delete()
        Swimmer.query.delete()
        Team.query.delete()
        Event.query.delete()
        Time.query.delete()

        print("Seeding teams...")
        teams = [Team(name=team_name) for team_name in [
            "Charleston", "Cherry Valley", "Covered Bridge",
            "Erlton", "Fox Hollow", "Old Orchard"
        ]]
        db.session.add_all(teams)
        db.session.commit()

        print("Seeding swimmers...")
        create_swimmers(teams)

        print("Seeding events...")
        events = [Event(name=event_name) for event_name in [
            "200 Freestyle", "200 IM", "50 Freestyle",
            "100 Butterfly", "100 Freestyle", "500 Freestyle", 
            "100 Backstroke", "100 Breaststroke", "50 Backstroke",
            "50 Breaststroke", "50 Butterfly"
        ]]
        db.session.add_all(events)
        db.session.commit()

        print("Seeding times...")
        create_times()

        print("Seeding users...")
        seed_users()
        
        print("Done seeding!")
