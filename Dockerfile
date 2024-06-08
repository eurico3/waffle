FROM python:3.11


WORKDIR /app
COPY . ./

RUN pip install -r requirements.txt

EXPOSE 8080

# Define environment variable
ENV PORT 8080

# Run app.py when the container launches
#CMD python app.py

# Run gunicorn with gevent when the container launches
CMD ["gunicorn", "-k", "gevent", "-w", "1", "-b", "0.0.0.0:8080", "app:app"]