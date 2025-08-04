#!/usr/bin/env bash
set -o errexit
pip install -r requirements.txt
cd project/backend
python project/backend/manage.py collectstatic --no-input
python project/backend/manage.py migrate
