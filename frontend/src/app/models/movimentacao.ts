interface Movimentacao {
    id: number;
    produtoId: number;
    quantidadeMovimentada: number;
    tipoMovimentacao: 'ENTRADA' | 'SAIDA';
    dataMovimentacao: string;
    dataCriacao: string;
    dataModificacao: string;
}

export interface Movimentacoes {
    movimentacoes: Movimentacao[];
    totalItensEntrada: number;
    totalItensSaida: number;
}

export interface MovimentacaoRequestDto {
    dataInicio: string;
    dataFim: string;
}