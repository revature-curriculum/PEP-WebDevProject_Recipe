Project: RecipeHub (Full-Stack)



### Background

This project is a web-based recipe management application with user authentication and admin functionality. It allows users to view, add, update, and delete recipes, as well as search for specific recipes. Admins have additional capabilities to manage ingredients. The application uses a frontend built with HTML, CSS, and JavaScript, and a backend API.

Requirements



1: UI Structure

Located within the recipe folder, the file recipe-page.html should be present. Its purpose is to provide the main interface for recipe management. Complete the following tasks:

* Add an <h1> tag with the text "Recipes".
* Add a <ul> tag with the id "recipe-list".
* Add sections for adding, updating, and deleting recipes, each with appropriate input fields and buttons.
* Ensure all elements have the specified IDs as mentioned in the instructions.

2: DOM Manipulation

Located within the recipe folder, the file recipe-page.js should be present. Its purpose is to handle client-side recipe operations. Complete the following tasks:

* Create an array to store recipes: let recipes = [];
* Implement CRUD functions: addRecipe(), updateRecipe(), deleteRecipe(), displayRecipes()
* Add event listeners to the add, update, and delete recipe buttons.
* Implement the displayRecipes() function to refresh the recipe list.
* Ensure proper error handling and input validation.

3: Login Functionality

Located within the login folder, the files login-page.html and login-page.js should be present. Their purpose is to handle user login. Complete the following tasks:

* In login-page.html, add a login form with username and password inputs, and a login button.
* In login-page.js, implement the login logic using a fetch request to http://localhost:8081/login.
* Handle login success (redirect to recipe page) and failure (show alert).
* Add a "Log out" link to recipe-page.html.

4: API Integration

Update recipe-page.js to interact with the backend API. Complete the following tasks:

* Replace the local recipes array with API calls.
* Modify CRUD operations to use fetch requests to the API.
* Implement authentication token handling for API requests.
* Update the displayRecipes() function to work with the API data structure.
* Implement error handling for API requests.

5: User Registration

Located within the register folder, the files register-page.html, register-page.css, and register-page.js should be present. Their purpose is to handle user registration. Complete the following tasks:

* In register-page.html, create a registration form with fields for username, email, password, and password confirmation.
* In register-page.css, add basic styling for the registration page.
* In register-page.js, implement the registration logic with a fetch request to the backend.
* Handle the response (success/error) and redirect or show error messages accordingly.

6: Recipe Search

Update recipe-page.html and recipe.js to implement search functionality. Complete the following tasks:

* Add a search bar and search button to recipe-page.html.
* Implement a new function in recipe.js to handle the search.
* Update the displayRecipes() function to work with search results.
* Remove the initial loading of all recipes (if present).

7: Admin Functionality

Located within the ingredients folder, the files ingredients-page.html, ingredients-page.css, and ingredients-page.js should be present. Their purpose is to provide admin-only ingredient management. Complete the following tasks:

* In ingredients-page.html, create an interface for viewing, adding, updating, and deleting ingredients.
* In ingredients-page.css, add styling for the ingredient management page.
* In ingredients-page.js, implement CRUD operations for ingredients with admin checks.
* Update recipe-page.html and recipe-page.js to include a conditional link to the ingredients page for admin users.

8: Backend (Java)

Ensure the backend can handle CORS requests. Add CORS headers to the response:

* Access-Control-Allow-Origin: * (or specify allowed origins)
* Access-Control-Allow-Headers: Content-Type

Additional Notes

* Remember to test your implementation by opening the HTML files in a browser and interacting with the UI.
* Ensure that all CRUD operations (Create, Read, Update, Delete) work as expected for both recipes and ingredients.
* Implement proper error handling and input validation throughout the application.
* Make sure that the recipe list updates accordingly after each operation.
* Use document.getElementById() to get input values and list elements.
* Use addEventListener() to attach click events to buttons.



By completing these requirements, you will have created a full-stack recipe management application with user authentication, admin functionality, and a robust frontend-backend integration.

