import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { validateAccessToken } from './auth0.middleware';
import { requiredScopes } from 'express-oauth2-jwt-bearer';

interface SimpleResult {
    message: string;
}

interface CreatePolicy {
    name: string;
    phone: string;
    premium: number;
    suminsured: number;
}

dotenv.config();

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3000; 

app.get('/', (req: Request, res: Response<SimpleResult>) => {
    console.log("request received");
    res.send({ message: 'Hello from Team Etherisc!' });
});

app.post('/', [validateAccessToken, requiredScopes('write:policy')], (req: Request<any, any, CreatePolicy>, res: Response<SimpleResult>) => {
    console.log("request received. name: " + req.body.name + ", phone: " + req.body.phone + ", premium: " + req.body.premium + ", suminsured: " + req.body.suminsured);
    
    if (req.body.premium <= 0) {
        res.status(400).send({ message: 'Premium must be greater than 0' });
        return;
    }
    if (req.body.suminsured <= 0) {
        res.status(400).send({ message: 'Suminsured must be greater than 0' });
        return;
    }

    res.send({ message: 'Policy created for ' + req.body.name });
});


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
