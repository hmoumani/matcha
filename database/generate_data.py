import init_tables
from faker import Faker
import pickupLinesList
from utils import random_cor, tags
# generate users profile


fake = Faker()
first_names = []
last_names = []
users = []
nicknames = []
emails = []
settings = []
user_tags = []
users_images = []
images_file_name = [str(i) + ".jpg" for i in range(1, 2227)]
for i in range(len(tags)):
    tag = {
        'id': i + 1,
        'value': tags[i],
    }
    init_tables.session.add(init_tables.Tag(**tag))
init_tables.session.commit()

for i in range(742):
    while  (nickname := fake.user_name()) in nicknames:
        continue
    nicknames.append(nickname)
    while  (email := fake.email()) in emails:
        continue
    emails.append(email)
    user = {
        "id": i + 1,
        "first_name": fake.first_name(),
        "last_name": fake.last_name(),
        "age": fake.random_int(min=18, max=40),
        "fame_rate": fake.random_int(min=5, max=10),
        "email": emails[-1],
        "biography": pickupLinesList.arr[i % len(pickupLinesList.arr)],
        "gender": ['male', 'female'][fake.random_int(min=0, max=1)],
        "sexual_orientation": ['male', 'female', 'both'][fake.random_int(min=0, max=2)],
        "username": nicknames[-1],
        "last_connection": fake.date_time(),
        "is_email_verified": True,
        "is_auto_locator_enabled": True,
        'password': '123456',
        'location': f'{{"lat": {random_cor[i]["lng"]}, "lng": {random_cor[i]["lat"]}}}',
    }
    users.append(user)
    settings.append({
        'user_id': i + 1,
        'min_age': 18,
        'max_age': fake.random_int(min=18, max=40),
        'min_fame_rating': fake.random_int(min=1, max=5),
        'max_fame_rating': fake.random_int(min=5, max=10),
        'location': f'{{"lat": {random_cor[i]["lng"]}, "lng": {random_cor[i]["lat"]}}}',
        'common_tags':"[]",
        'sort_by':'location'
    })
    tags_backup = []
    for j in range(fake.random_int(min=2, max=5)):
        while (tag_id := fake.random_int(min=1, max=len(tags))) in tags_backup:
            continue
        tags_backup.append(tag_id)
        user_tags.append({
            'user_id': i + 1,
            'tag_id': tags_backup[-1],
        })
    users_images.append([{
        'user_id': i + 1,
        'value': images_file_name.pop(fake.random_int(min=0, max=len(images_file_name) - 1)),
    } for j in range(3)])

for user in users:
    init_tables.session.add(init_tables.User(**user))
init_tables.session.commit()
for setting in settings:
    init_tables.session.add(init_tables.UserSearchSettings(**setting))
init_tables.session.commit()
for user_tag in user_tags:
    init_tables.session.add(init_tables.UserTag(**user_tag))
init_tables.session.commit()
for user_images in users_images:
    for image in user_images:
        init_tables.session.add(init_tables.Image(**image))
init_tables.session.commit()



