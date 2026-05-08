Feature: Cookies feature in the CREATIO CRM application.
    I want to use this feature file to verify all the test scenarios related to the cookies page.

    @smoke
    Scenario: Verify the Cookies Pop-up is displayed successfully.
        Given Launch the creatio crm application
        Then Verify cookies popup is displayed successfully

    Scenario: Verify the cookies pop-up content.
        Given Launch the creatio crm application
        Then Verify cookies popup is displayed successfully
        And Verify cookies popup content contains the following text
            """
            We may use cookies and similar technologies to collect information about the ways you interact with and use the website, to support and enhance features and functionality
            """
    Scenario: Verify the cookies pop-up Logos
        Given Launch the creatio crm application
        Then Verify cookies popup is displayed successfully
        And Verify cookies popup logos are displayed successfully

    Scenario: Verify the cookies pop-up selection buttons
        Given Launch the creatio crm application
        Then Verify cookies popup is displayed successfully
        And Verify cookies popup selection buttons are displayed successfully

    Scenario: Verify the cookies pop-up switch buttons
        Given Launch the creatio crm application
        Then Verify cookies popup is displayed successfully
        And Verify cookies popup switch buttons are displayed successfully

    Scenario: Verify show-details link in the cookies pop-up
        Given Launch the creatio crm application
        Then Verify cookies popup is displayed successfully
        And Verify show-details link is displayed successfully in the cookies pop-up
        When User click on show-details link in the cookies pop-up
        Then Verify cookies pop-up is expanded successfully

    Scenario: Verify the cookies pop-up "Allow All" button functionality
        Given Launch the creatio crm application
        Then Verify cookies popup is displayed successfully
        And Verify cookies popup selection buttons are displayed successfully
        When User click on "Allow All" button in the cookies pop-up
        Then Verify cookies pop-up should be closed successfully