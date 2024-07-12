import { PrismaClient } from "@prisma/client";
import { ProdutoDto } from "../dto/ProdutoDto";
import { ProdutoResponseDto } from "../dto/ProdutoResponseDto";

export default class ProdutoService {
    private prisma = new PrismaClient();

    public async create(produto: ProdutoDto): Promise<ProdutoResponseDto> {
        const novoProduto = await this.prisma.produto.create({
            data: {
                nome: produto.nome,
                precoUnitario: produto.preco,
                quantidadeDisponivel: produto.quantidade,
                descricao: produto.descricao,
                categoria: produto.categoria
            }
        });
        const produtoResponse = new ProdutoResponseDto(novoProduto.id, novoProduto.nome, novoProduto.descricao, novoProduto.quantidadeDisponivel, novoProduto.precoUnitario, novoProduto.categoria, novoProduto.createdAt);
        return produtoResponse;
    }

    public async edit(produto: ProdutoResponseDto, id: number): Promise<ProdutoResponseDto> {
        const produtoEditado = await this.prisma.produto.update({
            where: { id: id },
            data: {
                nome: produto.nome,
                precoUnitario: produto.preco,
                descricao: produto.descricao,
                categoria: produto.categoria
            }
        });
        let produtoResponse = new ProdutoResponseDto(produtoEditado.id, produtoEditado.nome, produtoEditado.descricao, produtoEditado.quantidadeDisponivel, produtoEditado.precoUnitario, produtoEditado.categoria, produtoEditado.createdAt);
        produtoResponse.dataModificacao = produtoEditado.updatedAt;
        return produtoResponse;
    }

    public async delete(id: number): Promise<void> {
        try {
            await this.prisma.produto.delete({
                where: { id: id }
            });
        } catch (error) {
            throw new Error('Produto não encontrado');
        }
    }

    public async getById(id: number): Promise<ProdutoResponseDto> {
        const produto = await this.prisma.produto.findUnique({
            where: { id: id }
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
        const produtos = await this.prisma.produto.findMany();
        let produtosResponse: ProdutoResponseDto[] = [];
        produtos.forEach(produto => {
            let produtoResponse = new ProdutoResponseDto(produto.id, produto.nome, produto.descricao, produto.quantidadeDisponivel, produto.precoUnitario, produto.categoria, produto.createdAt);
            produtoResponse.dataModificacao = produto.updatedAt;
            produtosResponse.push(produtoResponse);
        });
        return produtosResponse;
    }
}