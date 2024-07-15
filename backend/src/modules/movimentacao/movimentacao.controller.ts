import { Request, Response } from 'express';
import { failureResponse, insufficientParameters, successResponse } from "../common/common.service";
import MovimentacaoService from './services/movimentacao.service';

class MovimentacaoController {

    private movimentacao_service: MovimentacaoService = new MovimentacaoService();

    getAll(req: Request, res: Response) {
        this.movimentacao_service.getAll().then((movimentacoes) => {
            successResponse('Successo ao bucar Movimentações', { movimentacoes: movimentacoes }, res);
        })
            .catch(function (value) {
                failureResponse('Erro ao buscar Movimentações: ' + value, { userFound: false }, res);
            });
    }

    getByDate(req: Request, res: Response) {
        if (req.body) {
            this.movimentacao_service.getByDate(req.body).then((movimentacoes) => {
                successResponse('Successo ao bucar Movimentações', { movimentacoes: movimentacoes }, res);
            })
                .catch(function (value) {
                    failureResponse('Erro ao buscar Produto: ' + value, { userFound: false }, res);
                });
        } else {
            insufficientParameters(res);
        }
    }

}

export default MovimentacaoController;