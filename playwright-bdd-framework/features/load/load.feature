Feature: Git API Load Test Validation
    As a user of the Git API, I want to validate all the scenarios related to API performance.

    Scenario: Validate Git Repository API performance
        Given Initialize the JMeter utility
        Then I ran JMeter test plan "LoadTest.jmx" and got the performance results
