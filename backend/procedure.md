# Procedure to build this backend

## 1. Setup the project

```bash
# Create a new directory for the project
mkdir chat-app
cd chat-app
mkdir backend
cd backend

# Initialize a new Node.js project
npm init -y

# Install dependencies
npm install express@4 mongoose@8.10 bcryptjs jsonwebtoken cookie-parser dotenv@16

# Install dev dependencies
npm install -D nodemon@3.1.11

# Create the project structure
mkdir src
mkdir src/controllers
mkdir src/models
mkdir src/routes
mkdir src/utils
mkdir src/lib

# Create the main entry point
touch src/server.js

# Create the .env file
touch .env

# Create the .gitignore file
touch .gitignore
```

Update the .gitignore in for node.js projects

## Setup DB.

- Generate a docker-compose.yml for mongoDB database with volume enhancements.
- Generate a .env file for the database connection.
- In side `src/lib` create a new file called db.js and setup the mongoDB connection there.

# Add basic express setup

- In side `src/server.js` create a basic express setup.
- Add the routes to the express app.
- Add the environment variables to the express app.
- Add the database connection to the express app.
- Add the cookie parser and json middleware at the start of app.
- Inside src/lib, make a new file, env.js and utilize the concept used in the file we have.

# Add auth setup

- In side `src/routes` create a new file called auth.routes.js and setup the auth routes there.
- Add the auth routes to the express app.
- In side `src/controllers` create a new file called auth.controllers.js and setup the auth controllers there.
- Controllers should perform all the checks and if everything is valid, then save the data in the db. The checks include everything you might need from the user, and if there is a problem, let the user know.
- Before saving the data in db, make sure you actually perform all the security measures like hashing the password, checking the lengths, checking if the user already exists or not and anything else you might need.
- In side `src/models` create a new file called user.models.js and setup the user model there defining the structure to set in the db for a specific user. In this case, we only have profile-pic, name, password, and email. But there could be more, like phone no, dob, address etc. So make sure that model is okay to expand without breaking and have proper checks like what should be string, number, and what should be their length.
- Configure jwt token setup. Inside `src/utils` create a new file called jwt.utils.js and setup the jwt token setup there.

The sequence of doing this is very simple, create route -> make controller -> setup model for the entity used -> Generate utility functions for the controllers.

# Add email setup

- First I've installed npm package `npm install resend@6.0.2`
- Next, we grab the API_KEY from the resend website and set the environment variable in the .env file for "EMAIL_FROM", "EMAIL_FROM_NAME", "RESEND_API_KEY" and "CLIENT_URL".
- In side `src/lib` create a new file called resend.js and setup the resend client there. Check the file for the code and understanding
- We also did the setup for email template and email handler. Check the files for the code and understanding.
