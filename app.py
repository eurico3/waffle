from flask import Flask, render_template, url_for
import websocket
import json
import pandas as pd
from flask_socketio import SocketIO
from threading import Lock
import random
import os

endpoint = 'wss://stream.binance.com:9443/ws/!miniTicker@arr'

thread = None
thread_lock = Lock()

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')

def df_import(data):
    global btc
    global times
    #Creating DF
    df_ = pd.DataFrame(data)
    #Filtering BTC USDT
    df_ = df_[df_['s'].str.endswith('BTCUSDT')]
    #Convert to float
    df_.c = df_.c.astype(float)
    #Convert to int - da erro - temos que converter para float
    df_.E = df_.E.astype(float)
    #df_.E = df_.E.astype(int)
    #df_.E = pd.to_datetime(df_['E'],unit='ms')
    #Selecting Columns
    final = df_[['s','E','c']]
    #Print
    #print(final.iloc[-1].c)
    btc = final.iloc[-1].c
    times = final.iloc[-1].E

    socketio.emit('updateData', {'btc': btc, 'times':times})
    #socketio.emit('updateData', {'btc': btc})
    #socketio.emit('updateData', {'times':times})
    #print(times)
   


def on_message(wd,message):
    global out
    out = json.loads(message)
    df_import(out)

@app.route('/', methods=['GET', 'POST'])
def principal():

	return render_template("linecharts.html")

@app.route('/linecharts')
def linecharts():
	return render_template("linecharts.html")


def background_thread():
   
    while True:
        ws = websocket.WebSocketApp(endpoint, on_message=on_message)
        ws.run_forever()

    

        #socketio.sleep(0.1)



"""
Decorator for connect
"""
@socketio.on('connect')
def connect():
    print('Client connected')
    global thread
    with thread_lock:
        if thread is None:
            thread = socketio.start_background_task(background_thread)

"""
Decorator for disconnect
"""
@socketio.on('disconnect')
def disconnect():
    print('Client disconnected')



if __name__ == '__main__':
    #socketio.run(app)
    socketio.run(app, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
	#app.run(debug=True)
	#app.run(debug=False,port=8080,host="0.0.0.0")