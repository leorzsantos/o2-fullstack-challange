import { IsString, IsInt, IsPositive, IsNumber, IsNotEmpty, IsDate } from 'class-validator';

export class ProdutoResponseDto {
    @IsInt()
    @IsPositive()
    id!: number;

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

    @IsDate()
    dataCriacao!: Date;

    @IsDate()
    dataModificacao!: Date;

    constructor(id: number, nome: string, descricao: string, quantidade: number, preco: number, categoria: string, dataCriacao: Date) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.preco = preco;
        this.categoria = categoria;
        this.dataCriacao = dataCriacao;
    }
}