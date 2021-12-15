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
python manage.py makemigrations
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
npm install
npm start
```

You can access the client app with the link below:

```
http://localhost:3000/login
```

### Client-App User Manual

**Note: The app does not keep any user sessions, do not refresh the page whatsoever to stay logged in.**

First, create an account. You will be directed into the login page, but you can create an account using the link located at the bottom of the sign-up box.

After logging in, you can either use the dashboard or the navigation bar to check out the available racks, objects and networks.

## Racks

You can view the available racks here and can view the racks individually by clicking on their rack names. You can create new racks with the button located under above the table.

By looking at a specified rack, you can see the objects listed and where they are located inside the rack itself as well as rack details (space, visibility, who created it). There are also buttons to update and delete it.

You can access objects listed on the rack by clicking on their object names.

## Objects

You can view the available object here and can view the objects individually by clicking on their object names. You can create new objects with the button located under above the table.

By looking at a specified objects, you can see the objects listed and where they are located inside their designated rack. There are also buttons to update and delete it.

Based on the different types of objects, it will show details accordingly. Server objects have an extra table that holds network cards, as well as the option to create new ones as well.

Note: Before creating a new network card, a network must be created beforehand. you will not be able to create a networkcard without one.

## Networks

You can view the available networks here and can view the networks individually by clicking on their network names You can create new networks with the button located under above the table.

By looking at a specified network, you can see the network cards on the network listed. There are also buttons to update and delete the network itself.
