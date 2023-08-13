#!/bin/bash

# Get the machine's IP address
# ip=$(ip -4 addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}')

# # Define the search and replace strings
# search="localhost:"
# replace="$ip:"

# # Find and replace in Python files (*.py)
# find . -type f -name "*.py" -exec sed -i "s/$search/$replace/g" {} +

# # Find and replace in JavaScript files (*.js)
# find . -type f -name "*.js" -exec sed -i "s/$search/$replace/g" {} +

# # Find and replace in environment files (*.env)
# find . -type f -name "*.env" -exec sed -i "s/$search/$replace/g" {} +

# # Find and replace in TypeScript files (*.ts)
# find . -type f -name "*.ts" -exec sed -i "s/$search/$replace/g" {} +

docker-compose down -v
docker-compose up -d #--build
pip3 install -r requirements.txt
sleep 5
python3 init_tables.py
python3 generate_data.py
echo Waiting for database to start...;
sleep 20;
echo Matcha is running;