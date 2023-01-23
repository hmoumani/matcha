import init_tables
from faker import Faker

# generate users profile


fake = Faker()
first_names = []
last_names = []
users = []
nicknames = []
emails = []
for _ in range(1000):
    while  (nickname := fake.user_name()) in nicknames:
        continue
    nicknames.append(nickname)
    while  (email := fake.email()) in emails:
        continue
    emails.append(email)
    user = {
        "first_name": fake.first_name(),
        "last_name": fake.last_name(),
        "age": fake.random_int(min=18, max=40),
        "email": emails[-1],
        "biography": fake.text(max_nb_chars=200),
        "gender": ['male', 'female'][fake.random_int(min=0, max=1)],
        "sexual_orientation": ['bisexual', 'heterosexual'][fake.random_int(min=0, max=1)],
        "username": nicknames[-1],
        "location": '{}',
        "last_connection": fake.date_time(),
        "is_email_verified": True,
        "is_auto_locator_enabled": True,
        'password': '123456',
        'ip_address': fake.ipv4(),
    }
    users.append(user)

# for user in users:
#     init_tables.session.add(init_tables.User(**user))
#     init_tables.session.commit()
    

print(users)