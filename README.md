# /users/register API Documentation

## Description
The `/users/register` endpoint allows clients to create a new user. It validates the input data and returns a token upon successful registration.

## HTTP Method
POST

## Required Data
- `fullName.firstName` (String): Minimum 3 characters (required).
- `fullName.lastName` (String): Minimum 3 characters (optional).
- `email` (String): Valid email format, minimum 5 characters (required).
- `password` (String): Minimum 6 characters (required).

### Example Request Body
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "strongpassword123"
}
```

### Example Response Body
```json
{
  "message": "User created",
  "user": {
    "_id": "60f82f8b9f372a2f4f4e0d8b",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Status Codes
- **201 Created**: When the user is successfully registered.
- **400 Bad Request**: When validation fails or the user is not created.

# /users/login API Documentation

## Description
The `/users/login` endpoint allows clients to authenticate a user. It validates the input data and returns a token upon successful login.

## HTTP Method
POST

## Required Data
- `email` (String): Valid email format (required).
- `password` (String): Minimum 6 characters (required).

### Example Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "strongpassword123"
}
```

### Example Response Body
```json
{
  "message": "Login successful",
  "user": {
    "_id": "60f82f8b9f372a2f4f4e0d8b",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Status Codes
- **200 OK**: When the user is successfully authenticated.
- **400 Bad Request**: When validation fails.
- **401 Unauthorized**: When the email or password is invalid.
