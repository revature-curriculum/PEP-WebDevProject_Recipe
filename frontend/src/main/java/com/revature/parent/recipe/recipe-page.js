/**
 * This script defines the CRUD operations for Recipe objects in the Recipe Management Application.
 */

const BASE_URL = "http://localhost:8081"; // backend URL

// Get references to various DOM elements
const addRecipeNameInput = document.getElementById('add-recipe-name-input');
const addRecipeInstructionsInput = document.getElementById('add-recipe-instructions-input');
const updateRecipeNameInput = document.getElementById('update-recipe-name-input');
const updateRecipeInstructionsInput = document.getElementById('update-recipe-instructions-input');
const deleteRecipeNameInput = document.getElementById('delete-recipe-name-input');
const recipeListContainer = document.getElementById('recipe-list');
const adminLink = document.getElementById('admin-link');
let searchInput = document.getElementById("search-input");


// Attach 'onclick' events to buttons
document.getElementById('add-recipe-submit-input').onclick = addRecipe;
document.getElementById('update-recipe-submit-input').onclick = updateRecipe;
document.getElementById('delete-recipe-submit-input').onclick = deleteRecipe;
document.getElementById("search-button").onclick = searchRecipes;
document.getElementById("logout-button").onclick = processLogout;

let recipes = [];

// call displayAdminLink
displayAdminlink();

// start off with full recipe list
getRecipes();

/**
 * TODO: Search Recipe Function
 * 
 * Requirements:
 * - Capture search term from input field
 * - Fetch all recipes from backend
 * - Filter recipes based on search term (case-insensitive)
 * - Clear existing recipe list
 * - Display matching recipes or "No results" message
 * - Handle potential fetch errors
 * 
 * Hints:
 * - Use fetch with 'GET' method to retrieve all recipes
 * - Use .filter() to find matching recipes
 * - Compare recipe names using toLowerCase()
 * - Create list items dynamically for search results
 * - Add error handling for failed searches
 * - Validate input before searching
 */
async function searchRecipes() {
    recipes.innerHTML = "";
    let response = await fetch("http://localhost:8081/recipes?name="+searchInput.value, {
        method:"GET", 
        mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Headers": "*"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer"});
    recipes = await response.json();
    refreshRecipeList();
}

/**
 * Function to add a new recipe to the backend and refresh the list.
 */
async function addRecipe() {
    const name = addRecipeNameInput.value.trim();
    const instructions = addRecipeInstructionsInput.value.trim();
    
    if (name && instructions) {
        fetch(`${BASE_URL}/recipes`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + sessionStorage.getItem("auth-token")
             },
            body: JSON.stringify({ name, instructions }),
        })
            .then((response) => {
                
                if (!response.ok) throw new Error("Failed to add recipe.");
            })
            .then(async () => {
                
                await getRecipes();
                await refreshRecipeList(); // Ensure this completes
                const recipeList = document.getElementById("recipe-list");
                console.log("Current Recipe List after refresh:", recipeList.innerHTML);
                addRecipeNameInput.value = '';
                addRecipeInstructionsInput.value = '';
            })
            .catch((error) => alert(error.message));
    } else {
        alert("Please enter both recipe name and instructions.");
    }
}

/**
 * Function to update an existing recipe's instructions in the backend.
 */
async function getRecipes() {
    try {
        const response = await fetch(`${BASE_URL}/recipes`);
        recipes = await response.json();
        refreshRecipeList();
    } catch (error) {
        alert("Failed to fetch recipes: " +  error);
    }
}

async function updateRecipe() {
    const name = updateRecipeNameInput.value.trim();
    const instructions = updateRecipeInstructionsInput.value.trim();

    if (!name || !instructions) {
        alert("Please enter both recipe name and updated instructions.");
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/recipes`);
        if (!response.ok) throw new Error("Failed to fetch recipes.");

        const recipes = await response.json();
        const recipe = recipes.find(r => r.name === name);
        if (!recipe) {
            alert("Recipe not found.");
            return;
        }

        const updateResponse = await fetch(`${BASE_URL}/recipes/${recipe.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, instructions }),
        });

        if (!updateResponse.ok) throw new Error("Failed to update recipe.");

        getRecipes();
        await refreshRecipeList();
        updateRecipeNameInput.value = '';
        updateRecipeInstructionsInput.value = '';
    } catch (error) {
        console.error("Error updating recipe:", error);
        alert("Failed to update recipe.");
    }
}

/**
 * Function to delete a recipe from the backend and refresh the list.
 */
async function deleteRecipe() {
    const name = deleteRecipeNameInput.value.trim();

    // Find the ID of the recipe to delete
    let id = null;
    const listItems = recipeListContainer.getElementsByTagName('li');
    for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent.includes(name)) {
            id = i + 1; // Ensure this matches your backend logic for ID
            break;
        }
    }

    if (!id) {
        alert("Recipe not found in the list.");
        return;
    }

    try {
        const token = sessionStorage.getItem("auth-token");
        console.log("Authorization Token:", token); // Log the token
        console.log("Deleting Recipe with ID:", id); // Log the ID of the recipe

        const response = await fetch(`${BASE_URL}/recipes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        });

        if (!response.ok) throw new Error(`Error deleting recipe: ${response.statusText}`);

        console.log("Recipe deleted successfully.");
        getRecipes();
        refreshRecipeList();
    } catch (error) {
        console.error("Error deleting recipe:", error);
        alert(error.message);
    }
}

/**
 * Function to fetch and display the list of recipes from the backend.
 */
function refreshRecipeList() {
    recipeListContainer.innerHTML = "";

    for(let i = 0; i < recipes.length; i++){
        let element = document.createElement("li");
        let ptag = document.createElement("p");
        ptag.innerText = recipes[i].name+" "+recipes[i].instructions;
        element.appendChild(ptag);
        recipeListContainer.appendChild(element);
    }
}

/**
 * Handles the logout process for the user by:
 * - Sending a logout request to the server
 * - Processing the response based on the status code
 */
async function processLogout() {

    try {
        const response = await fetch(`http://localhost:8081/logout`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + sessionStorage.getItem("auth-token")
             }
            });
        
        if (response.status === 200) {
            // remove the token in sessionStorage
            sessionStorage.removeItem("auth-token");
            // Add a small delay for the test to capture the token before redirection
            setTimeout(() => {
                // Redirect to the recipe page
            window.location.href = "../login/login-page.html";
            }, 500);  // 500ms delay
        } else {
            alert("Failed to log out!");
        }
    } catch (error) {
        console.error("Error during logout process:", error);
        alert("An error occurred. Please try again.");
    }
}

function displayAdminlink() {
    const isAdmin = sessionStorage.getItem("is-admin");
    console.log(isAdmin)
    if (isAdmin == "true") {
        adminLink.style.display = "inline";
    } 
}
