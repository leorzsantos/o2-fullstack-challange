import { IsString, IsInt, IsPositive, IsNumber, IsNotEmpty } from 'class-validator';

export class ProdutoDto {
    @IsString()
    @IsNotEmpty()
    nome!: string;

    @IsString()
    @IsNotEmpty()
    descricao!: string;

    @IsInt()
    @IsPositive()
    quantidade!: number;

    @IsNumber()
    @IsPositive()
    preco!: number;

    @IsString()
    categoria!: string;
}