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
const searchRecipeNameInput = document.getElementById('search-recipe-name-input');

// Attach 'onclick' events to buttons
document.getElementById('add-recipe-submit-input').onclick = addRecipe;
document.getElementById('update-recipe-submit-input').onclick = updateRecipe;
document.getElementById('delete-recipe-submit-input').onclick = deleteRecipe;
document.getElementById('search-recipe-submit-input').onclick = searchRecipes;

let recipes = [];

// Refresh recipe list on startup
refreshRecipeList();

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
            // .then(() => {
            //     refreshRecipeList();
            //     const recipeList = document.getElementById("recipe-list");
            //     console.log("Current Recipe List:", recipeList.innerHTML);
            //     addRecipeNameInput.value = '';
            //     addRecipeInstructionsInput.value = '';
            // })
            .then(async () => {
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



// async function updateRecipe() {
//     const name = updateRecipeNameInput.value.trim();
//     const instructions = updateRecipeInstructionsInput.value.trim();
//     let id = 0;
    
//     const listItems = recipeListContainer.getElementsByTagName('li');
    
//     for (let i = 0; i < listItems.length; i++) {
//         if (listItems[i].textContent.includes(name)) {
//             id = i + 1;
//         }
//     }

//     if (name && instructions) {
//         fetch(`${BASE_URL}/recipes/${id}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ instructions }),
//         })
//             .then((response) => {
//                 if (!response.ok) throw new Error("Failed to update recipe.");
                
//             })
//             .then(() => {
//                 refreshRecipeList();
//                 updateRecipeNameInput.value = '';
//                 updateRecipeInstructionsInput.value = '';
//             })
//             // .catch((error) => alert(error.message));
//             .catch((error) => {
//                 console.error("Error updating recipe:", error);
//                 if (!window.__TESTING__) console.log("Failed to update recipe.", error);
//             });
            
//     } else {
//         alert("Please enter both recipe name and updated instructions.");
//     }
// }

// async function displayAllRecipes () => {
//     fetch(`${BASE_URL}/recipes`)
//         .then((response) => response.json())
//         .then((recipes) => {
//             const list = document.getElementById("recipe-list");
//             list.innerHTML = "";
//             recipes.forEach((recipe) => {
//                 const listItem = document.createElement("li");
//                 listItem.textContent = `${recipe.name} - ${recipe.instructions}`;
//                 list.appendChild(listItem);
//             });
//         });
// };


// async function updateRecipe = () => {
//     const name = document.getElementById("update-recipe-name-input").value;
//     const instructions = document.getElementById("update-recipe-instructions-input").value;

//     // Resolve the recipe ID
//     const listItems = document.getElementById("recipe-list").children;
//     let id = 0;
//     for (let i = 0; i < listItems.length; i++) {
//         if (listItems[i].textContent.includes(name)) {
//             id = i + 1; // Assuming ID matches the index
//             break;
//         }
//     }

//     // Send the PUT request
//     fetch(`${BASE_URL}/recipes/${id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, instructions }),
//     })
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error("Failed to update recipe.");
//             }
//             return response.json();
//         })
//         .then((updatedRecipe) => {
//             console.log("Updated Recipe:", updatedRecipe);
//             // Refresh the recipe-list
//             displayAllRecipes(); // Ensure this refreshes the list
//         })
//         .catch((error) => {
//             console.error("Error updating recipe:", error);
//             alert("Failed to update recipe.");
//         });
// };




async function displayAllRecipes() {
    try {
        const response = await fetch(`${BASE_URL}/recipes`);
        if (!response.ok) {
            throw new Error("Failed to fetch recipes.");
        }
        const recipes = await response.json();
        const list = document.getElementById("recipe-list");
        list.innerHTML = "";
        recipes.forEach((recipe) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${recipe.name} - ${recipe.instructions}`;
            list.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching recipes:", error);
        alert("Failed to fetch recipes.");
    }
}

// async function updateRecipe() {
//     const name = updateRecipeNameInput.value.trim();
//     const instructions = updateRecipeInstructionsInput.value.trim();

//     if (!name || !instructions) {
//         alert("Please enter both recipe name and updated instructions.");
//         return;
//     }

//     try {
//         // Fetch recipes to resolve ID
//         const response = await fetch(`${BASE_URL}/recipes`);
//         if (!response.ok) throw new Error("Failed to fetch recipes.");

//         const recipes = await response.json();
//         const recipe = recipes.find(r => r.name === name);
//         if (!recipe) {
//             alert("Recipe not found in the list.");
//             return;
//         }

//         // Send the PUT request
//         const updateResponse = await fetch(`${BASE_URL}/recipes/${recipe.id}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ name, instructions }),
//         });

//         if (!updateResponse.ok) throw new Error("Failed to update recipe.");

//         // Refresh the recipe list
//         await displayAllRecipes();
//     } catch (error) {
//         console.error("Error updating recipe:", error);
//         alert("Failed to update recipe.");
//     }
// }






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
// async function deleteRecipe() {
//     const name = deleteRecipeNameInput.value.trim();
//     const listItems = recipeListContainer.getElementsByTagName('li');
    
//     for (let i = 0; i < listItems.length; i++) {
//         if (listItems[i].textContent.includes(name)) {
//             id = i + 1;
//         }
//     }

//     if (name) {
//         fetch(`${BASE_URL}/recipes/${id}`, {
//             method: 'DELETE',
//         })
//             .then((response) => {
//                 if (!response.ok) throw new Error("Failed to delete recipe.");
                
//             })
//             .then(() => {
//                 refreshRecipeList();
//                 deleteRecipeNameInput.value = '';
//             })
//             .catch((error) => alert(error.message));
//     } else {
//         alert("Please enter the recipe name to delete.");
//     }
// }


// async function deleteRecipe() {
//     const name = deleteRecipeNameInput.value.trim();

//     if (!name) {
//         alert("Please enter the recipe name to delete.");
//         return;
//     }

//     try {
//         // Fetch the list of recipes to resolve the ID
//         const response = await fetch(`${BASE_URL}/recipes`);
//         if (!response.ok) throw new Error("Failed to fetch recipes.");

//         const recipes = await response.json();
//         const recipe = recipes.find(r => r.name === name);

//         if (!recipe) {
//             alert("Recipe not found.");
//             return;
//         }

//         // Send DELETE request using the resolved ID
//         const deleteResponse = await fetch(`${BASE_URL}/recipes/${recipe.id}`, {
//             method: "DELETE",
//         });

//         if (!deleteResponse.ok) throw new Error("Failed to delete recipe.");

//         // Refresh the list
//         await refreshRecipeList();
//         deleteRecipeNameInput.value = '';
//     } catch (error) {
//         console.error("Error deleting recipe:", error);
//         alert("Failed to delete recipe.");
//     }
// }







// async function deleteRecipe() {
//     const name = deleteRecipeNameInput.value.trim();

//     if (name) {
//         fetch(`${BASE_URL}/recipes/${id}`, {
//             method: 'DELETE',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ name }),
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     return response.text().then(text => {
//                         throw new Error(text || "Failed to delete recipe.");
//                     });
//                 }
//                 refreshRecipeList();
//                 deleteRecipeNameInput.value = '';
//             })
//             .catch(error => {
//                 console.log("Error deleting recipe:", error);
//                 alert(error.message);
//             });
//     } else {
//         alert("Please enter the recipe name to delete.");
//     }
// }









// async function deleteRecipe() {
//     const name = deleteRecipeNameInput.value.trim();
    
//     // Find the ID of the recipe to delete
//     let id = null;
//     const listItems = recipeListContainer.getElementsByTagName('li');
//     for (let i = 0; i < listItems.length; i++) {
//         if (listItems[i].textContent.includes(name)) {
//             id = i + 1; // Ensure this matches your backend logic for ID
//             break;
//         }
//     }

//     if (!id) {
//         alert("Recipe not found in the list.");
//         return;
//     }

//     try {
//         const response = await fetch(`${BASE_URL}/recipes/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': "Bearer " + sessionStorage.getItem("auth-token")
            
//             }
            
//         });

//         if (!response.ok) throw new Error(`Error deleting recipe: ${response.statusText}`);
        
//         console.log("Recipe deleted successfully.");
//         refreshRecipeList();
//     } catch (error) {
//         console.error("Error deleting recipe:", error);
//         alert(error.message);
//     }
// }


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
        refreshRecipeList();
    } catch (error) {
        console.error("Error deleting recipe:", error);
        alert(error.message);
    }
}



/**
 * Function to fetch and display the list of recipes from the backend.
 */
async function refreshRecipeList() {
    try {
        const response = await fetch(`${BASE_URL}/recipes`);
        const data = await response.json();
        recipes = data;
        recipeListContainer.innerHTML = '';
        recipes.forEach((recipe) => {
            const recipeElement = document.createElement('li');
            recipeElement.textContent = `${recipe.name}: ${recipe.instructions}`;
            recipeListContainer.appendChild(recipeElement);
        });
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}


/**
 *  Function to fetch and display a recipe from the backend.
 */
async function searchRecipes() {
    const searchName = searchRecipeNameInput.value.trim();

    if (!searchName) {
        alert("Please enter a recipe name to search.");
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/recipes`);
        if (!response.ok) throw new Error("Failed to fetch recipes.");

        const recipes = await response.json();
        const searchResults = recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(searchName.toLowerCase())
        );

        // Clear previous list
        recipeListContainer.innerHTML = '';

        if (searchResults.length === 0) {
            const noResultsElement = document.createElement('li');
            noResultsElement.textContent = 'No recipes found matching your search.';
            recipeListContainer.appendChild(noResultsElement);
        } else {
            searchResults.forEach((recipe) => {
                const recipeElement = document.createElement('li');
                recipeElement.textContent = `${recipe.name}: ${recipe.instructions}`;
                recipeListContainer.appendChild(recipeElement);
            });
        }
    } catch (error) {
        console.error("Error searching recipes:", error);
        alert("Failed to search recipes.");
    }
}

