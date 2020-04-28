import os
import ast

from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine

file_path = os.path.abspath(os.getcwd())
db_connect = create_engine('sqlite:///%s/emily.db' % file_path)
app = Flask(__name__)
api = Api(app)


class Files(Resource):

    def get_mode(self, path, file_):
        filepath = os.path.join(path, file_)
        file_status = os.stat(filepath)
        return oct(file_status.st_mode)[-3:]

    def get(self):
        result = {}
        path = os.path.abspath(os.getcwd())
        above = path + '/..'

        for r, d, f in os.walk(above):
            for file_ in f:
                if file_ in ('run.py', 'emily.db'):
                    result.update({
                        r: {
                            'directories': d,
                            'files': {f_2: self.get_mode(r, f_2) for f_2 in f}
                        }
                    })

        result.update({'emily.db': file_path})
        return result


class Profiles(Resource):

    def map_goals(self, reverse=False):
        conn = db_connect.connect()
        query = conn.execute('select * from goals')

        if reverse:
            result = {row[0]: row[1] for row in query.cursor.fetchall()}
        else:
            result = {row[1]: row[0] for row in query.cursor.fetchall()}

        return result

    def get(self, profile_id=None):
        response = []

        conn = db_connect.connect()

        if profile_id:
            query = conn.execute('select * from profiles where profile_id=%s' % profile_id)
        else:
            query = conn.execute('select * from profiles')

        goals_mapping = self.map_goals()
        for row in query.cursor.fetchall():
            response.append({
                'name': row[0],
                'age': row[1],
                'goals': [goals_mapping[goal_id] for goal_id in ast.literal_eval(row[2])],
                'profile_id': row[3]
            })

        return response
    
    def post(self):
        name = request.json['name']
        age = int(request.json['age']) if request.json['age'] else None
        goals_list = request.json['goals']
        goals_mapping = self.map_goals(reverse=True)
        goals = str([goals_mapping[goal] for goal in goals_list.split(',')])

        if name and age and goals_list:
            conn = db_connect.connect()
            query = conn.execute('insert into profiles values (\'%s\',\'%d\',\'%s\', null)' % (name, age, goals))
            message = 'created new profile'
        else:
            message = 'invalid data'

        return {'status': message}

    def put(self, profile_id):
        name = request.json['name']
        age = request.json['age']
        goals_list = request.json['goals']
        goals_mapping = self.map_goals(reverse=True)
        goals = ','.join([goals_mapping[goal] for goal in goals_list])

        conn = db_connect.connect()
        query = conn.execute('upadate profiles set '
                             'name = %s, age = %d, goals = %s '
                             'where profile_id=%d' % (name, age, goals, profile_id))

        return {'status': 'updated profile id %d' % profile_id}

    def delete(self, profile_id):
        conn = db_connect.connect()
        query = conn.execute('delete from profiles where profile_id=%d' % profile_id)

        return {'status': 'profile id %d has been removed' % profile_id}


class Schedules(Resource):

    def get(self):
        conn = db_connect.connect()

        query_schedules = conn.execute(
            'select '
            '       title, '
            '       act.activity_id, '
            '       duration, '
            '       act_sch.start_time, '
            '       act_sch.end_time, '
            '       pr_sch.profile_id '
            'from '
            '     activities as act '
            'join activities_schedule as act_sch '
            '    on act.activity_id = act_sch.activity_id '
            'join profile_schedule as pr_sch '
            '    on act_sch.schedule_id = pr_sch.schedule_id; '
        )

        active_schedules = {}
        for row in query_schedules.cursor.fetchall():
            title = row[0]
            activity_id = row[1]
            duration = row[2]
            start_time = row[3]
            end_time = row[4]
            profile_id = row[5]

            activity = {
                'title': title,
                'activity_id': activity_id,
                'start_time': start_time,
                'end_time': end_time
            }

            profile_activity = active_schedules.setdefault(profile_id, [])
            profile_activity.append(activity)

        return active_schedules


api.add_resource(Profiles, '/api/profiles', '/api/profiles/<int:profile_id>')
api.add_resource(Schedules, '/api/schedules')
api.add_resource(Files, '/api/files')

if __name__ == '__main__':
     app.run(debug=True)
