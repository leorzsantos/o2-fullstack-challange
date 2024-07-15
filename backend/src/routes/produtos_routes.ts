import { Application, Request, Response } from 'express';
import * as cors from 'cors';
import { validationMiddleware } from '../modules/middleware/validation.middleware';
import { ProdutoDto } from '../modules/produtos/dto/ProdutoDto';
import ProdutosController from '../modules/produtos/produtos.controller';

export class ProdutosRoutes {

    produto_controller: ProdutosController = new ProdutosController();

    public route(app: Application) {

        app.options('/v1/produtos', cors);
        app.get('/v1/produtos/:id', cors(), (req: Request, res: Response) => {
            this.produto_controller.getById(req, res);
        });
        app.post('/v1/produtos', cors(), validationMiddleware(ProdutoDto), (req: Request, res: Response) => {
            this.produto_controller.create(req, res);
        });
        app.put('/v1/produtos/:id', cors(), validationMiddleware(ProdutoDto), (req: Request, res: Response) => {
            this.produto_controller.edit(req, res);
        });
        app.delete('/v1/produtos/:id', cors(), (req: Request, res: Response) => {
            this.produto_controller.delete(req, res);
        });
        app.get('/v1/all-produtos', cors(), (req: Request, res: Response) => {
            this.produto_controller.getAll(req, res);
        });
    }
}