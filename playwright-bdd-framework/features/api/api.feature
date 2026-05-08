Feature: Git repository API validations
    As a user, I want to validate all the git repository-related API validations in this feature file.

    Background: Initialize the API request context.
        Given Initialize the API request context

    Scenario: Validate request to create a duplicate repository.
        When I send a "POST" request with endpoint "/user/repos" to create a repository with the name "JmeterRepo" and description "This is a duplicate repository"
        Then I should receive a response with status code 422
        And I should receive a response with status message "Unprocessable Entity"
        And I should receive a response with body having "message" as "Repository creation failed."

    Scenario: Validate request to create a repository with valid name.
        When I send a "POST" request with endpoint "/user/repos" to create a repository with the name "playwright-bdd-repo" and description "This is a valid repository"
        Then I should receive a response with status code 201
        And I should receive a response with status message "Created"
        And I should receive a response with body having "name" as "playwright-bdd-repo"

    Scenario: Validate request to get a valid repository.
        When I send a "GET" request with endpoint "/repos/bharathtechacademy05/playwright-bdd-repo" to get the repository
        Then I should receive a response with status code 200
        And I should receive a response with status message "OK"
        And I should receive a response with body having "name" as "playwright-bdd-repo"

    Scenario: Validate request to update your validate repository.
        When I send a "PATCH" request with endpoint "/repos/bharathtechacademy05/playwright-bdd-repo" to update the repository description "updated description"
        Then I should receive a response with status code 200
        And I should receive a response with status message "OK"
        And I should receive a response with body having "description" as "updated description"

    Scenario: Validate request to delete a valid repository.
        When I send a "DELETE" request with endpoint "/repos/bharathtechacademy05/playwright-bdd-repo" to delete the repository
        Then I should receive a response with status code 204
        And I should receive a response with status message "No Content"