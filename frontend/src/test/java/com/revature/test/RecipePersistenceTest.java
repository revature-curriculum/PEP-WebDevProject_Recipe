package com.revature.test;

import static org.junit.Assert.assertTrue;

import java.io.File;
import java.time.Duration;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.javalin.Javalin;
import com.revature.parent.Main;

public class RecipePersistenceTest {

    private static WebDriver driver;
    private static WebDriverWait wait;
    private static Javalin app;

    @BeforeClass
    public static void setUp() {
        // Start the backend programmatically
        app = Main.main(new String[0]);
        //app.start(8081);

        System.setProperty("webdriver.chrome.driver", "driver/chromedriver");

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        driver = new ChromeDriver(options);

        
        wait = new WebDriverWait(driver, Duration.ofSeconds(30));

        // Load the HTML file for the recipe page
        File file = new File("src/main/java/com/revature/parent/recipe/recipe-page.html");
        String path = "file://" + file.getAbsolutePath();
        driver.get(path);
    }

    @AfterClass
    public static void tearDown() {
        // Stop the backend and clean up
        if (app != null) {
            app.stop();
        }
        if (driver != null) {
            driver.quit();
        }
    }

    private void handleUnexpectedAlerts(WebDriver driver) {
        try {
            WebDriverWait alertWait = new WebDriverWait(driver, Duration.ofSeconds(3));
            Alert alert = alertWait.until(ExpectedConditions.alertIsPresent());
            System.out.println("Unexpected Alert Text: " + alert.getText());
            alert.dismiss();
        } catch (TimeoutException e) {
            System.out.println("No unexpected alerts.");
        }
    }

    
    //     @Test
    //     public void addRecipePostTest() {
        
    // // Testing
    
    // File loginFile = new File("src/main/java/com/revature/parent/login/login-page.html");
    // String loginPath = "file://" + loginFile.getAbsolutePath();
    // driver.get(loginPath);
    
    // WebElement usernameInput = driver.findElement(By.id("login-input"));
    // WebElement passwordInput = driver.findElement(By.id("password-input"));
    // WebElement loginButton = driver.findElement(By.id("login-button"));
    
    // usernameInput.sendKeys("ChefTrevin"); 
    // passwordInput.sendKeys("trevature");
    // loginButton.click();
    
    // File recipeFile = new File("src/main/java/com/revature/parent/recipe/recipe-page.html");
    // String recipePath = "file://" + recipeFile.getAbsolutePath();
    // wait.until(ExpectedConditions.urlContains(recipePath));
    
    //         WebElement nameInput = driver.findElement(By.id("add-recipe-name-input"));
    //         WebElement instructionsInput = driver.findElement(By.id("add-recipe-instructions-input"));
    //         WebElement addButton = driver.findElement(By.id("add-recipe-submit-input"));
    
    //         nameInput.sendKeys("Beef Stroganoff");
    //         instructionsInput.sendKeys("Mix beef with sauce and serve over pasta");
//         addButton.click();

//         wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("recipe-list")));
//         WebElement recipeList = driver.findElement(By.id("recipe-list"));
//         String innerHTML = recipeList.getAttribute("innerHTML");

//         assertTrue("Expected recipe to be added.", innerHTML.contains("Beef Stroganoff"));
//     }



private void performLogin() {
    File loginFile = new File("src/main/java/com/revature/parent/login/login-page.html");
    String loginPath = "file:///" + loginFile.getAbsolutePath().replace("\\", "/");
    driver.get(loginPath);

    WebElement usernameInput = driver.findElement(By.id("login-input"));
    WebElement passwordInput = driver.findElement(By.id("password-input"));
    WebElement loginButton = driver.findElement(By.id("login-button"));

    usernameInput.sendKeys("ChefTrevin");
    passwordInput.sendKeys("trevature");
    loginButton.click();

    wait.until(ExpectedConditions.urlContains("recipe-page")); // Wait for navigation to the recipe page
}


@Test
public void addRecipePostTest() {
    
    // Load the login page
    // File loginFile = new File("src/main/java/com/revature/parent/login/login-page.html");
    // String loginPath = "file:///" + loginFile.getAbsolutePath().replace("\\", "/"); // Ensures URL format consistency
    // driver.get(loginPath);
    
    // // Perform login
    // WebElement usernameInput = driver.findElement(By.id("login-input"));
    // WebElement passwordInput = driver.findElement(By.id("password-input"));
    // WebElement loginButton = driver.findElement(By.id("login-button"));
    
    // usernameInput.sendKeys("ChefTrevin"); 
    // passwordInput.sendKeys("trevature");
    // loginButton.click();

    performLogin();
    
    // Load the recipe page
    File recipeFile = new File("src/main/java/com/revature/parent/recipe/recipe-page.html");
    String recipePath = "file:///" + recipeFile.getAbsolutePath().replace("\\", "/"); // Ensures URL format consistency
    
    // Debug the current URL to identify mismatches
    System.out.println("Expected Recipe Page Path: " + recipePath);
    System.out.println("Current URL before waiting: " + driver.getCurrentUrl());
    
    // Wait for the recipe page to load
    wait.until(ExpectedConditions.urlContains("recipe-page.html")); // Matching by partial identifier for flexibility
    
    // Debug the current URL after the wait
    System.out.println("Current URL after waiting: " + driver.getCurrentUrl());

    // Add a recipe
    WebElement nameInput = driver.findElement(By.id("add-recipe-name-input"));
    WebElement instructionsInput = driver.findElement(By.id("add-recipe-instructions-input"));
    WebElement addButton = driver.findElement(By.id("add-recipe-submit-input"));
    
    nameInput.sendKeys("Beef Stroganoff");
    instructionsInput.sendKeys("Mix beef with sauce and serve over pasta");
    addButton.click();
    
    // Wait for the recipe list to update
    wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("recipe-list")));
    WebElement recipeList = driver.findElement(By.id("recipe-list"));
    String innerHTML = recipeList.getAttribute("innerHTML");
    
    // Assert the result
    assertTrue("Expected recipe to be added.", innerHTML.contains("Beef Stroganoff"));
}

