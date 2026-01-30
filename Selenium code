package com.quiz.automation;



import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

    public class QuizTest {

        public static void main(String[] args) throws InterruptedException {

            // Launch Chrome
            WebDriver driver = new ChromeDriver();

            // Open your Quiz App
            driver.get("file:///C:/Users/k.sumanth/Desktop/Quizz App/index.html");

            System.out.println("URL: " + driver.getCurrentUrl());
            System.out.println("Title: " + driver.getTitle());

            Thread.sleep(2000);//2000

            // Start Quiz
            driver.findElement(By.id("startBtn")).click();
            Thread.sleep(2000);//2000

            // Question 1 - select option "3"
            driver.findElement(By.xpath("//button[text()='3']")).click();
            Thread.sleep(1000);//1000
            driver.findElement(By.id("nextBtn")).click();

            // Question 2 - select option "2"
            driver.findElement(By.xpath("//button[text()='2']")).click();
            Thread.sleep(1000);//1000

            // Submit Quiz
            driver.findElement(By.id("submitBtn")).click();
            Thread.sleep(2000);//2000

            // Print Result
            String score = driver.findElement(By.id("score")).getText();
            System.out.println("Final Score: " + score);

            // Close Browser
            driver.quit();
        }
    }
