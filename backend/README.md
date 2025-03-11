# API Documentation

## POST /api/user/register

### Description
This endpoint is used to register a new user.

### Request Body
The request body should be a JSON object containing the following fields:
- `fullName`: An object containing:
  - `firstName`: A string with a minimum length of 3 characters.
  - `lastName`: A string with a minimum length of 3 characters.
- `email`: A string representing a valid email address.
- `password`: A string with a minimum length of 6 characters.

### Example Request
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success (201)
- **Description**: User successfully registered.
- **Body**:
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null,
      "createdAt": "2023-10-01T00:00:00.000Z",
      "updatedAt": "2023-10-01T00:00:00.000Z"
    }
  }
  ```

#### Client Error (400)
- **Description**: Bad request due to validation errors or user already exists.
- **Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "First name must be at least 3 character long!",
        "param": "fullName.firstName",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```
  or
  ```json
  {
    "success": false,
    "message": "User already exist"
  }
  ```

### Notes
- Ensure that all required fields are provided in the request body.
- The password will be hashed before storing in the database.

## POST /api/users/login

### Description
This endpoint is used to log in an existing user.

### Request Body
The request body should be a JSON object containing the following fields:
- `email`: A string representing a valid email address.
- `password`: A string with a minimum length of 6 characters.

### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success (200)
- **Description**: User successfully logged in.
- **Body**:
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null,
      "createdAt": "2023-10-01T00:00:00.000Z",
      "updatedAt": "2023-10-01T00:00:00.000Z"
    }
  }
  ```

#### Client Error (400)
- **Description**: Bad request due to validation errors.
- **Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

#### Unauthorized (401)
- **Description**: Invalid email or password.
- **Body**:
  ```json
  {
    "success": false,
    "message": "Invalid email or password!"
  }
  ```

### Notes
- Ensure that all required fields are provided in the request body.
- The password will be compared with the hashed password stored in the database.

## GET /api/user/profile

### Description
This endpoint is used to get the profile of the authenticated user.

### Headers
- `Authorization`: Bearer token obtained from login.

### Responses

#### Success (200)
- **Description**: User profile retrieved successfully.
- **Body**:
  ```json
  {
    "_id": "user_id_here",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "createdAt": "2023-10-01T00:00:00.000Z",
    "updatedAt": "2023-10-01T00:00:00.000Z"
  }
  ```

#### Unauthorized (401)
- **Description**: Unauthorized access.
- **Body**:
  ```json
  {
    "success": false,
    "message": "Unauthorized"
  }
  ```

### Notes
- Ensure that the Authorization header is provided with a valid token.

## GET /api/user/logout

### Description
This endpoint is used to log out the authenticated user.

### Headers
- `Authorization`: Bearer token obtained from login.

### Responses

#### Success (200)
- **Description**: User successfully logged out.
- **Body**:
  ```json
  {
    "message": "Logout successfully"
  }
  ```

#### Unauthorized (401)
- **Description**: Unauthorized access.
- **Body**:
  ```json
  {
    "success": false,
    "message": "Unauthorized"
  }
  ```

### Notes
- Ensure that the Authorization header is provided with a valid token.
- The token will be added to a blacklist to prevent further use.
