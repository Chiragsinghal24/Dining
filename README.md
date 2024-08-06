# Dining

# Requirements 
<br>Node.js<br>
PostgreSQL

# initialize nodejs project
<br>mkdir dining<br>
cd dining<br>
npm init -y<br>

# install the necessary packages as:
<br>npm install express pg bcryptjs jsonwebtoken body-parser<br>
npm install --save-dev nodemon<br>
npm install dotenv<br>

# make a .env file having the following this as madnatory:
<br>ACCESS_TOKEN_SECRET=''<br>
USER_NAME=''<br>
HOST_NAME='localhost'<br>
DB_NAME=''<br>
DB_PASSWORD=''<br>
PORT_NUMBER='5432'<br>

fill the all details as per your database connection

# set up the postgress sql database as:

CREATE DATABASE dining;<br>

![image](https://github.com/user-attachments/assets/90ccd961-147d-45c5-8f0c-03de137f1407)
![image](https://github.com/user-attachments/assets/0dffe585-2c53-4a2d-92dd-4daf97fda9e1)<br>

# Facing a syntax error in creating a table(error):
<br>![image](https://github.com/user-attachments/assets/88c31a7d-5e5b-47ee-a0fc-d3a6c2c44fca)<br>

# Solving error:
<br>![image](https://github.com/user-attachments/assets/33a5d3f8-a153-4ef3-a862-84355afcacfe)



# for run the server
npx nodemon src/index.js


# i used thunder client in vs code to run the api's to get check the response of it:
# first Api Name:. Register a User
<br>api url to write in the thunderclient as make the request as POST: http://localhost:3000/api/signup<br>
![image](https://github.com/user-attachments/assets/326a4b98-b264-434e-9fcb-b24f95636e77)

# second Api Name:. login user
api url to write in the thunderclient as make the request as POST: http://localhost:3000/api/login<br>
![image](https://github.com/user-attachments/assets/ed5d503d-244d-4720-b669-0502a7fc3d55)
<br>

due to the time constraints i am unable to add all the screenshots, i am adding all the thunder client urls<br>
# third Api Name:. add a new dining place
<br>http://localhost:3000/api/dining-place/create<br>

# fourth Api Name:. Search Dining Places by Name
<br>http://localhost:3000/api/dining-place?name={search_query}<br>

# fifth Api Name: Get Dining Place Availability
<br>http://localhost:3000/api/dining-place/availability<br>

# sixth: Make a booking
<br>https://localhost:3000/api/dining-place/book<br>