@Test
public void displayRecipesOnInitTest() {

    // addRecipePostTest();

    performLogin();

    handleUnexpectedAlerts(driver);

    driver.navigate().refresh(); // Trigger backend API call

    wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("recipe-list")));
    WebElement recipeList = driver.findElement(By.id("recipe-list"));
    String innerHTML = recipeList.getAttribute("innerHTML");

    System.out.println("Actual innerHTML: " + innerHTML);

    assertTrue("Expected recipes to be displayed.", innerHTML.contains("Beef Stroganoff"));
    //assertTrue("Expected recipes to be displayed.", innerHTML.contains("Shashlik"));
}
    // @Test
    // public void updateRecipePutTest() {
    //     WebElement nameInput = driver.findElement(By.id("update-recipe-name-input"));
    //     WebElement instructionsInput = driver.findElement(By.id("update-recipe-instructions-input"));
    //     WebElement updateButton = driver.findElement(By.id("update-recipe-submit-input"));

    //     nameInput.sendKeys("Beef Stroganoff");
    //     instructionsInput.sendKeys("Updated instructions for beef stroganoff");
    //     updateButton.click();

    //     wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("recipe-list")));
    //     WebElement recipeList = driver.findElement(By.id("recipe-list"));
    //     String innerHTML = recipeList.getAttribute("innerHTML");

    //     assertTrue("Expected recipe to be updated.", innerHTML.contains("Updated instructions for beef stroganoff"));
    // }

    private void handleUnexpectedAlerts() {
        try {
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());
            System.out.println("Alert detected: " + alert.getText());
            alert.dismiss();
        } catch (TimeoutException e) {
            System.out.println("No unexpected alerts.");
        }
    }
    

    @Test
public void updateRecipePutTest() {
    WebElement nameInput = driver.findElement(By.id("update-recipe-name-input"));
    WebElement instructionsInput = driver.findElement(By.id("update-recipe-instructions-input"));
    WebElement updateButton = driver.findElement(By.id("update-recipe-submit-input"));

    nameInput.sendKeys("Beef Stroganoff");
    instructionsInput.sendKeys("Updated instructions for beef stroganoff");
    updateButton.click();
    handleUnexpectedAlerts();

  
    wait.until(ExpectedConditions.textToBePresentInElementLocated(
            By.id("recipe-list"),
            "Updated instructions for beef stroganoff"
    ));

    WebElement recipeList = driver.findElement(By.id("recipe-list"));
    String innerHTML = recipeList.getAttribute("innerHTML");

    assertTrue("Expected recipe to be updated.", innerHTML.contains("Updated instructions for beef stroganoff"));
}


    // @Test
    // public void deleteRecipeDeleteTest() {

    //     WebElement nameInput = driver.findElement(By.id("add-recipe-name-input"));
    //     WebElement instructionsInput = driver.findElement(By.id("add-recipe-instructions-input"));
    //     WebElement addButton = driver.findElement(By.id("add-recipe-submit-input"));
    
    //     nameInput.sendKeys("Beef Stroganoff");
    //     instructionsInput.sendKeys("Mix beef with sauce and serve over pasta");
    //     addButton.click();
    
    //     // Wait for the recipe to appear
    //     wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id("recipe-list"), "Beef Stroganoff"));

    //     WebElement deleteNameInput = driver.findElement(By.id("delete-recipe-name-input"));
    //     WebElement deleteButton = driver.findElement(By.id("delete-recipe-submit-input"));

    //     deleteNameInput.sendKeys("Beef Stroganoff");
    //     deleteButton.click();

    //     wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("recipe-list")));
    //     WebElement recipeList = driver.findElement(By.id("recipe-list"));
    //     String innerHTML = recipeList.getAttribute("innerHTML");

    //     assertTrue("Expected recipe to be deleted.", !innerHTML.contains("Beef Stroganoff"));
    // }





    


    @Test
public void deleteRecipeDeleteTest() {

    performLogin();
    addRecipePostTest();

    // Proceed with deletion
    WebElement nameInput = driver.findElement(By.id("delete-recipe-name-input"));
    WebElement deleteButton = driver.findElement(By.id("delete-recipe-submit-input"));

    nameInput.sendKeys("Beef Stroganoff");
    deleteButton.click();

    wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("recipe-list")));
    WebElement recipeList = driver.findElement(By.id("recipe-list"));
    String innerHTML = recipeList.getAttribute("innerHTML");

    assertTrue("Expected recipe to be deleted.", !innerHTML.contains("Beef Stroganoff"));
}

}
