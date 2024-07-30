#### Node js app with express, Swagger, mongodb in database and docker for deploY

# Usage

1. Clone repo

```bash
git clone https://github.com/abouramd/REST-API-Nodejs.git

cd REST-API-Nodejs.git

cp src/.env_example src/.env
```

2. Set env variables in src/.env

3. Run the app

- run using docker

  ```bash
  docker compose up
  ```

- run use node js without docker

  ```bash
  cd src/

  npm install

  npm start
  ```

# **WHAT I USED TO BUILD THIS PROJECT**

## **Node.js**

- Node.js is an open-source, cross-platform JavaScript runtime environment and library that allows developers to run JavaScript code outside of a web browser. can be used to build server-side web applications, handling server-side rendering, data processing, and serving dynamic content to clients. Node.js is commonly used for building APIs (Application Programming Interfaces) due to its lightweight and efficient nature. It allows developers to create scalable and performant APIs that can handle a large number of concurrent requests.

## **Express.js**

- Express is a popular and widely used web application framework for Node.js. It is designed to simplify the process of building web applications and APIs by providing a set of robust features and tools.

## Mongodb driver

- The official MongoDB Node.js driver allows Node.js applications to connect to MongoDB and work with data. The driver features an asynchronous API which allows you to interact with MongoDB using Promises or via traditional callbacks..

## **Docker**

- Docker is a software platform that enables developers to build, package, and deploy applications quickly and efficiently using containers. Containers are lightweight, portable, and self-sufficient units that encapsulate an application and its dependencies, including libraries, runtime, and system tools. Docker provides a standardized way to package, distribute, and run software, ensuring onsistency across different computing environments.

## Swagger

- Swagger is an Open Source set of rules, specifications and tools for developing and describing RESTful APIs. The Swagger framework allows developers to create interactive, machine and human-readable API documentation.
