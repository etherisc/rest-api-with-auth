import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
// const { auth } = require('express-openid-connect');
import { auth, requiresAuth } from 'express-openid-connect';

interface Result {
    message: string;
    oidcAuth: boolean;
}

dotenv.config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    // clientSecret: process.env.AUTH0_CLIENT_SECRET,
    baseURL: 'http://localhost:3000',
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: 'https://dev-etherisc.eu.auth0.com',
    // authorizationParams: {
    //     response_type: 'code', // This requires you to provide a client secret
    //     audience: 'http://etherisc.com/api/rest',
    //     scope: 'openid profile email',
    // },
};

const app: Express = express();
const port = process.env.PORT || 3000; 

app.use(auth(config));


app.get('/', (req: Request, res: Response<Result>) => {
    console.log("request received");
    res.send({ message: 'Express + TypeScript Server', oidcAuth: req.oidc.isAuthenticated()});
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
