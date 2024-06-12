
import eventlet

eventlet.monkey_patch()
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import random
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode='eventlet', cors_allowed_origins="*")

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit('message', {'data': 'Connected to the server'})

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('request_data')
def handle_request_data():
    data = {'value': random.randint(0, 100)}
    emit('data_response', data)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8080, debug=True)
