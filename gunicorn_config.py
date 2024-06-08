bind = '0.0.0.0:5000'
workers = 1
worker_class = 'geventwebsocket.gunicorn.workers.GeventWebSocketWorker'
loglevel = 'info'
