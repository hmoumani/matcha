from sqlalchemy.sql import func
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, Integer, String, ForeignKey, create_engine, DateTime
from sqlalchemy.orm import sessionmaker

engine = create_engine("postgresql://matcha:password@localhost:5432/matcha", echo=True)

Base = declarative_base()

class User(Base):
	__tablename__ = "users"

	id = Column(Integer, primary_key=True)
	username = Column(String, unique=True, nullable=False, index=True)
	email = Column(String, unique=True, nullable=False, index=True)
	password = Column(String, nullable=False)
	first_name = Column(String, nullable=False)
	last_name = Column(String, nullable=False)
	images = relationship("Image", back_populates="user")
	biography = Column(String, nullable=True)
	gender_id = Column(Integer, ForeignKey("genders.id"))
	last_location = Column(String, nullable=True)
	age = Column(Integer, nullable=True)
	last_connection = Column(String, nullable=True)
	created_at = Column(DateTime(timezone=True), server_default=func.now())

	
class Gender(Base):
	__tablename__ = "genders"
	id = Column(Integer, primary_key=True)
	name = Column(String, nullable=False)
	created_at = Column(DateTime(timezone=True), server_default=func.now())
	
	
class SexualPreference(Base):
	__tablename__ = "sexual_preferences"
	id = Column(Integer, primary_key=True)
	user_id = Column(Integer, ForeignKey("users.id"))
	gender_id = Column(Integer, ForeignKey("genders.id"))
		

class Tag(Base):
	__tablename__ = "tags"
	id = Column(Integer, primary_key=True)
	value = Column(String, nullable=False)
	created_at = Column(DateTime(timezone=True), server_default=func.now())
	

class UserTag(Base):
	__tablename__ = "user_tags"
	id  = Column(Integer, primary_key=True)
	tag_id = Column(Integer, ForeignKey("tags.id"))
	user_id = Column(Integer, ForeignKey("users.id"))
	created_at = Column(DateTime(timezone=True), server_default=func.now())
	

class UserView(Base):
	__tablename__ = "user_views"
	id = Column(Integer, primary_key=True)
	user_id = Column(Integer, ForeignKey("users.id"))
	receiver_id = Column(Integer, ForeignKey("users.id"))
	created_at = Column(DateTime(timezone=True), server_default=func.now())


class UserLike(Base):
	__tablename__ = "user_likes"
	id = Column(Integer, primary_key=True)
	user_id = Column(Integer, ForeignKey("users.id"))
	receiver_id = Column(Integer, ForeignKey("users.id"))
	created_at = Column(DateTime(timezone=True), server_default=func.now())


class ReportedUser(Base):
	__tablename__ = "reported_users"
	id = Column(Integer, primary_key=True)
	user_id = Column(Integer, ForeignKey("users.id"))
	receiver_id = Column(Integer, ForeignKey("users.id"))
	reason = Column(String, nullable=False)
	created_at = Column(DateTime(timezone=True), server_default=func.now())

	
class BlockedUser(Base):
	__tablename__ = "blocked_users"
	id = Column(Integer, primary_key=True)
	blocker_id = Column(Integer, ForeignKey("users.id"))
	blocked_id = Column(Integer, ForeignKey("users.id"))
	created_at = Column(DateTime(timezone=True), server_default=func.now())

class Message(Base):
	__tablename__ = "messages"
	id = Column(Integer, primary_key=True)
	message = Column(String, nullable=False)
	sender_id = Column(Integer, ForeignKey("users.id"))
	receiver_id = Column(Integer, ForeignKey("users.id"))
	created_at = Column(DateTime(timezone=True), server_default=func.now())
	
class Notification(Base):
	__tablename__ = "notifications"
	id = Column(Integer, primary_key=True)
	seen = Column(Integer, nullable=False)
	sender_id = Column(Integer, ForeignKey("users.id"))
	receiver_id = Column(Integer, ForeignKey("users.id"))
	type = Column(Integer, nullable=False)
	content = Column(String, nullable=False)
	created_at = Column(DateTime(timezone=True), server_default=func.now())
	
	
class Image(Base):
	__tablename__ = "images"
	id = Column(Integer, primary_key=True)
	value = Column(String, nullable=False)
	created_at = Column(DateTime(timezone=True), server_default=func.now())
	

Base.metadata.create_all(engine)

# session = sessionmaker(engine)()


# for i in range(100):
#     image  = Image(value="image")
#     session.add(image)
# session.commit()
	# image.save()