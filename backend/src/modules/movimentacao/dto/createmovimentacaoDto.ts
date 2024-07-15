import { TipoMovimentacaoEnum } from "./tipoMovimentacaoEnum";

export interface CreateMovimentacaoDto {
    produtoId: number;
    quantidadeMovimentada: number;
    tipoMovimentacao: TipoMovimentacaoEnum;
}