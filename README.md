# FSOC


## Project - Job Portal

### Key points
- In this project we will work feature wise. That means we pick one object like user, book, blog, etc at a time. We work through it's feature. The steps would be:
  1) We create it's model.
  2) We build it's APIs.
  3) We test these APIs.
  4) We deploy these APIs.
  5) We integrate these APIs with frontend.
  6) We will repeat steps from Step 1 to Step 5 for each feature in this project.

- In this project we are changing how we send token with a request. Instead of using a custom header key like x-api-key, you need to use Authorization header and send the JWT token as Bearer token.

## FEATURE I - Admin
### Models
- Admin Model
```yaml
{ 
  name: {type: String, required: true}
  role: {enum:["Admin", "Job-seeker", "employeer"], required: true}
  email: {type: String, required: true}
  password: {type: , reuired:  true}
  createdAt: {timestamp},
  updatedAt: {timestamp}
}
```


## Admin APIs 
### POST /register
- Create a Admin document from request body. Request body must contain image.
- Save password in encrypted format. (use bcrypt)
- __Response format__
  - _**On success**_ - Return HTTP status 201. 
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. 
```yaml
{
    "status": true,
    "message": "Admin created successfully",
    "data": {
        "name": "John",
        "email": "johndoe@mailinator.com",
        "password": "$2b$10$DpOSGb0B7cT0f6L95RnpWO2P/AtEoE6OF9diIiAEP7QrTMaV29Kmm",
        "_id": "6162876abdcb70afeeaf9cf5",
        "createdAt": "2021-10-10T06:25:46.051Z",
        "updatedAt": "2021-10-10T06:25:46.051Z",
        "__v": 0
    }
}
```

### POST /login
- Allow an Admin to login with their email and password.
- On a successful login attempt return the userId and a JWT token contatining the userId, exp, iat.
> **_NOTE:_** There is a slight change in response body. You should also return userId in addition to the JWT token.
- __Response format__
  - _**On success**_ - Return HTTP status 200 and JWT token in response body. 
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. 
```yaml
{
    "status": true,
    "message": "Admin login successfully",
    "data": {
        "userId": "6165f29cfe83625cf2c10a5c",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTYyODc2YWJkY2I3MGFmZWVhZjljZjUiLCJpYXQiOjE2MzM4NDczNzYsImV4cCI6MTYzMzg4MzM3Nn0.PgcBPLLg4J01Hyin-zR6BCk7JHBY-RpuWMG_oIK7aV8"
    }
}
```

## GET /admin/:adminId/profile (Authentication required)
- Allow an admin to fetch details of their profile.
- Make sure that userId in url param and in token is same
- __Response format__
  - _**On success**_ - Return HTTP status 200 and returns the user document. 
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. 
```yaml
{
    "status": true,
    "message": "Admin profile details",
    "data": {
        "_id": "6162876abdcb70afeeaf9cf5",
        "name": "John",
        "email": "johndoe@mailinator.com",
        "password": "$2b$10$DpOSGb0B7cT0f6L95RnpWO2P/AtEoE6OF9diIiAEP7QrTMaV29Kmm",
        "createdAt": "2021-10-10T06:25:46.051Z",
        "updatedAt": "2021-10-10T06:25:46.051Z",
        "__v": 0
    }
}
```
### PUT /admin/:adminId
- Updates a admin data by changing at least one or all fields
- Check if the adminId exists (must have isDeleted false and is present in collection). If it doesn't, return an HTTP status 404 

### DELETE /admin/:adminId
- Deletes a user by admin id if it's not already deleted
- __Response format__
  - _**On success**_ - Return HTTP status 200.


## FEATTURE II - User Model (_authentication required as authorization header - bearer token_)
### User Models

{
   firstName: {String,mandatory},
  lastName: {String, mandatory},
  email: {String, mandatory},
  password: {String, mandatory,{bycrypt}},
  jobsHistory: [jobsHistorySchema],
  role: ["admin", "user", "employer"]

}

## User APIs 
### POST /register
- Create a user document from request body. Request body must contain image.
- Save password in encrypted format. (use bcrypt)
- __Response format__
  - _**On success**_ - Return HTTP status 201. 
  - _**On error**_ - Return a suitable error message with a valid HTTP status code.
```yaml
{
    "status": true,
    "message": "user created successfully",
    "data": {}
}
```

### POST /login
- Allow an user to login with their email and password.
- On a successful login attempt return the userId and a JWT token contatining the userId, exp, iat.
> **_NOTE:_** There is a slight change in response body. You should also return userId in addition to the JWT token.

```yaml
{
    "status": true,
    "message": "User login successfully",
    "data": {
        "userId": "6165f29cfe83625cf2c10a5c",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTYyODc2YWJkY2I3MGFmZWVhZjljZjUiLCJpYXQiOjE2MzM4NDczNzYsImV4cCI6MTYzMzg4MzM3Nn0.PgcBPLLg4J01Hyin-zR6BCk7JHBY-RpuWMG_oIK7aV8"
    }
}
```

## GET /user/:userId/profile (Authentication required)

- Allow an user to fetch details of their profile.
- Make sure that userId in url param and in token is same

### PUT /user/:userId
- Updates a user data by changing at least one or all fields
- Check if the userId exists (must have isDeleted false and is present in collection). If it doesn't, return an HTTP status 404 

### DELETE /user/:userId
- Deletes a user by user id if it's not already deleted
- __Response format__
  - _**On success**_ - Return HTTP status 200. 



## FEATURE III - JOB
### Models
- job Model
```yaml
{
title: {String,mandatory,maxlength: 70},
description: {String,mandatory},
salary: {String,mandatory},
location: {String},
available: {boolean},
jobType: {ObjectId},
user: {ObjectId}

}
```


## Job APIs 
### POST /job/:jobId/
- Create a job 
- __Response format__
  - _**On success**_ - Return HTTP status 201. Also return the cart document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml


```


### GET /job/:jobId/job
- Returns Applied candidates 

### PUT /job/:jobId
- Updates a job data by changing at least one or all fields
- Check if the jobId exists (must have isDeleted false and is present in collection). If it doesn't, return an HTTP status 404 with a response body like [this](#error-response-structure)


### DELETE /job/:jobId/job
- Deletes the job 




## Testing 
- To test these apis create a new collection in Postman named Project FunctionUp Summer Of code
- Each api should have a new request in this collection
- Each request in the collection should be rightly named. Eg Create user, Create job, Get details etc

Refer below sample
 ![A Postman collection and request sample](assets/Postman-collection-sample.png)

## Response

### Successful Response structure
```yaml
{
  status: true,
  message: 'Success',
  data: {

  }
}
```
### Error Response structure
```yaml
{
  status: false,
  message: ""
}
```

