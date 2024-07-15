import {Application, Request, Response } from 'express';
import * as cors from 'cors';
import EstoqueController from '../modules/estoque/estoque.controller';

export class EstoqueRoutes {

    estoque_controller: EstoqueController = new EstoqueController();

    public route(app: Application) {

        app.options('/v1/estoque', cors);    
        app.get('/v1/estoque', cors(), (req: Request, res: Response) => {
            this.estoque_controller.get(req, res);
        });
      }
}
