/**
 * This script defines the CRUD operations for Recipe objects in the Recipe Management Application.
 */

const BASE_URL = "http://localhost:8081"; // MockServer + backend URL

/* 
 * TODO: Get references to various DOM elements
*/


/* 
 * TODO: Attach 'onclick' events to buttons
*/

/* 
 * TODO: Create an array to keep track of recipes.
*/
let recipes;

/* 
 * TODO: Ensure that, on start up, the recipe list is refreshed.
*/


/**
 * TODO: Add Recipe Function
 * 
 * Requirements:
 * - Capture recipe name and instructions from input fields
 * - Validate input fields are not empty
 * - Send POST request to create new recipe
 * - Handle successful recipe addition
 * - Clear input fields after submission
 * - Refresh recipe list
 * 
 * Hints:
 * - Use fetch with 'POST' method
 * - Trim input values to remove whitespace
 * - Add error handling for failed requests
 * - Verify input before sending request
 */
async function addRecipe() {
    // Implement add recipe logic here
}


/**
 * TODO: Delete Recipe Function
 * 
 * Requirements:
 * - Capture recipe name from input field
 * - Find corresponding recipe ID
 * - Send DELETE request to remove recipe
 * - Handle successful recipe deletion
 * - Clear input field after submission
 * - Refresh recipe list
 * 
 * Hints:
 * - Use fetch with 'DELETE' method
 * - Locate recipe ID based on recipe name
 * - Add error handling for failed deletion
 * - Validate input before sending request
 */
async function deleteRecipe() {
    // Implement delete recipe logic here
}


/**
 * TODO: Refresh Recipe List Function
 * 
 * Requirements:
 * - Fetch all recipes from backend
 * - Clear existing recipe list container
 * - Populate list with fetched recipes
 * - Store fetched recipes in local array
 * - Handle potential fetch errors
 * 
 * Hints:
 * - Use fetch with 'GET' method
 * - Parse JSON response
 * - Create list items dynamically
 * - Add error logging
 */
async function refreshRecipeList() {
    // Implement recipe list refresh logic here
}


/**
 * TODO: Update Recipe Function
 * 
 * Requirements:
 * - Capture recipe name and new instructions from input fields
 * - Find corresponding recipe ID
 * - Send PUT request to update recipe instructions
 * - Refresh recipe list after successful update
 * - Handle potential errors
 * 
 * Hints:
 * - Use fetch with 'PUT' method
 * - Construct URL with recipe ID
 * - Validate input before sending request
 * - Clear input fields after update
 */
async function updateRecipe() {
    // Implement update recipe logic here
}
