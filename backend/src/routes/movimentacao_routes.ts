import {Application, Request, Response } from 'express';
import * as cors from 'cors';
import MovimentacaoController from '../modules/movimentacao/movimentacao.controller';
import { MovimentacaoPeriodoDto } from '../modules/movimentacao/dto/movimentacaoPeriodoDto';
import { validationMiddleware } from '../modules/middleware/validation.middleware';

export class MovimentacaoRoutes {

    movimentacao_controller: MovimentacaoController = new MovimentacaoController();

    public route(app: Application) {

        app.options('/v1/movimentacao', cors);    
        app.get('/v1/movimentacao', cors(), (req: Request, res: Response) => {
            this.movimentacao_controller.getAll(req, res);
        });
        app.post('/v1/movimentacao', validationMiddleware(MovimentacaoPeriodoDto), (req: Request, res: Response) => {
            this.movimentacao_controller.getByDate(req, res);
        });
      }
}
