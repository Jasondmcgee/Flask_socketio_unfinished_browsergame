import sys
from flask import Flask, render_template, request
from flask_socketio import SocketIO, join_room, emit, send
from flask_assets import Bundle, Environment

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

js = Bundle('bullet.js','lava.js','stealth.js','collision.js','bush.js','draw.js','playerHandler.js', 'input.js', 'hero.js', 'socket.js', output='gen/main.js')

assets = Environment(app)

assets.register('main_js', js)

users = []
shots = []

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('message')
def handleMessage(msg):
    emit('chatroom', msg, broadcast=True)

@socketio.on('newplayer')
def addplayer(user):
    users.append(user)
    currentSocketId = request.sid
    print(currentSocketId, users)
    emit('players', users, brodcast=True)

@socketio.on('shooting')
def getting_shots(bullet):
    emit('allshots', bullet, brodcast=True)

#@socketio.on('deleteshot')
#def deleting_shots(allshots)
    #for i, shot in enumerate(shots):
     #   if shot[i] == allshots[i]:
      #      del shots[i]


@socketio.on('positions')
def updateplayerlist(player):
    for i, user in enumerate(users):
        if user['userid'] == player['userid']:
            users[i]=player
    emit('playermove', users, brodcast=True)

@socketio.on('disconnect')
def test_disconnect():
    currentSocketId = request.sid
    for i, user in enumerate(users):
        if user['userid'] == currentSocketId:
            del users[i]

if __name__ == '__main__':
    socketio.run(app, debug=True)