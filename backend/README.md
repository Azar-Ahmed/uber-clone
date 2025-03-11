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

## API Endpoints

### Captain Endpoints

#### Register a new captain

**POST** `/api/captain/register`

**Body Parameters:**
- `email` (String): Email of the captain.
- `fullName` (Object): Full name of the captain.
  - `firstName` (String): First name of the captain.
  - `lastName` (String): Last name of the captain.
- `password` (String): Password of the captain.
- `vehicle` (Object): Vehicle details of the captain.
  - `color` (String): Color of the vehicle.
  - `plate` (String): Plate number of the vehicle.
  - `capacity` (Number): Capacity of the vehicle.
  - `vehicleType` (String): Type of the vehicle.

**Success Response:**
- `201 Created`
- `captain` (Object): Registered captain details.

#### Login a captain

**POST** `/api/captain/login`

**Body Parameters:**
- `email` (String): Email of the captain.
- `password` (String): Password of the captain.

**Success Response:**
- `200 OK`
- `token` (String): Authentication token.
- `captain` (Object): Logged in captain details.

#### Get captain profile

**GET** `/api/captain/profile`

**Headers:**
- `Authorization` (String): Bearer token.

**Success Response:**
- `200 OK`
- `captain` (Object): Captain profile details.

#### Logout a captain

**GET** `/api/captain/logout`

**Headers:**
- `Authorization` (String): Bearer token.

**Success Response:**
- `200 OK`
- `message` (String): Logout success message.
