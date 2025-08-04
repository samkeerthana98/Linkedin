#!/usr/bin/env bash

# Install dependencies
pip install -r requirements.txt

# Change to backend directory for Django commands
cd project/backend

# Collect static files
python manage.py collectstatic --no-input

# Run migrations
python manage.py migrate
