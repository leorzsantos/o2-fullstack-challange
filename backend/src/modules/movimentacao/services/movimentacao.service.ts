import { PrismaClient } from "@prisma/client";
import { CreateMovimentacaoDto } from "../dto/createmovimentacaoDto";
import { MovimentacaoDto } from "../dto/movimentacaoDto";
import { MovimentacaoPeriodoDto } from "../dto/movimentacaoPeriodoDto";
import { MovimentacaoResponseDto } from "../dto/movimentacaoResponseDto";

export default class MovimentacaoService {
    private prisma = new PrismaClient();

    public async create(movimentacao: CreateMovimentacaoDto): Promise<MovimentacaoDto> {
        const novaMovimentacao = await this.prisma.movimentacao.create({
            data: {
                produtoId: movimentacao.produtoId,
                quantidadeMovimentada: movimentacao.quantidadeMovimentada,
                tipoMovimentacao: movimentacao.tipoMovimentacao,
            }
        });
        const movimentacaoResponse = {
            id: novaMovimentacao.id,
            produtoId: novaMovimentacao.produtoId,
            quantidadeMovimentada: novaMovimentacao.quantidadeMovimentada,
            tipoMovimentacao: novaMovimentacao.tipoMovimentacao,
            dataMovimentacao: novaMovimentacao.dataMovimentacao,
            dataCriacao: novaMovimentacao.createdAt,
            dataModificacao: novaMovimentacao.updatedAt,
        };
        return movimentacaoResponse;
    }

    public async getAll(): Promise<MovimentacaoDto[]> {
        const movimentacoes = await this.prisma.movimentacao.findMany();
        return movimentacoes.map(movimentacao => {
            return {
                id: movimentacao.id,
                produtoId: movimentacao.produtoId,
                quantidadeMovimentada: movimentacao.quantidadeMovimentada,
                tipoMovimentacao: movimentacao.tipoMovimentacao,
                dataMovimentacao: movimentacao.dataMovimentacao,
                dataCriacao: movimentacao.createdAt,
                dataModificacao: movimentacao.updatedAt,
            }
        });
    }

    public async getByDate(periodo: MovimentacaoPeriodoDto): Promise<MovimentacaoResponseDto> {
        const movimentacoes = await this.prisma.movimentacao.findMany({
            where: {
                dataMovimentacao: {
                    gte: periodo.dataInicio,
                    lte: periodo.dataFim
                }
            }
        });
        const movimentacoesPeriodo: MovimentacaoDto[] = movimentacoes.map(movimentacao => {
            return {
                id: movimentacao.id,
                produtoId: movimentacao.produtoId,
                quantidadeMovimentada: movimentacao.quantidadeMovimentada,
                tipoMovimentacao: movimentacao.tipoMovimentacao,
                dataMovimentacao: movimentacao.dataMovimentacao,
                dataCriacao: movimentacao.createdAt,
                dataModificacao: movimentacao.updatedAt,
            }
        });

        const movimentacaoResponse: MovimentacaoResponseDto = {
            movimentacoes: movimentacoesPeriodo,
            totalItensEntrada: movimentacoesPeriodo.filter(movimentacao => movimentacao.tipoMovimentacao === 'ENTRADA').reduce((acc, movimentacao) => acc + movimentacao.quantidadeMovimentada, 0),
            totalItensSaida: movimentacoesPeriodo.filter(movimentacao => movimentacao.tipoMovimentacao === 'SAIDA').reduce((acc, movimentacao) => acc + movimentacao.quantidadeMovimentada, 0),
        }
        return movimentacaoResponse;
    }
}