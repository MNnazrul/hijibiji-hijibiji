Detailed Explanation of AbstractBaseUser and BaseUserManager in Django
Django provides a default User model, but when we need custom authentication (like email-based login), we use:

AbstractBaseUser → Creates a custom user model.
BaseUserManager → Helps in managing users properly (creating users and superusers).
🔹 AbstractBaseUser (Creating a Custom User Model)
What is AbstractBaseUser?
AbstractBaseUser is a base class provided by Django for creating custom user models. It:

Does NOT provide username, email, or other fields (we define them ourselves).
Provides essential authentication features like:
password handling
last_login tracking
check_password() method for authentication
🔹 When Should We Use AbstractBaseUser?
✅ When you want to replace Django’s default username-based authentication with email-based authentication.
✅ When you need a custom user model with extra fields like phone number, role, etc..
✅ When you want full control over authentication (instead of Django’s built-in system).

🛠️ Example Usage of AbstractBaseUser
python
Copy
Edit
from django.db import models
from django.contrib.auth.models import AbstractBaseUser

class User(AbstractBaseUser):
email = models.EmailField(unique=True)
first_name = models.CharField(max_length=50)
last_name = models.CharField(max_length=50)
is_active = models.BooleanField(default=True)
is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

🔍 How This Works
Replaces Django's default User model.
Uses email instead of username as the login field (USERNAME_FIELD = 'email').
Requires first name and last name during signup (REQUIRED_FIELDS).
Provides password authentication, but we must define our own user manager (BaseUserManager).
🔹 BaseUserManager (Managing Users & Superusers)
What is BaseUserManager?
Django does NOT create users automatically for custom models.
BaseUserManager helps us create and manage users manually.
Provides methods like:
create_user(email, password)
create_superuser(email, password)
🛠️ Example Usage of BaseUserManager
python
Copy
Edit
from django.contrib.auth.models import BaseUserManager

class CustomUserManager(BaseUserManager):
"""
Custom manager for handling user creation.
"""

    def create_user(self, email, first_name, last_name, password=None):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)  # Hashes the password
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, password):
        user = self.create_user(email, first_name, last_name, password)
        user.is_admin = True
        user.save(using=self._db)
        return user

🔍 How This Works
Defines create_user()

Ensures the email is required.
Hashes the password before saving.
Saves the user in the database.
Defines create_superuser()

Calls create_user().
Sets is_admin=True to grant admin permissions.
📌 Why Use AbstractBaseUser and BaseUserManager?
Feature AbstractBaseUser BaseUserManager
Creates a custom User model ✅ Yes ❌ No
Handles password authentication ✅ Yes ❌ No
Stores user information (email, name, etc.) ✅ Yes ❌ No
Manages user creation (create_user) ❌ No ✅ Yes
Manages superuser creation (create_superuser) ❌ No ✅ Yes
Used with USERNAME_FIELD = 'email' ✅ Yes ❌ No
🚀 Final Summary
✅ AbstractBaseUser
Creates a fully custom user model.
Uses email instead of username for authentication.
Handles password authentication but requires a manager (BaseUserManager).
✅ BaseUserManager
Manages user creation (create_user).
Manages superuser creation (create_superuser).
Ensures password hashing and validation.
