from sqlalchemy.sql import func
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, Integer, String, ForeignKey, create_engine, DateTime, Boolean, UniqueConstraint, ARRAY
from sqlalchemy.orm import sessionmaker

engine = create_engine("postgresql://matcha:password@localhost:7777/matcha", echo=True)
session = sessionmaker(bind=engine)()
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
	gender = Column(String, nullable=True, default=None)
	sexual_orientation = Column(String, nullable=True, default="bisexual")
	location = Column(String, nullable=True)
	last_connection = Column(String, nullable=True)
	age = Column(Integer, nullable=True)
	is_email_verified = Column(Boolean)
	created_at = Column(DateTime(timezone=True), server_default=func.now())
	is_auto_locator_enabled = Column(Boolean, default=False)
	
	
class Image(Base):
	__tablename__ = "images"
	id = Column(Integer, primary_key=True)
	user_id = Column(Integer, ForeignKey("users.id"))
	value = Column(String, nullable=False)
	created_at = Column(DateTime(timezone=True), server_default=func.now())
	user = relationship("User", back_populates="images")


class UserSearchSettings(Base):
	__tablename__ = "user_settings"
	id = Column(Integer, primary_key=True)
	user_id = Column(Integer, ForeignKey("users.id"))
	min_age = Column(Integer,default=18)
	max_age = Column(Integer,default=20)
	min_fame_rating = Column(Integer,default=3)
	max_fame_rating = Column(Integer,default=10)
	location = Column(String, nullable=True)
	common_tags = Column(String, nullable=True)
	sort_by = Column(String, nullable=True)
	

class Tag(Base):
	__tablename__ = "tags"
	id = Column(Integer, primary_key=True)
	value = Column(String, nullable=False, unique=True)
	created_at = Column(DateTime(timezone=True), server_default=func.now())
	

class UserTag(Base):
	__tablename__ = "user_tags"
	id  = Column(Integer, primary_key=True)
	tag_id = Column(Integer, ForeignKey("tags.id"))
	user_id = Column(Integer, ForeignKey("users.id"))
	created_at = Column(DateTime(timezone=True), server_default=func.now())
	__table_args__ = (UniqueConstraint('user_id', 'tag_id', name='user_tags_user_id_tag_id'),
			)
	

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

class ValidationToken(Base):
    __tablename__ = "validation_tokens"
    id = Column(Integer, primary_key=True)
    token = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    token_type = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

if __name__ == "__main__":
	Base.metadata.create_all(engine)
