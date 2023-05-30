docker-compose down -v
docker-compose up -d --build
pip3 install -r requirements.txt
sleep 5
python3 init_tables.py
python3 generate_data.py
echo Waiting for database to start...;
sleep 20;
echo Matcha is running;