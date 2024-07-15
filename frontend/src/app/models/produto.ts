export interface ProdutosDto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    categoria: string;
    dataCriacao: string;
    dataAtualizacao: string;
}

export interface ProdutoRequestDto {
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    categoria: string;
}