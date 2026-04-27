# API Performance Testing

## What is performance testing? 
What happens when many users use my application at the same time? 

How fast is application loading? 
How stable it is when multiple users are using my application? 
Whether our application is scalable ?Is it possible to increase the bandwidth and add a few more users? 

## Different types of performance testing ?
1. Load Testing : Load testing is all about testing the system under expected user load by gradually increasing the load. 
For example, the capacity of our application is 100 users, so we are going to start from 10 users and gradually increase to 100 and verify the application behavior. 
Main goal of load testing is checking the response time and stability of our application when we are increasing the load. 

2. Stress testing : Trying to push our system beyond the limits. 
For an example, the capacity of our application is 100 users. Now we are going to add 10-20% more users to our application and verify application behavior with additional load. 
Main goal of stress testing is identifying the breaking point. 

3. Spike testing : Spike testing is all about a sudden increase or decrease in the load within specific intervals. 
Best example for this load testing is some flash sale is happening on Amazon. How is the application behaving when so many users add it suddenly? 
Main goal is just to understand the system behavior when sudden spikes happen. 

4. Endurance testing or Soak Testing : Endurance testing is all about running the system for a long duration continuously. 
Main goal is understanding the memory leakages and degradation of application performance when we are going to maintain the load for long hours. 

## Why is performance testing so important here? 
Performance testing is very important because even if your application is functionally correct, if it is slow or if it is facing some application crashes, your users are going to leave your application immediately. 

Especially, performance testing is very important because your application is working so fast. All users are so happy when your application is slow. Immediately, people are going to uninstall your application and they are going to use the competitor app. 

## What are all the different tools available in the market to do performance testing? 
1. Apache JMeter (Open Source )
2. Gatling (Open Source )
3. K6 (Open Source )
4. Load Runner (Enterprise version)
5. Blazemeter (Enterprise version)
6. Web load (Enterprise version)

## What is JMeter ?
Apache JMeter is an open source performance testing tool. This tool will be used to mainly validate and perform performance testing related validations in such a way that 
- Simulating multiple users 
- Sending multiple requests like HTTP, DB, UI 
- Validating the performance metrics. 

Mainly, JMeter tool can be used to perform:
- web application performance testing
- API performance testing
- database performance testing
- load and stress testing

## How to use JMeter tool to perform API performance testing? (Step By Step) 
- Pre-requisites :
(Install JDK before https://www.oracle.com/in/java/technologies/downloads/#jdk26-windows)

1. Download the JMeter ZIP file from the JMeter official website (https://dlcdn.apache.org//jmeter/binaries/apache-jmeter-5.6.3.zip)
2. Extract the files from the Jmeter ZIP. 
3. Navigate to the folder 'bin' and, inside the 'bin' folder, double-click on the Apache JMeter jar file. (ApacheJMeter.jar)
4. Wait until the test plan template is getting displayed to begin the performance testing within the JMeter tool. 

## What is a test plan in JMeter? 
Test plan is a root container that defines what to test, how to test, and with how many users you want to validate your application. 

Within this test plan, you can add 
- thread group (Amount of users we want to deploy )
- samplers (Actual request to validate )
- listeners  (The component that is going to capture the results. )
- configuration elements. (Environment variables and respective values )

Sample Test Plan:
![alt text](image-2.png)

## What is Threat Group? 
Thread group is a template where we are going to add the group of virtual users that you want to deploy. What is the ramp-up period? Meaning, how much time we want to use to deploy the users and the total number of iterations to be done.

Adding Thread Group:
![alt text](image-3.png)



### Different components of Thread Group:

1. Name : Name of your project or the purpose of doing performance testing. 
For example: log in web service load testing, application API performance testing etc..

2. Comments : Short description of your performance testing and related scenarios. 
Ex: Git API Performance Testing with 100 Concurrent Users 

3. Action to be taken after a sample error : What should happen when your request is failing in the middle of the execution? 
Continue (default) : Ignore the error and continue the execution. 
Start next thread loop: Stop current iteration and start the next loop.  
Stop Thread: Stop the entire thread for the current user. 
Stop Test : Stop the entire test. 

4. Thread properties (Most important part of Thread Group)
==> Number of threads or users : Totally, how many virtual users do we want to deploy? 
Ex: 100 Users
==> Ramp up period In seconds : Total time that we want to set to deploy all the users 
Ex: 10 Sec
100 users will be deployed in 10 seconds. That means each and every second, 10 users will be added. 
==> Loop count : Total number of iterations to be executed to repeat the same process 
Ex: 2 Loops (I want to repeat the same process two times. )

5. Same user on each iteration : The same session or user will be reused with the same configurations to run all the API requests. 

6. Delay thread creation until needed : During the execution process, don't create virtual users until we need a trigger to execute. 

7. Specify thread lifetime :

=> Duration : Duration is all about the total time you want to test this application or you want to run this JMeter execution. 

=> Startup delay : Delay before each and every test begins. For example, if I will add two seconds, after two seconds only it is going to deploy the users and test the API request. 

Sample Thread Group:
![alt text](image-4.png)


## What are configuration elements in JMeter? 
Configuration elements are all about a set of templates that we are going to use to maintain the test data or configuration data while sending the API requests. 
Right-click on the Thread group => Config element ==> Select the component

Ex: User-defined variables. ,Http Header manager 

User-defined variables => To maintain the test data that we can reuse in each and every API request 
Http Header manager => To maintain all the header values before sending each and every API request, like authorization token and additional header values.

## What is HTTP Sampler ?
Sampler is all about the request that you want to validate in terms of performance testing. 
Right-click on the Thread group => Sampler ==> Http Sampler

HTTP Sampler => HTTP Sampler is the template that we are going to use to update API request details to validate the performance of API. 

## Assertions in JMeter ?
Assertions are all about a set of JMeter methods helping us in terms of validating the API response. 
- Assertions are going to ensure the correctness of each and every request
- it can catch the failure.
- It is going to validate the response data. 


## Listeners in JMeter ?
Lessons are nothing but a set of components in JMeter that can record the test results related to the performance metrics. 
View Results Tree => This listener is going to help us to capture each and every request and response details. 
Summary Report => This listener is going to capture the response time, average response time, minimum and maximum response times for each and every individual request. 
Assertion results => This listener is going to help us to capture the results related to the assertions that we have added under each and every API request. 


## Pre-processor and Post Processor ?
