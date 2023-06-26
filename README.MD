# rest-api-with-auth

## Description

This is a simple REST API with authentication using JWT and Auth0 as OAuth provider.

## Local Setup

### Prerequisites

```bash
npm install
```

### Environment Variables

Create a .env file in the root directory and add the following variables:

```bash
AUTH0_DOMAIN=
AUTH0_AUDIENCE=
```

### Run

```bash
npm run dev
```

## Container based setup

The application can be run as a container. The Dockerfile is provided in the root directory. 
The container requires the same environment variables as mentioned above. It exposes a single port 3000.

To build run the following command:

```bash
docker build -t rest-api-with-auth .
```

To run the container:

```bash
docker run --name=rest-api-with-auth --rm=true -p 3000:3000 -e AUTH0_DOMAIN=... -e AUTH0_AUDIENCE=... rest-api-with-auth
```

## API Endpoints

### GET /

Returns a welcome message.

### POST /

Create a new policy. Provide the following parameters in the request body:

```json
{
  "name": "policy holder name",
  "phone": "phone number",
  "premium": "premium amount",
  "suminsured": "sum insured amount" 
}
```

This must be sent as an authenticated request. The JWT token must be sent in the Authorization header as a Bearer token.
The JWT token must be valid, have scope `write:policy` and the audience must be as configured in the environment variable `AUTH0_AUDIENCE`.
