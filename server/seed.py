#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Post

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # reste tables
        db.drop_all()
        db.create_all()
        

        print("Seeding users...")
        for _ in range(5):
            user = User(
                username=fake.user_name(),
                character_top=randint(0,5),
                character_mid=randint(0,5),
                character_bot=randint(0,5),
            )
            user.password_hash = '123'
            db.session.add(user)
            db.session.commit()

        print("seeding posts...")
        for _ in range(30):
            post = Post(
                title=fake.paragraph(nb_sentences=randint(1,2)),
                content=fake.paragraph(nb_sentences=randint(5,10)),
                user_id=randint(1,5)
            )
            db.session.add(post)
            db.session.commit()
        
        print("Seeding Done")