/**
 * This script defines the registration functionality for the Registration page in the Recipe Management Application.
 */


/* 
 * TODO: Get references to various DOM elements
*/


/* 
 * TODO: Ensure the register button has its 'onclick' event associated with the function
*/


/**
 * TODO: Process Registration Function
 * 
 * Requirements:
 * - Retrieve username, email, password, and repeat password from input fields
 * - Validate that all input fields are not empty
 * - Verify passwords match
 * - Create registration object with user details
 * - Send POST request to registration endpoint - http://localhost:8081/register
 * - Handle different response status codes:
 *      - Redirect to login page on successful registration
 *      - Alerts the user to a registration error on failure registration
 *      - If passwords do not match, alerts the user of the mismatch.
 * 
 * Hints:
 * - Use fetch with 'POST' method
 * - Set appropriate request headers
 * - Validate input before sending request
 * - Check response status codes (201 for success, 409 for conflict)
 * - Implement proper error handling
 * - Clear sensitive information after processing
 */
async function processRegistration() {
 
    // Implement registration logic here


    // Defining the request configuration
    const requestOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(registerBody)
    };
   
}
