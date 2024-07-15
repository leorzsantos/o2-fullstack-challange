import { PrismaClient } from "@prisma/client";
import { EstoqueDto } from "../dto/estoqueDto";

export default class EstoqueService {
    private prisma = new PrismaClient();

    public async get(): Promise<EstoqueDto> {
        try {
            const produtos = await this.prisma.produto.findMany(
                {
                    where: { ativo: true }
                }
            );
            const estoqueResponse: EstoqueDto = {
                quantidadeItens: produtos.reduce((acc, produto) => acc + produto.quantidadeDisponivel, 0),
                valorTotal: produtos.reduce((acc, produto) => acc + produto.quantidadeDisponivel * produto.precoUnitario, 0),
                quantidadeProdutos: produtos.length
            };
            return estoqueResponse;
        } catch (error) {
            throw new Error('Erro ao buscar estoque');
        }
    }
}