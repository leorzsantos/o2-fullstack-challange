import {Application, Request, Response } from 'express';
import * as cors from 'cors';
import authMiddleware from '../modules/middleware/auth.middleware';

export class TestRoutes {
    public route(app: Application) {

        app.options('/v1/test', cors);    
        app.get('/v1/test', cors(), (req: Request, res: Response) => {
          res.status(200).json({message: "Get request successfull"});
        });
        app.post('/v1/test', cors(), authMiddleware, (req: Request, res: Response) => {
          res.status(200).json({message:"Post request successfull"});
        });
      }
}