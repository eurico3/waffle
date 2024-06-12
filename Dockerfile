# Use the official Python image from the Docker Hub
FROM python:3.11

WORKDIR /app
COPY . ./
# Copy the requirements file into the working directory
#COPY requirements.txt /app/

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt



# Expose the port the app runs on
EXPOSE 8080

# Run the application
CMD ["python", "app.py"]
