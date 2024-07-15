export interface MovimentacaoDto {
    id: number;
    produtoId: number;
    quantidadeMovimentada: number;
    tipoMovimentacao: string;
    dataMovimentacao: Date;
    dataCriacao: Date;
    dataModificacao: Date;
}