# Project: RecipeHub (Full-Stack)

## Background

This project is a web-based recipe management application with user authentication and admin functionality. It allows users to view, add, update, and delete recipes, as well as search for specific recipes. Admins have additional capabilities to manage ingredients. The application uses a frontend built with HTML, CSS, and JavaScript. The front-end communicates with a backend API.

## Getting Started
- You will be working on the front end of this application.
- You can test your implementation by opening the HTML files in a browser and interacting with the UI.

- Ensure the backend is running if you are testing features that require the use of the backend. To run the backend, navigate to the `backend/src/main/java/com/revature/Main.java` file and run that file. The server will run on `http://localhost:8081/`. 
- If the backend is running, you cannot run tests simultaneously. Ensure the backend is stopped before you run your tests.

- You are encouraged to incorporate CSS however you'd like to provide styling for the application.

## Requirements

### 1: The user registration.
Located within the `frontend/src/main/java/com/revature/register` folder, the files `register-page.html`, `register-page.css`, and `register-page.js` should be present. Their purpose is to provide the user interface and the functionality for the user registration process in to the application. Read the comments in these files in order to complete the below tasks:

- Ensure that `register-page.html` contains the specified elements.
- Ensure the `register-page.css` contains the necessary CSS styles to make the registration page look visually appealing and consistent with the rest of the application.
- Ensure the `register-page.js` pulls the username, password, and repeated password. 
- Ensure the password and repeated password are checked for equality.
- Ensure an AJAX or Fetch Call is made to register the user.
- Ensure the user can register successfully and be redirected to the login page, or receive an alert if the registration is unsuccessful.
- Note: The request options already configured for you, but it is good to know about CORS and why the options we provided were chosen.

CORS is a protocol that requires any HTTP requests sent to first send out a pre-flight "options" request to your backend, so that the backend may verify that this particular HTTP request is safe for the backend to respond to. Modern browsers enforce CORS to prevent external sites from accessing information that they ought to not have access to, by restricting access to your backend to only be allowed to communicate with origins (URLs) that you specify. Your browser will not permit outgoing HTTP requests that contain a body and do not have CORS enabled.

It is recommended that you refer to documentation on how to specify all options required for a request. Please reference this documentation on supplying options: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

You can manually test this user story by running the backend, then navigating to the `http://localhost:8081/register` URL and providing the following fields:
        - Username
        - Email
        - Password
        - Repeat password
        - Click the Register button

### 2: The user can attempt to login.
Located within the `frontend/src/main/java/com/revature/login` folder, the files `login-page.html` and `login-page.js` should be present. Their purpose is to provide the user interface and functionality for a user logging in to the application. Read the comments in these files in order to complete the below tasks:
- Ensure that `login-page.html`contains the specified elements.
- Ensure that the user can either login successfully and be redirected to the recipe page, or receive an alert if the login is unsuccessful. 

You can manually test this user story by running the backend, then navigating to the `http://localhost:8081/login` URL and providing the following credentials:
    - username: 'ChefTrevin'
    - password: 'trevature'

### 3: The user can view, add, update, or delete recipes.
Located within the `frontend/src/main/java/com/revature/recipe` folder, the files `recipe-page.html` and `recipe-page.js` should be present. Its purpose is to provide the main interface and functionality required to allow the user view and manage recipes. Read the comments in these files in order to complete the below tasks:
- Ensure the specified elements have been added to the HTML page.
- Ensure the elements have the specified id values as mentioned in the instructions.
- Ensure that, if the user clicks on the "Add Recipe" button, the relevant recipe should be displayed in the list of recipes.
- Ensure that, if the user clicks on the "Update Recipe" button, the relevant recipe's information should be updated in the list of recipes.
- Ensure that, if the user clicks on the "Delete Recipe" button, the relevant recipe should no longer be displayed in the list of recipes.
- Ensure that the most up-to-date list of recipes is displayed after each user action.



