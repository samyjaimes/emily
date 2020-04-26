import ast

from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from sqlalchemy import create_engine

db_connect = create_engine('sqlite:///emily.db')
app = Flask(__name__)
api = Api(app)


class Profiles(Resource):

    def map_goals(self):
        conn = db_connect.connect()
        query = conn.execute('select * from goals')

        return {row[1]: row[0] for row in query.cursor.fetchall()}

    def get(self, profile_id=None):
        response = []

        conn = db_connect.connect()

        if profile_id:
            query = conn.execute('select * from profiles where profile_id=%s' % profile_id)
        else:
            query = conn.execute('select * from profiles')

        if query:
            goals = self.map_goals()
            for row in query.cursor.fetchall():
                response.append({
                    'name': row[0],
                    'age': row[1],
                    'goals': [goals[goal_id] for goal_id in ast.literal_eval(row[2])],
                    'profile_id': row[3]
                })

        return response


api.add_resource(Profiles, '/profiles', '/profiles/<int:profile_id>')

if __name__ == '__main__':
     app.run(port='5000')
