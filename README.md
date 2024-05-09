# IBM Capstone Project

This repository contains the code for the IBM Capstone Project. Below are the steps to set up and start the application.

## Step 1: Cloning the Repository

```git clone https://github.com/vishal-ravindran/IBM_Capstone_Project.git```


Step 2: Preparing Backend (Django) and Virtual Environment

cd IBM_Capstone_Project/server/
pip install virtualenv
virtualenv djangoenv
source djangoenv/bin/activate
python3 -m pip install -U -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate 
python3 manage.py runserver


Step 3: Building Frontend (React)
cd /home/project/IBM_Capstone_Project/server/frontend
npm install
npm run build

Step 4: Containerization (Docker) and MongoDB


cd /home/project/IBM_Capstone_Project/server/database
docker build . -t nodeapp
docker-compose up
