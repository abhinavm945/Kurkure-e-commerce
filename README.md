E-Commerce Website with Microservices Architecture

Overview



https://github.com/user-attachments/assets/7bf6b017-2a56-4abd-b349-2b4d5a1c2552


This project is a fully functional e-commerce platform developed using a microservices architecture. Each service is dedicated to a specific functionality and runs independently. The services are:

UserAuth: Handles user authentication.

UserDetails: Manages user profile information.

Products: Manages the product catalog.

Cart: Handles cart operations.

Orders: Manages user orders.

Payment Gateway: Handles payment processing.

The frontend of the website includes a machine learning model integrated into a Python terminal for recommendations, with terminal outputs provided as screenshots in this README.

Table of Contents

Technologies Used

Architecture

Prerequisites

Installation and Setup

Starting the Services

Frontend Machine Learning Integration

Demo Video

Screenshots

Technologies Used

Backend: Node.js, Express.js

Database: MongoDB

Frontend: React.js, Bootstrap

Machine Learning: Python, scikit-learn

API Communication: REST APIs

Architecture

Each service in the microservices architecture communicates with the others using REST APIs. Here are the port allocations:


Prerequisites

Ensure the following software is installed on your system:

Node.js and npm

Postgres PgAdmiv 

Python (version 3.8 or higher)

Installation and Setup

Clone the repository:

git clone <repository-url>

Install dependencies for each service:

cd services/UserAuth
npm install
cd ../UserDetails
npm install
cd ../Products
npm install
cd ../Cart
npm install
cd ../Orders
npm install
cd ../PaymentGateway
npm install

Starting the Services

Each service can be started independently. Run the following commands in separate terminals:

UserAuth:

cd services/UserAuth
nodemon start

UserDetails:

cd services/UserDetails
nodemon start

Products:

cd services/Products
nodemon start

Cart:

cd services/Cart
nodemon start

Orders:

cd services/Orders
nodemon start

Payment Gateway:

cd services/PaymentGateway
nodemon start

Ensure Postgres Aiven Cloud service is running before starting the services.

Frontend Machine Learning Integration

The frontend includes a recommendation system powered by a Python-based machine learning model. To run this:

Navigate to the Machiine_Learning directory:

cd Machiine_Learning

Install the required Python libraries:

pip install -r requirements.txt

Start the machine learning script:

python Postgres_data.py

The terminal will display recommendations based on the provided input.

Demo Video

A demo video showcasing the project is attached here.

Screenshots

Terminal Outputs from Machine Learning Model
![Screenshot (185)](https://github.com/user-attachments/assets/7e1dd288-e922-4387-b2b3-c26d8792f56f)
![Screenshot (184)](https://github.com/user-attachments/assets/5701c6fe-14ae-485c-a2c8-d5a4032dd574)
![Screenshot (183)](https://github.com/user-attachments/assets/9de1a26f-782f-4413-9b0b-ff3501542a7b)
![Screenshot (182)](https://github.com/user-attachments/assets/4aad2d63-5aaa-48b5-b3e6-b2f0b9ee1426)


Sample Input:



Web Application

Homepage:


Product Page:


Notes

The services are loosely coupled, making it easy to scale and maintain.

Docker configuration files are provided to containerize the services for easier deployment.

For any issues, create a GitHub issue or contact the project maintainer.

License

This project is licensed under the MIT License. See the LICENSE file for more details
