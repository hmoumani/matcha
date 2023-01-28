sudo docker-compose  up -d
pip install -r requirements.txt
python3 init_tables.py
python3 generate_data.py