# API Testing

## What is API?
API is a combination of a set of routines, protocols, and supporting tools used in the background to create a connection between your application UI and backend server to exchange information. 

# What is the difference between API, Web Service and Microservice ?

## Web Service
Web service is a type of API that is going to run over the internet or web. 

## Micro Service
Microservice is a tiny API that we are going to use within the application to communicate and share the information between different components of the application. 

## What is API testing? Why is it important? 
API testing is a type of software testing that involves testing APIs directly without using application UI. 

## Benefits of API testing ?

1. Early issue detection 
2. Faster execution compared to UI 
3. Completely independent from UI changes 
4. Broader test coverage. 
5. API testing is automation friendly. 

## Only API testing is enough to release the product ?
NO

# Popular API architectures ?

## SOAP
## REST
## GRAPHQL

## SOAP (simple Object Access Protocol)
SOAP services mainly rely on XML format to provide messaging services. Each SOAP service is mainly used for POST requests to send and receive the information. 

POST /webservice HTTP/1.1
Host: example.com
Content-Type: text/xml; charset=utf-8
Content-Length: length

<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
   <soap:Header/>
   <soap:Body>
      <GetUserDetails xmlns="http://example.com/">
         <UserId>12345</UserId>
      </GetUserDetails>
   </soap:Body>
</soap:Envelope>


<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
   <soap:Header/>
   <soap:Body>
      <GetUserDetails xmlns="http://example.com/">
         <Username>Bharath Reddy</Username>
         <Userrole>Senior SDET</Userrole>
      </GetUserDetails>
   </soap:Body>
</soap:Envelope>


## REST (Representational State Transfer)
RESTful services mainly use JSON format instead of using XML to exchange the information. RESTful services will use different HTTP methods to perform different types of operations. Like GET, POST, PUT, PATCH and DELETE

POST api.example.com/users/12345 HTTP/1.1

{
    "role" : "QA"
}
Host: api.example.com
Accept: application/json

Response:
{
   "id": 12345,
   "name": "John Doe",
   "email": "johndoe@example.com"
}

GET - when we want to search and retrieve existing data from the server 
POST - when we want to store new information within the backend server 
PUT - when we want to update the existing information from the server 
PATCH - when we want to modify part of the information or part of the record 
DELETE - when we want to delete the information from the server 

## GRAPHQL
GraphQL is going to allow us to send a request from the client to retrive specific data. So it is going to reduce over-fetching and under-fetching of the data.  

POST /graphql HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
   "query": "{ user(id: \"12345\") { name, email } }"
}

Response:
{
   "data": {
      "user": {
         "name": "John Doe",
         "email": "johndoe@example.com"
      }
   }
}

## How to validate RESTful services? 

## API Requirements ?

### Requirements to be collected from our developer to send the request ?

1. Purpose of API request or functionality of API ?
2. Request type means what kind of request it is:
- GET
- POST
- PUT
- PATCH
- DELETE
3. Request URL : Request URL contains: (Example: GET https://api.amazon.com/{category}/{product}?price<=50000 )
- base URL : https://api.amazon.com  (the server URL that is constant for each and every request)
- endpoint : /{category}/{product}?price<=50000  (inside the server, where exactly is the actual information available?)
- path parameters : {category} ,{product}  (the data that is changing dynamically within the endpoint)
- query parameters : ?price<=50000  (starts with a question mark to filter the search results coming from the backend server)