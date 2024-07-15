import { PrismaClient } from "@prisma/client";
import { ProdutoDto } from "../dto/ProdutoDto";
import { ProdutoResponseDto } from "../dto/ProdutoResponseDto";
import { TipoMovimentacaoEnum } from "../../movimentacao/dto/tipoMovimentacaoEnum";
import { CreateMovimentacaoDto } from "../../movimentacao/dto/createmovimentacaoDto";

export default class ProdutoService {
    private prisma = new PrismaClient();

    public async create(produto: ProdutoDto): Promise<ProdutoResponseDto> {
        const novoProduto = await this.prisma.produto.create({
            data: {
                nome: produto.nome,
                precoUnitario: produto.preco,
                quantidadeDisponivel: produto.quantidade,
                descricao: produto.descricao,
                categoria: produto.categoria,
                ativo: true
            }
        });
        const movimentacao: CreateMovimentacaoDto = {
            produtoId: novoProduto.id,
            quantidadeMovimentada: novoProduto.quantidadeDisponivel,
            tipoMovimentacao: TipoMovimentacaoEnum.ENTRADA,
        }
        await this.createMovimentacao(movimentacao);
        const produtoResponse = new ProdutoResponseDto(novoProduto.id, novoProduto.nome, novoProduto.descricao, novoProduto.quantidadeDisponivel, novoProduto.precoUnitario, novoProduto.categoria, novoProduto.createdAt);
        return produtoResponse;
    }

    public async edit(produto: ProdutoResponseDto, id: number): Promise<ProdutoResponseDto> {
        const produtoDB = await this.prisma.produto.findUnique({
            where: { id: id }
        });
        if (produtoDB === null) {
            throw new Error('Produto não encontrado');
        }
        const produtoEditado = await this.prisma.produto.update({
            where: { id: id },
            data: {
                nome: produto.nome,
                precoUnitario: produto.preco,
                quantidadeDisponivel: produto.quantidade,
                descricao: produto.descricao,
                categoria: produto.categoria
            }
        });
        if (produtoDB.quantidadeDisponivel != produto.quantidade) {
            let quantidadeMovimentada = produto.quantidade - produtoDB.quantidadeDisponivel;
            if (quantidadeMovimentada < 0) {
                quantidadeMovimentada *= -1;
            }
            const movimentacao: CreateMovimentacaoDto = {
                produtoId: produtoDB.id,
                quantidadeMovimentada: quantidadeMovimentada,
                tipoMovimentacao: produto.quantidade > produtoDB.quantidadeDisponivel ? TipoMovimentacaoEnum.ENTRADA : TipoMovimentacaoEnum.SAIDA,
            }
            await this.createMovimentacao(movimentacao);

        }
        let produtoResponse = new ProdutoResponseDto(produtoEditado.id, produtoEditado.nome, produtoEditado.descricao, produtoEditado.quantidadeDisponivel, produtoEditado.precoUnitario, produtoEditado.categoria, produtoEditado.createdAt);
        produtoResponse.dataModificacao = produtoEditado.updatedAt;
        return produtoResponse;
    }

    public async delete(id: number): Promise<void> {
        try {
            const produto = await this.prisma.produto.findUnique({
                where: { id: id , ativo: true}
            });
            if (!produto) {
                throw new Error('Produto não encontrado');
            }
            await this.prisma.produto.update({
                where: { id: id },
                data: {
                    ativo: false
                }
            });
            const movimentacao: CreateMovimentacaoDto = {
                produtoId: id,
                quantidadeMovimentada: produto.quantidadeDisponivel,
                tipoMovimentacao: TipoMovimentacaoEnum.SAIDA,
            }
            await this.createMovimentacao(movimentacao);
        } catch (error) {
            throw new Error('Produto não encontrado');
        }
    }

    public async getById(id: number): Promise<ProdutoResponseDto> {
        const produto = await this.prisma.produto.findUnique({
            where: { id: id , ativo: true}
        });
        if (produto) {
            const produtoResponse = new ProdutoResponseDto(produto.id, produto.nome, produto.descricao, produto.quantidadeDisponivel, produto.precoUnitario, produto.categoria, produto.createdAt);
            produtoResponse.dataModificacao = produto.updatedAt;
            return produtoResponse;
        } else {
            throw new Error('Produto não encontrado');
        }
    }

    public async getAll(): Promise<ProdutoResponseDto[]> {
        try {
            const produtos = await this.prisma.produto.findMany(
                {
                    where: { ativo: true }
                }
            );
            let produtosResponse: ProdutoResponseDto[] = [];
            produtos.forEach(produto => {
                let produtoResponse = new ProdutoResponseDto(produto.id, produto.nome, produto.descricao, produto.quantidadeDisponivel, produto.precoUnitario, produto.categoria, produto.createdAt);
                produtoResponse.dataModificacao = produto.updatedAt;
                produtosResponse.push(produtoResponse);
            });
            return produtosResponse;
        } catch (error) {
            throw new Error('Erro ao buscar produtos');
        }
    }

    private async createMovimentacao(movimentacao: CreateMovimentacaoDto): Promise<void> {
        await this.prisma.movimentacao.create({
            data: {
                produtoId: movimentacao.produtoId,
                quantidadeMovimentada: movimentacao.quantidadeMovimentada,
                tipoMovimentacao: movimentacao.tipoMovimentacao,
            }
        });
    }
}