import { IsNotEmpty, IsString } from "class-validator";

export class MovimentacaoPeriodoDto {
    @IsString()
    @IsNotEmpty()
    dataInicio!: string;
    
    @IsString()
    @IsNotEmpty()
    dataFim!: string;
}