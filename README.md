# Messaging App

A real-time messaging app built with React, Next.js, Express, Node.js, TypeScript, Tailwind CSS and socket.io. It allows users to send and receive messages in real-time, perfect for team communication. Built with performance and scalability in mind.

## Contents

- [Messaging App](#messaging-app)
  - [Contents](#contents)
  - [Main Features](#main-features)
  - [Technology Stack](#technology-stack)
  - [Prerequisites](#prerequisites)
  - [Setup Guide](#setup-guide)
  
## Main Features
**TBA**

## Technology Stack
- React
- TailwindCSS
- Typescript
- Node.js
- Express
- Socket.io
- MySQL

## Prerequisites
- Node Package Manager Nodejs
- File manager (File explorer recommended for windows users.)
- Web browser (Google Chrome is recommended.)
- Integrated Development Environment (IDE) (Visual Studio Code is recommended (https://code.visualstudio.com/download))
- Command Line Interface (CLI) (Git Bash is recommended (https://git-scm.com/downloads))

## Setup Guide
1. Clone the repository onto your machine or download a zip file of the main branch.
Open the project folder in the integrated development (IDE) environment of your choice.

2. Run the following in the root folder:

`$ npm install`

`$ npm run dev`

This will start the back-end and front-end together

3. Finally navigate too http://localhost:3000 in your browser or https://messaging-app.herokuapp.com/ if you wish to see the deployed version

*Please note* there are several .env variables in the project, they are the following:

- PORT
- PEPPER
- SECRET

- DEFAULT_PROFILE_PICTURE

- DB_HOST
- DB_USER
- DB_PORT
- DB_PASSWORD
- DB_NAME

There PORT, PEPPER and SECRET variables are your choice to assign however I would reccomend the following database setup:

- DB_HOST = Localhost
- DB_USER = root
- DB_PORT = 3306
- DB_PASSWORD = password
- DB_NAME = database_name

Assign these in `./server/config/db.ts` in place of the .end variables.
