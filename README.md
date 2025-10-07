# Project Name: Online-Grocery-Shopping
**Project Description:**

The Online Grocery Shopping System is a digital platform that allows customers to purchase groceries and household items conveniently through the internet. Instead of visiting physical stores, users can browse products, compare prices, add items to their virtual cart, and place orders online from the comfort of their homes.

This system simplifies the grocery shopping experience by integrating product listings, cart management, secure online payments, and home delivery services in one platform. It provides a user-friendly interface for customers to search and purchase products and an efficient backend for administrators to manage inventory.

Customers can register or log in, explore various product categories and complete their purchase using multiple payment options like credit/debit cards, UPI, or net banking. Once an order is confirmed, it is processed by the store’s backend team for packaging and delivery.

The system is built using modern web technologies — typically with React.js on the frontend, Node.js and Express.js on the backend, and a MongoDB database to store user and product data securely. Authentication is handled using JWT (JSON Web Tokens) to ensure safe access.

Overall, the Online Grocery Shopping System provides a convenient, time-saving, and efficient way for customers to shop for everyday essentials while helping grocery stores expand their reach through digital transformation.

**Step-by-step: Build & run with Docker Compose**

Step 1: **Specify requirements in the Docker file for the Backend and Frontend**

**Backend (server/Dockerfile) — (Node):**

**Docker file for Backend**

FROM node:20.19.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node","index.js"]


**Frontend (client/Dockerfile)-(React):**

**Docker file for Frontend**

FROM node:20.19.1

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev", "--host"]

Step 2: **Place a Docker Compose file at the project root**

**Docker Compose file**

services:

  mongodb:
  
    image: mongo:latest
    
    container_name: mongodb
    
    ports:
    
      - 27017:27017
      
    volumes:
    
      - mongo_volume:/data/db
      
  api:
  
    image: api
    
    container_name: api
    
    depends_on:
    
      - mongodb
      
    build: 
    
      context: server
      
      dockerfile: ./Dockerfile
      
    ports:
    
      - 6000:6000

  ui:
  
    image: ui
    
    container_name: ui
    
    depends_on:
    
      - api
      
    build:
    
      context: ui
      
      dockerfile: ./Dockerfile
      
    ports:
    
      - 4000:4000
      
volumes:

  mongo_volume:
  

Step 3:**Build & run**

**Build images and start**

docker compose up --build

Step 4:**Verify service status & logs**

docker compose ps

**Open in browser:**

Frontend: http://localhost:4000

Step 5:

Step 6:**Stop**

docker compose down




