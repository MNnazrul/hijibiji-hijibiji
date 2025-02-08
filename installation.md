Install MySQL on Fedora

1. Open a terminal and update your package manager:
   sudo dnf update -y
2. Install MySQL server:
   sudo dnf install mysql-server -y
3. Start the MySQL service:
   sudo systemctl start mysqld
4. Enable MySQL to start on boot:
   sudo systemctl enable mysqld

5. Verify MySQL is running:
   systemctl status mysqld
6. Log into MySQL:
   mysql -u root -p

Install Django and MySQL Client in a Virtual Environment

1. Install venv if not installed:
   sudo dnf install python3-venv -y
2. Create a project folder and navigate into it:
   mkdir django-mysql-auth
   cd django-mysql-auth
3. Create a virtual environment and activate it:

```
   python3 -m venv venv
   source venv/bin/activate # On Fedora/Linux
```

4.Once you have the requirements.txt file, install all dependencies in your virtual environment by running:

pip install -r requirements.txt

1. install django Project.
   django-admin startproject my-auth .
2. migration :
   python manage.py migrate
3. run django project
   python manage.py runserver

# install again :

- sudo dnf install mysql-devel python3-devel

# mysql query:

1. root
   mysql -u root -p
2. show dbs
   SHOW DATABASES;
3. go specific dbs:
   USE database_name;
4. show tables:
   show tables;
