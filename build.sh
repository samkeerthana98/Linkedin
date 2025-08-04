#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Change to backend directory for Django commands
cd project/backend

python project/backend/manage.py collectstatic --no-input
python manage.py collectstatic --no-input

# Run migrations
python project/backend/manage.py migrate
python manage.py migrate

