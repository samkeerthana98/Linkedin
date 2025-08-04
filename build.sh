#!/usr/bin/env bash

# Exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Change to backend directory for Django commands
cd project/backend

# Collect static files
python project/backend/manage.py collectstatic --no-input

# Run migrations
python project/backend/manage.py migrate
