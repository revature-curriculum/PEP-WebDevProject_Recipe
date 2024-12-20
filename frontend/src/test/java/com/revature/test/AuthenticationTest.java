package com.revature.test;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.File;
import java.time.Duration;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.NoAlertPresentException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.revature.parent.Main;

import io.javalin.Javalin;

public class AuthenticationTest {

    private static WebDriver driver;
    private static WebDriverWait wait;
    private static Javalin app;
    private static JavascriptExecutor js;

    @BeforeClass
    public static void setUp() {
        // Start the backend programmatically
        app = Main.main(new String[0]);

        System.setProperty("webdriver.chrome.driver", "driver/chromedriver");

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        driver = new ChromeDriver(options);

        wait = new WebDriverWait(driver, Duration.ofSeconds(30));

        js = (JavascriptExecutor) driver;
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

    @After
    public void tearDownBetween() {
        performLogout();
    }
    
    @Test
    public void authTest1() {
        // go to relevant HTML page
        File loginFile = new File("src/main/java/com/revature/parent/login/login-page.html");
        String loginPath = "file:///" + loginFile.getAbsolutePath().replace("\\", "/");
        driver.get(loginPath);

        // perform login functionality
        WebElement usernameInput = driver.findElement(By.id("login-input"));
        WebElement passwordInput = driver.findElement(By.id("password-input"));
        WebElement loginButton = driver.findElement(By.id("login-button"));
        usernameInput.sendKeys("ChefTrevin");
        passwordInput.sendKeys("trevature");
        loginButton.click();

        // ensure we navigate to appropriate webpage
        wait.until(ExpectedConditions.urlContains("recipe-page")); // Wait for navigation to the recipe page
    
        // check storage contains a token
        assertTrue(!(js.executeScript(String.format(
            "return window.sessionStorage.getItem('%s');", "auth-token")) == null));
        
        // ensure admin user can perform admin operation

        // delete a recipe (admin only)
        WebElement nameInput = driver.findElement(By.id("delete-recipe-name-input"));
        WebElement deleteButton = driver.findElement(By.id("delete-recipe-submit-input"));
        nameInput.sendKeys("carrot soup");
        deleteButton.click();

        // assertions
        boolean alert = isAlertPresent(driver);

        assertEquals(false, alert);
    }

    @Test
    public void authTest2() {
        // go to relevant HTML page
        File loginFile = new File("src/main/java/com/revature/parent/login/login-page.html");
        String loginPath = "file:///" + loginFile.getAbsolutePath().replace("\\", "/");
        driver.get(loginPath);

        // perform login functionality
        WebElement usernameInput = driver.findElement(By.id("login-input"));
        WebElement passwordInput = driver.findElement(By.id("password-input"));
        WebElement loginButton = driver.findElement(By.id("login-button"));
        usernameInput.sendKeys("JoeCool");
        passwordInput.sendKeys("redbarron");
        loginButton.click();

        // ensure we navigate to appropriate webpage
        wait.until(ExpectedConditions.urlContains("recipe-page")); // Wait for navigation to the recipe page
       
        // check storage contains a token
        assertTrue(!(js.executeScript(String.format(
            "return window.sessionStorage.getItem('%s');", "auth-token")) == null));
        
        // ensure non-admin user cannot perform admin operation

        // delete a recipe (admin only)
        WebElement nameInput = driver.findElement(By.id("delete-recipe-name-input"));
        WebElement deleteButton = driver.findElement(By.id("delete-recipe-submit-input"));
        nameInput.sendKeys("stone soup");
        deleteButton.click();

        // assertions
        Alert alert = wait.until(ExpectedConditions.alertIsPresent());
        boolean isAlertPresent = isAlertPresent(driver);
        
        alert.dismiss();
        assertEquals(true, isAlertPresent);
    }

    // credit to https://www.geeksforgeeks.org/how-to-check-if-any-alert-exists-using-selenium-with-java/
    public static boolean isAlertPresent(WebDriver driver) {
        try {
            driver.switchTo().alert();
            return true;
        } catch (NoAlertPresentException e) {
            return false;
        }
    }

    private void performLogout() {
        // perform logout functionality
        WebElement logoutButton = driver.findElement(By.id("logout-button"));
        logoutButton.click();
    }
}