# Use the official Python image from the Docker Hub
FROM python:3.8-slim

# Set environment variables to prevent Python from writing pyc files and buffering stdout and stderr
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Copy the requirements file into the working directory
COPY requirements.txt /app/

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the working directory
COPY . /app/

# Expose the port the app runs on
EXPOSE 8080

# Run the application
CMD ["python", "app.py"]
