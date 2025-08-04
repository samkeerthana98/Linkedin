#!/usr/bin/env bash
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Collect static files
python project/backend/manage.py collectstatic --no-input

# Apply migrations
python project/backend/manage.py migrate
