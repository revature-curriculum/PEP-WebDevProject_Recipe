/**
 * This script defines the add, view, and delete operations for Ingredient objects in the Recipe Management Application.
 */

const BASE_URL = "http://localhost:8081"; // MockServer + backend URL

/* 
 * TODO: Get references to various DOM elements
*/

/* 
 * TODO: Attach 'onclick' events to buttons
*/

/* 
 * TODO: Create an array to keep track of ingredients.
*/
let ingredients;

/* 
 * TODO: Ensure that, on start up, we call getIngredients().
*/


/**
 * TODO: Add Ingredient Function
 * 
 * Requirements:
 * - Capture ingredient name from the relevant input field
 * - Validate input field is not empty
 * - Send POST request to create new ingredient
 * - Handle successful ingredient addition
 * - Clear input field after submission
 * - Refresh ingredient list
 * 
 * Hints:
 * - Use fetch with 'POST' method
 * - ensure, within the headers, the Authorization header contains "Bearer " + the auth-token that should be within session storage
 * - Trim input values to remove whitespace
 * - Add error handling for failed requests
 * - Verify input before sending request
 */
async function addIngredient() {
    // Implement add ingredient logic here
}

/**
 * TODO: Refresh Ingredient List Function
 * 
 * Requirements:
 * - Fetch all ingredients from backend
 * - Store fetched ingredients in the local ingredients array
 * - calls refreshIngredientList() to ensure webpage has accurate list of ingredients displayed
 * - Handle potential fetch errors
 * 
 * Hints:
 * - Use fetch with 'GET' method
 * - Parse JSON response
 * - Add error logging
 */
async function getIngredients() {
    // Implement get ingredients logic here
}

/**
 * TODO: Delete Ingredient Function
 * 
 * Requirements:
 * - Capture ingredient name from input field
 * - Find corresponding ingredient ID
 * - Send DELETE request to remove ingredient
 * - Handle successful ingredient deletion
 * - Clear input field after submission
 * - Refresh ingredient list
 * 
 * Hints:
 * - Use fetch with 'DELETE' method
 * - ensure, within the headers, the Authorization header contains "Bearer " + the auth-token that should be within session storage
 * - Locate ingredient ID based on ingredient name
 * - Add error handling for failed deletion
 * - Validate input before sending request
 */
async function deleteIngredient() {
    // Implement delete ingredient logic here
}

/**
 * TODO: Refresh Ingredient List Function
 * 
 * Requirements:
 * - Clear existing ingredient list HTML container
 * - Populate list with contents in ingredients array
 */
function refreshIngredientList() {
    
}