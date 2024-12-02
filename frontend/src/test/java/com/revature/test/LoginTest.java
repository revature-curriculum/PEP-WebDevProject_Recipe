
// package com.revature.test;

// import org.junit.After;
// import org.junit.Assert;
// import org.junit.Before;
// import org.junit.Test;
// import org.openqa.selenium.By;
// import org.openqa.selenium.JavascriptExecutor;
// import org.openqa.selenium.WebDriver;
// import org.openqa.selenium.WebElement;
// import org.openqa.selenium.chrome.ChromeDriver;
// import org.openqa.selenium.chrome.ChromeOptions;
// import org.openqa.selenium.support.ui.ExpectedConditions;
// import org.openqa.selenium.support.ui.WebDriverWait;

// import java.io.File;
// import java.time.Duration;

// public class LoginTest {

//     private WebDriver webDriver;
//     private WebDriverWait wait;

//     @Before
//     public void setUp() {
//         System.setProperty("webdriver.chrome.driver", "driver/chromedriver"); // Adjust path if necessary

//         File file = new File("src/main/java/com/revature/parent/login/login-page.html");
//         String path = "file://" + file.getAbsolutePath();
        
//         ChromeOptions options = new ChromeOptions();
//         options.addArguments("headless");
//         options.addArguments("--allow-file-access-from-files");
//         options.addArguments("--disable-web-security");
//         options.addArguments("--disable-site-isolation-trials");


//         webDriver = new ChromeDriver(options);
//         wait = new WebDriverWait(webDriver, Duration.ofSeconds(30));
//         webDriver.get(path);
//     }

//     @After
//     public void tearDown() {
//         if (webDriver != null) {
//             webDriver.quit();
//         }
//     }

//     /**
//      * Test for correct login. When login is successful, it should redirect to the recipe page.
//      */
//     @Test
//     public void correctLoginTest() throws InterruptedException {
//         mockFetch("success"); // Mock a successful login response
    
//         WebElement nameInput = webDriver.findElement(By.id("login-input"));
//         WebElement passwordInput = webDriver.findElement(By.id("password-input"));
//         WebElement submitButton = webDriver.findElement(By.id("login-button"));
    
//         nameInput.sendKeys("correct");
//         passwordInput.sendKeys("correct");
//         submitButton.click();
    
//         try {
//             // Wait briefly to allow fetch request to complete
//             Thread.sleep(500);
    
//             // // Verify token in sessionStorage
//             // JavascriptExecutor js = (JavascriptExecutor) webDriver;
//             // String authToken = (String) js.executeScript("return sessionStorage.getItem('auth-token');");
//             // Assert.assertEquals("auth-token-12345", authToken);

//             JavascriptExecutor js = (JavascriptExecutor) webDriver;
//             js.executeScript("sessionStorage.setItem('auth-token', 'auth-token-12345');");

//             // Delay to ensure sessionStorage access is available
//             Thread.sleep(1000);  // Adjust this value if needed

//             String authToken = (String) js.executeScript("return sessionStorage.getItem('auth-token');");
//             Assert.assertEquals("auth-token-12345", authToken);

    
//             // Verify redirection away from the login page
//             waitForPageLoad();
//             Assert.assertFalse(webDriver.getCurrentUrl().contains("login"));
//         } catch (org.openqa.selenium.NoAlertPresentException e) {
//             // No alert present; continue
//         } catch (org.openqa.selenium.UnhandledAlertException e) {
//             webDriver.switchTo().alert().dismiss();
//             Assert.fail("Unexpected alert appeared during execution.");
//         }
//     }
    
    

//     /**
//      * Test for incorrect login. When login fails, it should display an alert without redirecting.
//      */
//     @Test
//     public void incorrectLoginTest() {
//         mockFetch("failure"); // Mock an unsuccessful login response

//         WebElement nameInput = webDriver.findElement(By.id("login-input"));
//         WebElement passwordInput = webDriver.findElement(By.id("password-input"));
//         WebElement submitButton = webDriver.findElement(By.id("login-button"));

//         nameInput.sendKeys("incorrect");
//         passwordInput.sendKeys("incorrect");
//         submitButton.click();

//         // Wait for the alert to appear and then dismiss it
//         wait.until(ExpectedConditions.alertIsPresent());
//         webDriver.switchTo().alert().dismiss();

//         // Confirm that the user stays on the login page
//         Assert.assertTrue(webDriver.getCurrentUrl().contains("login"));
//     }

//     /**
//  * Helper method to wait for the page to fully load after login.
//  */
// private void waitForPageLoad() {
//     new WebDriverWait(webDriver, Duration.ofSeconds(10)).until(
//         webDriver -> ((JavascriptExecutor) webDriver)
//             .executeScript("return document.readyState").equals("complete")
//     );
// }

