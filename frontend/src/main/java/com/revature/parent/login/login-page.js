/**
 * This script handles the login functionality for the Recipe Management Application.
 * It manages user authentication by sending login requests to the server and handling responses.
 */

/* 
 * TODO: Get references to various DOM elements
*/


/* 
 * TODO: Add click event listener to the login button
*/


/**
 * TODO: Process Login Function
 * 
 * Requirements:
 * - Retrieve username and password from input fields
 * - Validate input fields are not empty
 * - Create request configuration object for fetch
 * - Send POST request to login endpoint
 * - Handle different response status codes:
 *      - Store authentication token on successful login
 *      - Store isAdmin value on successful login
 *      - Redirect to recipe page after successful authentication
 *      - Alert the user to a login error on failed login
 * 
 * Hints:
 * - Use fetch with 'POST' method
 * - Set appropriate request headers
 * - Check response status codes (200 for success, 401 for unauthorized)
 * - Use sessionStorage to store authentication token and isAdmin value
 * - the respond body should be in the form of a string such as: "thisisthetoken true"
 *   where the token and the isAdmin boolean value are separated by a single space
 * - Implement error handling for network or server issues
 * - Add input validation before sending request
 */
async function processLogin() {
    
    // Implement login logic here


    // Defining the request configuration
    const requestOptions = {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json"
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(loginBody)
            };
        
}

