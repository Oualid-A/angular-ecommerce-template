Feature: Login to application

    As a valid user 
    i want to login into the application

    Scenario: Valid Login
        Given I open login page
        When I submit login
        Then I should see homepage