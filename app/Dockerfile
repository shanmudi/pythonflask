# Use python 3 image
FROM python:3

# Get Python script
WORKDIR /var/app
COPY hello.py .

# Install dependencies
RUN pip install --upgrade pip
RUN pip install Flask
RUN pip install gunicorn

# Open Port
EXPOSE 80

#Run File
# CMD ["python", "hello.py"]
CMD ["gunicorn", "hello:app", "--bind", "0.0.0.0:80"]