//     /**
//      * Injects JavaScript code to mock the fetch function for testing.
//      */
//     private void mockFetch(String type) {
//         String script = "";
//         if (type.equals("success")) {
//             script = "window.fetch = (url, options) => { if (url.endsWith('/login')) " +
//                     "return Promise.resolve(new Response(JSON.stringify({ token: 'auth-token-12345' }), " +
//                     "{ status: 200, headers: { 'Content-type': 'application/json' } }));" +
//                     " else return fetch(url, options); }";
//         } else if (type.equals("failure")) {
//             script = "window.fetch = (url, options) => { if (url.endsWith('/login')) " +
//                     "return Promise.resolve(new Response(null, { status: 401 }));" +
//                     " else return fetch(url, options); }";
//         }
//         ((JavascriptExecutor) webDriver).executeScript(script);
//     }
    
// }










package com.revature.test;

import static org.junit.Assert.assertTrue;

import java.io.File;
import java.time.Duration;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockserver.client.MockServerClient;
import org.mockserver.integration.ClientAndServer;
import org.mockserver.model.HttpRequest;
import org.mockserver.model.HttpResponse;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginTest {

    private WebDriver driver;
    @SuppressWarnings("unused")
    private WebDriverWait wait;
    private ClientAndServer mockServer;
    private MockServerClient mockServerClient;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "driver/chromedriver"); // Adjust path if necessary

        File file = new File("src/main/java/com/revature/parent/login/login-page.html");
        String path = "file://" + file.getAbsolutePath();

        ChromeOptions options = new ChromeOptions();
        options.addArguments("headless");

        // Initialize ChromeDriver and MockServer
        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        mockServer = ClientAndServer.startClientAndServer(8081);
        mockServerClient = new MockServerClient("localhost", 8081);

        // CORS options request setup
        mockServerClient
        .when(HttpRequest.request().withMethod("OPTIONS").withPath(".*"))
        .respond(HttpResponse.response()
            .withHeader("Access-Control-Allow-Origin", "*")
            .withHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            .withHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With"));
    

        // Load the login page
        driver.get(path);
    }

    @Test
    public void correctLoginTest() throws InterruptedException {
        // Locate elements using the correct IDs from the HTML
        WebElement nameInput = driver.findElement(By.id("login-input"));
        WebElement passwordInput = driver.findElement(By.id("password-input"));
        WebElement submitButton = driver.findElement(By.id("login-button"));
        
        // Mocking the login response
        mockServerClient
            .when(HttpRequest.request().withMethod("POST").withPath("/login"))
            .respond(HttpResponse.response()
                .withHeader("Content-Type", "application/json")
                .withHeader("Access-Control-Allow-Origin", "*")
                .withBody("{\"auth-token\":\"12345\"}"));
    
        nameInput.sendKeys("correct");
        passwordInput.sendKeys("correct");
        submitButton.click();
        Thread.sleep(1000);
    
        // Dismiss any unexpected alert and print the alert text
        try {
            String alertText = driver.switchTo().alert().getText();
            System.out.println("Alert Text: " + alertText);  // Print alert text for debugging
            driver.switchTo().alert().accept(); // Dismiss the alert
        } catch (org.openqa.selenium.NoAlertPresentException e) {
            System.out.println("No alert present after clicking the login button.");
        }
    
        // Assertion to verify redirection to the recipe page
        assertTrue("URL should contain 'recipe-page.html' after successful login.", driver.getCurrentUrl().contains("recipe-page.html"));
    }
    
    

    @Test
    public void incorrectLoginTest() throws InterruptedException {
        // Locate elements using the correct IDs from the HTML
        WebElement nameInput = driver.findElement(By.id("login-input"));
        WebElement passwordInput = driver.findElement(By.id("password-input"));
        WebElement submitButton = driver.findElement(By.id("login-button"));
        
        // Mocking the unauthorized response
        mockServerClient
            .when(HttpRequest.request().withMethod("POST").withPath("/login"))
            .respond(HttpResponse.response()
                .withStatusCode(401)
                .withHeader("Content-Type", "application/json")
                .withHeader("Access-Control-Allow-Origin", "*"));

        nameInput.sendKeys("incorrect");
        passwordInput.sendKeys("incorrect");
        submitButton.click();
        
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
        wait.until(ExpectedConditions.alertIsPresent());
        driver.switchTo().alert().dismiss();
        
        Thread.sleep(1000);
        assertTrue(driver.getCurrentUrl().contains("login"));
    }

    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
        if (mockServer != null) {
            mockServer.stop();
        }
        if (mockServerClient != null) {
            mockServerClient.close(); // Ensure `MockServerClient` is closed to prevent resource leaks
        }
    }
}
