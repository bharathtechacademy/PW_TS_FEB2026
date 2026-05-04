Feature: Creatio CRM Login Feature
    I want to use this feature file to verify all the test scenarios related to the login page of the Creatio CRM application.

    Background: Close the cookies pop-up if displayed.
        Given Launch the creatio crm application
        Then Verify cookies popup is displayed successfully
        And Verify cookies popup selection buttons are displayed successfully
        When User click on "Allow All" button in the cookies pop-up
        Then Verify cookies pop-up should be closed successfully

    Scenario: Verify the login page is displayed successfully.
        Given The Login page is launched

    Scenario Outline: Verify the login feature with "<scenario>" credential.
        Given The Login page is launched
        When User enter "<username>" and "<password>" in the login page
        And User click on Login button in the login page
        Then Login Should be "<result>"
        Examples:
            | scenario | username                       | password                | result  |
            | Valid    | bharattechacademy5@outlook.com | BharathTechAcademy#1234 | success |
            | Invalid  | invalid@test.com               | InvalidPass123          | failure |

    Scenario: Verify the Forgot Password link functionality in the login page.
        Given The Login page is launched
        Then Verify Forgot Password link is displayed successfully in the login page
        When User click on Forgot Password link in the login page
        Then Verify user is navigated to the Forgot Password page successfully

    Scenario: Verify Social Media Login options in the login page.
        Given The Login page is launched
        Then Verify Social Media Login options are displayed successfully in the login page

    Scenario Outline: Verify the Logout functionality after successful login.
        Given The Login page is launched
        When User enter "<username>" and "<password>" in the login page
        And User click on Login button in the login page
        Then Login Should be "<result>"
        When User click on Logout button in the application
        Then Verify user is logged out successfully and navigated to the login page
        Examples:
            | username                       | password                | result  |
            | bharattechacademy5@outlook.com | BharathTechAcademy#1234 | success |
