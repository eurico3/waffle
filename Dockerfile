FROM python:3.11


WORKDIR /app
COPY . ./

RUN pip install -r requirements.txt

EXPOSE 8080

# Define environment variable
ENV PORT 8080

# Run app.py when the container launches
CMD ["python", "app.py"]