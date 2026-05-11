# Prompt and prompt engineering frameworks 

## What is a prompt? 
A prompt is all about a simple instruction or question given to the AI model. 

The importance of the prompt is only if you are going to give a better prompt, then only will you get a better AI response. 

Example :
Good Prompt  vs Bad prompt

Bad prompt :
Explain Playwright ?

Good Prompt :
Explain Playwright in simple words with detailed architecture and the default folder structure, and also explain the advantage over Selenium. Give me some real-time examples, considering I am a beginner, so that it will be easy for me to understand each and every simple concept. Remember, I am already having very good experience in Selenium and Java, based on which to understand easily this Playwright and TypeScript. Can you give me a nice plan as well? 


## Prompt Frameworks ?
Prompt frameworks are a set of standard techniques that we are going to follow to get the best outcome from the AI model by providing a prompt in a more structured and systematic way. 

1. RACE Framework
2. CLEAR Framework


## RACE Framework
- R referes to role 
- A refers to action. 
- C refers to context. 
- E refers to expectation or examples. 

RACE framework is always going to tell us whenever we are going to give any prompt to get some output or response from the AI model. The prompt should contain a minimum of four important components:
1. The role of the current user
2. What kind of action you are trying to perform
3. What is the background context of that particular action
4. What kind of output you are expecting
If possible, you can provide some examples.


### Before RACE Framework vs After RACE Framework

Before RACE Framework 

Prompt : 
Can you read the user story displayed on the web page and write all the possible test cases with detailed test steps? It should cover all the positive, negative, and edge cases ?


After RACE Framework 

Prompt:

Role : Act as a Senior Quality Analyst. 

Action : Write all possible positive, negative, and edge Test cases for the given user story displayed on the current page. 

Context : This application is related to CREATIO CRM. It is a CRM-based application, and recently our developer designed the login page and added a couple of validations to avoid invalid logins. Now I want to write all the possible test cases to identify the maximum defects. For that, we need to generate detailed test cases that cover end-to-end functionality related to login. I want to upload the test cases in Azure TFS by following the standard Azure template. 

Expectation : I want a CSV file to be generated with positive, negative, and edge cases in the below format. 

* Mandatory test steps along with expected results to be included in each and every testcase.

1. Launch the Chrome browser. 
2. Enter the URL and launch the application with the URL "https://accounts.creatio.com/login/alm"
3. Verify whether the cookies pop-up is getting displayed. 
4. Select the "Allow All" button and close the cookies popup. 
5. Verify whether the login page is displayed successfully. 

SampleTestCases.csv
===================
ID,Work Item Type,Title,Test Step,Step Action,Step Expected,Area Path,Assigned To,State
,Test Case,Verify whether cookies popup is getting displayed when user launch the application,,,,Creatio CRM,Bharath Tech Academy <bharattechacademy3@outlook.com>,Design
,,,1," Launch the browser. 

Browser = Chrome", Browser should be launched successfully. ,,,
,,,2," Enter URL and launch the application. 

URL = https://accounts.creatio.com/login/alm", application should be launched successfully. ,,,
,,,3, Verify whether Cookies popup is getting displayed ,cookies pop-up should get displayed before the login page to take the consent from the user. ,,,
,Test Case,Verify Cookies Consent message displayed in the Cookies popup,,,,Creatio CRM,Bharath Tech Academy <bharattechacademy3@outlook.com>,Design
,,,1," Launch the browser. 

Browser = Chrome", Browser should be launched successfully. ,,,
,,,2," Enter URL and launch the application. 

URL = https://accounts.creatio.com/login/alm", application should be launched successfully. ,,,
,,,3, Verify whether Cookies popup is getting displayed ,cookies pop-up should get displayed before the login page to take the consent from the user. ,,,
,,,4,Verify Cookies Consent message displayed in the Cookies popup," consent message should be displayed as below

""This website uses cookies",,,
,Test Case,Verify logos displayed in the Cookies popup.,,,,Creatio CRM,Bharath Tech Academy <bharattechacademy3@outlook.com>,Design
,,,1,"Launch the browser. 

Browser = Chrome",Browser should be launched successfully.,,,
,,,2,"Enter URL and launch the application. 

URL = https://accounts.creatio.com/login/alm",application should be launched successfully.,,,
,,,3,Verify whether Cookies popup is getting displayed,cookies pop-up should get displayed before the login page to take the consent from the user.,,,
,,,4,Verify logos displayed in the Cookies popup.,Creatio logo and Cookies Bot logo should be displayed within the cookies popup.,,,

