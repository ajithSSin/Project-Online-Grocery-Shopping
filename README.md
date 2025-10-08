# Project Name: Online-Grocery-Shopping
**Project Description:**

The Online Grocery Shopping System is a digital platform that allows customers to purchase groceries and household items conveniently through the internet. Instead of visiting physical stores, users can browse products, compare prices, add items to their virtual cart, and place orders online from the comfort of their homes.

This system simplifies the grocery shopping experience by integrating product listings, cart management, secure online payments, and home delivery services in one platform. 

Customers can register or log in, explore various product categories and complete their purchase using multiple payment options like credit/debit cards, UPI. Once an order is confirmed, it is processed by the store’s backend team for packaging and delivery.

The system is built using modern web technologies — typically with React.js on the frontend, Node.js and Express.js on the backend, and a MongoDB database to store user and product data securely. Authentication is handled using JWT (JSON Web Tokens) to ensure secure access.

Overall, the Online Grocery Shopping System provides a convenient, time-saving, and efficient way for customers to shop for everyday essentials while helping grocery stores expand their reach through digital transformation.

**Requirements**

  Node.js API

  MongoDB database

  React frontend

Overall full-stack app (Node + MongoDB + React)


**Step-by-step: Build & run with Docker Compose**
**Docker Compose file**

**Specify requirements in the Docker file for the Backend and Frontend**

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

**Place a Docker Compose file at the project root**

**Docker Compose file**

      services: 
      
        mongodb:
        
          image: mongo:latest
          
          container_name: mongodb
          
          ports:
            - 27017:27017
            
          volumes:
            -mongo_volume:/data/db
      
        api:
        
          image: api
          
          container_name: api
          
          depends_on:
            - mongodb
            
          build:
            context: server
            
            dockerfile: ./Dockerfile
            
            ports:
              -8000:8000
        
        ui:
        
          image: ui
          
          container_name: ui
          
          depends_on:
            - api
            
          build:
            context:ui
            
            dockerfile: ./Dockerfile
            
          ports:
            - 3000:3000
      
        volumes:
          mongo_volume:
  

**How to run a Docker image**

Step 1: **Make sure Docker is installed**

        a)Go to the Docker website:
        
          👉 https://www.docker.com/products/docker-desktop

        b) Download Docker Desktop for your system (Windows or Mac).
            For Linux users: install Docker with 
            sudo apt install docker.io 
            and ensure it’s running.        
            
Step 2: **Open a Terminal / Command Prompt**

        Windows: open Command Prompt (search “cmd”)
        
        Mac: open Terminal (search “Terminal”)
        
        Linux: open Terminal
        
Step 3: **Build & run**

        *Build images and start*
        
        docker compose up --build    

Step 4: **Verify service status & logs**

        a) check for docker container
        
           docker ps -a
        
        b)to open an interactive terminal(shell) inside a running Docker container.
        
          docker exec -it (container-id) bash
          
        c) to view the files inside the container
        
            ls
            
        d) to exit the container
        
          exit
          
        e) Open in browser 
        
            Frontend: http://localhost:4000

Step 5:**Stop**

        docker compose down




