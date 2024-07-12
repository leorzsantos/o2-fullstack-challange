import { Request, Response } from 'express';
import { failureResponse, insufficientParameters, successResponse } from "../common/common.service";
import ProdutoService from './services/produtos.service';

class ProdutosController {

    private produto_service: ProdutoService = new ProdutoService();

    create(req: Request, res: Response) {
        if (req.body) {
            this.produto_service.create(req.body).then((novoProduto) => {
                successResponse('Success on create user', { produto: novoProduto }, res);
            })
                .catch(function (value) {
                    failureResponse('Erro ao salvar Produto: ' + value, { userCreated: false }, res);
                });
        } else {
            insufficientParameters(res);
        }
    }

    edit(req: Request, res: Response) {
        if (req.body && req.params.id) {
            this.produto_service.edit(req.body, parseInt(req.params.id)).then((produto) => {
                successResponse('Success on edit user', { produto: produto }, res);
            })
                .catch(function (value) {
                    failureResponse('Erro ao editar Produto: ' + value, { userEdited: false }, res);
                });
        } else {
            insufficientParameters(res);
        }
    }

    delete(req: Request, res: Response) {
        if (req.params.id) {
            this.produto_service.delete(parseInt(req.params.id)).then(() => {
                successResponse('Success on delete user', { userDeleted: true }, res);
            })
                .catch(function (value) {
                    failureResponse('Erro ao deletar Produto: ' + value, { userDeleted: false }, res);
                });
        } else {
            insufficientParameters(res);
        }
    }

    getById(req: Request, res: Response) {
        if (req.params.id) {
            this.produto_service.getById(parseInt(req.params.id)).then((produto) => {
                successResponse('Success on get user', { produto: produto }, res);
            })
                .catch(function (value) {
                    failureResponse('Erro ao buscar Produto: ' + value, { userFound: false }, res);
                });
        } else {
            insufficientParameters(res);
        }
    }

    getAll(req: Request, res: Response) {
        this.produto_service.getAll().then((produtos) => {
            successResponse('Success on get all users', { produtos: produtos }, res);
        })
            .catch(function (value) {
                failureResponse('Erro ao buscar Produtos: ' + value, { userFound: false }, res);
            });
    }

}

export default ProdutosController;