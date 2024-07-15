import { MovimentacaoDto } from "./movimentacaoDto";

export interface MovimentacaoResponseDto {
    totalItensSaida: number;
    totalItensEntrada: number;
    movimentacoes: MovimentacaoDto[];

}