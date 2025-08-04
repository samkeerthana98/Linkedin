#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Collect static files
python project/backend/manage.py collectstatic --no-input

# Run migrations
python project/backend/manage.py migrate
