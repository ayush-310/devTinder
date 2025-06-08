devTinder
=========

**devTinder** is a platform designed to connect developers and tech professionals based on their skills, interests, and project preferences, enabling collaboration and networking.

Table of Contents
-----------------

*   [Project Overview](#project-overview)
    
*   [Tech Stack](#tech-stack)
    
*   [Features](#features)
    
*   [Installation](#installation)
    
*   [Usage](#usage)
    
*   [Deployment](#deployment)
    
*   [Knowledge Transfer (KT)](#knowledge-transfer-kt)
    
*   [Contributing](#contributing)
    
*   [License](#license)
    

Project Overview
----------------

devTinder helps developers find collaborators by matching skills and interests. It promotes community building and project management within the tech ecosystem.

Tech Stack
----------

**Frontend:** ReactJS, Tailwind CSS, DaisyUI**Backend:** Node.js, Express.js**Database:** MongoDB**Deployment:** AWS (EC2, S3, or other AWS services)

Features
--------

*   User registration and authentication
    
*   Skill-based profile matching
    
*   Swipe and match system
    
*   Chat functionality
    
*   Project collaboration management
    
*   Admin controls
    

Installation
------------

1.  bashCopyEditgit clone https://github.com/ayush-310/devTinder.git
    
2.  bashCopyEditcd devTinder
    
3.  bashCopyEditcd frontendnpm installcd ../backendnpm install
    
4.  Configure environment variables as per .env.example.
    
5.  bashCopyEditnpm run dev
    

Usage
-----

*   Access frontend at http://localhost:3000
    
*   Register/login, set up your profile, and start matching with developers
    
*   Use chat and project features to collaborate
    

Deployment
----------

The **devTinder** application is deployed using **AWS** services:

*   **Backend** is hosted on an AWS EC2 instance configured to run the Node.js server.
    
*   **Frontend** is hosted on AWS S3 as a static website or through a service like AWS Amplify for better CDN support.
    
*   **MongoDB** is hosted either on a cloud provider (MongoDB Atlas) or an EC2 instance with MongoDB installed.
    
*   Environment variables such as API URLs and database connection strings are configured securely on the AWS instances.
    
*   Deployment involves pushing the latest code to the server, installing dependencies, and restarting the server process using PM2 or a similar process manager.
    

If you want to deploy locally or on your own AWS setup, ensure you have the following:

*   AWS account with EC2 and S3 access
    
*   Proper IAM roles and security groups set up
    
*   SSL certificates configured for secure access (optional but recommended)
    

Knowledge Transfer (KT)
-----------------------

*   **Codebase:** Frontend uses React component structure; backend follows MVC design.
    
*   **API:** REST APIs built with Express handle authentication, matching, messaging, and projects.
    
*   **Database:** MongoDB schema includes collections for Users, Matches, Messages, and Projects.
    
*   **Environment Variables:** Store sensitive info like DB URI, JWT secret, and AWS credentials in .env files (never commit these).
    
*   **Testing:** Basic tests included; more tests can be added using Jest or Mocha.
    
*   **Deployment:** Documented setup steps for AWS EC2 and S3 hosting, including server startup scripts.
    
*   **Support:** Reach out to ayuofficial11310@gmail.com for onboarding help.
    

