## Installation

Note: This installation assumes you have **Python, Pip,** and **Node** installed. Both client and API were created in a Unix environment.

Clone the repository:

```
git clone https://github.com/WebFrameworks-F21/semester-project-michaella-alex.git
```

Open the repoistory and run

```
pip install -r requirements.txt
cd client-racks
npm install
```

## Running

Start Django by running

```
cd Racks
python manage.py migrate
python manage.py createsuperuser
```

Follow the prompts to create your account. Finally run the following command to start the back-end server.

```
python manage.py runserver
```

Using a separate shell, use the following command to start the front-end server.

```
cd client-racks
npm start
```

You can access the client app with the link below:

```
http://localhost:3000/login
```
