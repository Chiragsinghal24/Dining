# Dining

Requirements
Node.js<br>
PostgreSQL

# initialize nodejs project
mkdir dining
cd dining
npm init -y

# install the necessary packages as:
npm install express pg bcryptjs jsonwebtoken body-parser
npm install --save-dev nodemon
npm install dotenv

# make a .env file having the following this as madnatory:
ACCESS_TOKEN_SECRET=''
USER_NAME=''
HOST_NAME='localhost'
DB_NAME=''
DB_PASSWORD=''
PORT_NUMBER='5432'

fill the all details as per your database connection

# set up the postgress sql database as:

CREATE DATABASE dining;

![image](https://github.com/user-attachments/assets/90ccd961-147d-45c5-8f0c-03de137f1407)
![image](https://github.com/user-attachments/assets/0dffe585-2c53-4a2d-92dd-4daf97fda9e1)

# Facing a syntax error in creating a table(error):
![image](https://github.com/user-attachments/assets/88c31a7d-5e5b-47ee-a0fc-d3a6c2c44fca)

# Solving error:
![image](https://github.com/user-attachments/assets/33a5d3f8-a153-4ef3-a862-84355afcacfe)



# for run the server
npx nodemon src/index.js


# i used thunder client in vs code to run the api's to get check the response of it:
# first Api Name:. Register a User
api url to write in the thunderclient as make the request as POST: http://localhost:3000/api/signup
![image](https://github.com/user-attachments/assets/326a4b98-b264-434e-9fcb-b24f95636e77)

# second Api Name:. login user
api url to write in the thunderclient as make the request as POST: http://localhost:3000/api/login
![image](https://github.com/user-attachments/assets/ed5d503d-244d-4720-b669-0502a7fc3d55)


due to the time constraints i am unable to add all the screenshots, i am adding all the thunder client urls
# third Api Name:. add a new dining place
http://localhost:3000/api/dining-place/create

# fourth Api Name:. Search Dining Places by Name
http://localhost:3000/api/dining-place?name={search_query}

# fifth Api Name: Get Dining Place Availability
http://localhost:3000/api/dining-place/availability

# sixth: Make a booking
https://localhost:3000/api/dining-place/book


