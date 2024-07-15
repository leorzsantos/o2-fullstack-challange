import { Request, Response } from 'express';
import { failureResponse, successResponse } from "../common/common.service";
import EstoqueService from './service/estoque.service';

class EstoqueController {

    private estoque_service: EstoqueService = new EstoqueService();

    get(req: Request, res: Response) {
        this.estoque_service.get().then((estoque) => {
            successResponse('Successo ao bucar Estoque', { estoque: estoque }, res);
        })
            .catch(function (value) {
                failureResponse('Erro ao buscar Estoque: ' + value, { userFound: false }, res);
            });
    }

}

export default EstoqueController;