## Installation

Note: This installation assumes you have **Python, Pip,** and **Node** installed. Both client and API were created in a Unix environment in case of compatibility issues.

Clone the repository:

```
git clone https://github.com/WebFrameworks-F21/semester-project-michaella-alex.git
```

Open the repository and run

```
pip install -r requirements.txt
cd client-racks
npm install
```

## Running

Set up the database and back-end server

```
cd Racks
python manage.py migrate
python manage.py createsuperuser
```

Follow the prompts to create your account. Run the command below to start the back-end server.

```
python manage.py runserver
```

Using a separate shell, use the command below to start the front-end server.

```
cd client-racks
npm start
```

You can access the client app with the link below:

```
http://localhost:3000/login
```
