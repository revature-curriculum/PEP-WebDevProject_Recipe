package com.revature;

import java.io.File;
import java.time.Duration;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.PageLoadStrategy;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class RecipeOperationsTest {
    private WebDriver webDriver;
    
    @SuppressWarnings("unused")
    private WebDriverWait wait;
    /**
     * Set up the chrome driver for running bdd selenium tests in the browser.
     */
    @Before
    public void setUp() {
 System.setProperty("webdriver.chrome.driver", "driver/chromedriver"); // linux_64

        File file = new File("src/main/java/com/revature/recipe/recipe-page.html");
        String path = "file://" + file.getAbsolutePath();

        ChromeOptions options = new ChromeOptions();
        options.addArguments("headless");
        webDriver = new ChromeDriver(options);
        wait = new WebDriverWait(webDriver, Duration.ofSeconds(30));
        webDriver.get(path);
        options.setPageLoadStrategy(PageLoadStrategy.EAGER);
    }

        /**
     * When the page first loads, there should be no recipes, so nothing should be displayed within the recipe-list.
     * @throws InterruptedException
     */
    @Test
    public void testRecipeEmptyOnStart() throws InterruptedException {
        WebElement list = webDriver.findElement(By.id("recipe-list"));
        String actual = list.getAttribute("innerHTML");
        Thread.sleep(1000);
        Assert.assertTrue(actual == null || actual.length()<=1);
    }
    /**
     * When a new recipe is submitted, some tag underneath the recipe-list should, at some point, contain the recipe's
     * information. This test is written to allow you to pass so long as any descendant of the <ul> recipe-list contains
     * the identifying text.
     * @throws InterruptedException
     */
    @Test
    public void testRecipeExistsOnAdd() throws InterruptedException {
        WebElement button = webDriver.findElement(By.id("add-recipe-submit-input"));
        WebElement nameInput = webDriver.findElement(By.id("add-recipe-name-input"));
        WebElement instructionsInput = webDriver.findElement(By.id("add-recipe-instructions-input"));
        WebElement list = webDriver.findElement(By.id("recipe-list"));
        String expectedName = "Olivier salad";
        String expectedInstructions = "Cook carrots, potatoes, mix with chopped ham, pickles, peas, and mayo";
        nameInput.sendKeys(expectedName);
        instructionsInput.sendKeys(expectedInstructions);
        button.click();
        Thread.sleep(1000);
        String actual = list.getAttribute("innerHTML");
        Assert.assertTrue(actual.contains(expectedName));
        Assert.assertTrue(actual.contains(expectedInstructions));
    }
    /**
     * When multiple recipes are added, they should all be simultaneously visible on the site under the <ul> tag.
     * @throws InterruptedException
     */
    @Test
    public void testMultipleRecipeExistsOnAdd() throws InterruptedException {
        WebElement button = webDriver.findElement(By.id("add-recipe-submit-input"));
        WebElement nameInput = webDriver.findElement(By.id("add-recipe-name-input"));
        WebElement instructionsInput = webDriver.findElement(By.id("add-recipe-instructions-input"));
        WebElement list = webDriver.findElement(By.id("recipe-list"));
        String expectedName1 = "Olivier salad";
        String expectedInstructions1 = "Cook carrots, potatoes, mix with chopped ham, pickles, peas, and mayo";
        String expectedName2 = "Herring under coat";
        String expectedInstructions2 = "Place beet/mayo salad over preserved herring.";
        nameInput.sendKeys(expectedName1);
        instructionsInput.sendKeys(expectedInstructions1);
        button.click();
        Thread.sleep(1000);
        String actual1 = list.getAttribute("innerHTML");
        Assert.assertTrue(actual1.contains(expectedName1));
        Assert.assertTrue(actual1.contains(expectedInstructions1));
        Assert.assertFalse(actual1.contains(expectedName2));
        Assert.assertFalse(actual1.contains(expectedInstructions2));
        nameInput.clear();
        instructionsInput.clear();
        nameInput.sendKeys(expectedName2);
        instructionsInput.sendKeys(expectedInstructions2);
        button.click();
        Thread.sleep(1000);
        String actual2 = list.getAttribute("innerHTML");
        Assert.assertTrue(actual2.contains(expectedName1));
        Assert.assertTrue(actual2.contains(expectedInstructions1));
        Assert.assertTrue(actual2.contains(expectedName2));
        Assert.assertTrue(actual2.contains(expectedInstructions2));
    }

    /**
     * When a recipe is updated, its instructions data should be changed to the new set of instructions.
     * @throws InterruptedException
     */
    @Test
    public void testRecipeUpdate() throws InterruptedException {
        WebElement addButton = webDriver.findElement(By.id("add-recipe-submit-input"));
        WebElement addNameInput = webDriver.findElement(By.id("add-recipe-name-input"));
        WebElement addInstructionsInput = webDriver.findElement(By.id("add-recipe-instructions-input"));
        WebElement updateButton = webDriver.findElement(By.id("update-recipe-submit-input"));
        WebElement updateNameInput = webDriver.findElement(By.id("update-recipe-name-input"));
        WebElement updateInstructionsInput = webDriver.findElement(By.id("update-recipe-instructions-input"));
        WebElement list = webDriver.findElement(By.id("recipe-list"));
        String expectedName1 = "Olivier salad";
        String expectedInstructions1 = "Combine all the required ingredients";
        String expectedInstructions2 = "Cook carrots, potatoes, mix with chopped ham, pickles, peas, and mayo";
        addNameInput.sendKeys(expectedName1);
        addInstructionsInput.sendKeys(expectedInstructions1);
        addButton.click();
        Thread.sleep(1000);
        String actual1 = list.getAttribute("innerHTML");
        Assert.assertTrue(actual1.contains(expectedName1));
        Assert.assertTrue(actual1.contains(expectedInstructions1));
        Assert.assertFalse(actual1.contains(expectedInstructions2));
        updateNameInput.sendKeys(expectedName1);
        updateInstructionsInput.sendKeys(expectedInstructions2);
        updateButton.click();
        Thread.sleep(1000);
        String actual2 = list.getAttribute("innerHTML");
        Assert.assertFalse(actual2.contains(expectedInstructions1));
        Assert.assertTrue(actual2.contains(expectedInstructions2));
    }
    /**
     * When a recipe is deleted, it should no longer be visible on the site.
     * @throws InterruptedException
     */
    @Test
    public void testRecipeDelete() throws InterruptedException {
        WebElement addButton = webDriver.findElement(By.id("add-recipe-submit-input"));
        WebElement addNameInput = webDriver.findElement(By.id("add-recipe-name-input"));
        WebElement addInstructionsInput = webDriver.findElement(By.id("add-recipe-instructions-input"));
        WebElement deleteButton = webDriver.findElement(By.id("delete-recipe-submit-input"));
        WebElement deleteNameInput = webDriver.findElement(By.id("delete-recipe-name-input"));
        WebElement list = webDriver.findElement(By.id("recipe-list"));
        String expectedName = "Olivier salad";
        String expectedInstructions = "Cook carrots, potatoes, mix with chopped ham, pickles, peas, and mayo";
        addNameInput.sendKeys(expectedName);
        addInstructionsInput.sendKeys(expectedInstructions);
        addButton.click();
        Thread.sleep(1000);
        String actual1 = list.getAttribute("innerHTML");
        Assert.assertTrue(actual1.contains(expectedName));
        Assert.assertTrue(actual1.contains(expectedInstructions));
        deleteNameInput.sendKeys(expectedName);
        deleteButton.click();
        Thread.sleep(1000);
        String actual2 = list.getAttribute("innerHTML");
        Assert.assertFalse(actual2.contains(expectedName));
        Assert.assertFalse(actual2.contains(expectedInstructions));
    }
    /**
     * After every test, close down hanging browsers spawned by the chromedriver.
     */
    @After
    public void tearDown() {
        // Close the browser
        webDriver.quit();
    }
}
