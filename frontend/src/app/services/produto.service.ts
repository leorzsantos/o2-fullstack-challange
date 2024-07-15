import axios from 'axios';
import { CREATE_PRODUCT, GET_ALLPRODUCTS, GET_PRODUCTS } from './endpoints';
import { ProdutoRequestDto, ProdutosDto } from '../models/produto';

// Função para obter a lista de produtos
export const getProducts = async (): Promise<ProdutosDto[]> => {
    try {
        const response = await axios.get(GET_ALLPRODUCTS);
        if (response.status == 200 && response.data.STATUS == 'SUCCESS') {
            return response.data.DATA.produtos;
        } else {
            throw new Error('Erro ao obter a lista de produtos');
        }
    } catch (error) {
        console.error('Erro ao obter a lista de produtos:', error);
        throw error;
    }
};

export const createProduct = async (produto: ProdutoRequestDto): Promise<ProdutosDto> => {
    try {
        const response = await axios.post<ProdutosDto>(CREATE_PRODUCT, produto);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar um produto:', error);
        throw error;
    }
}

export const updateProduct = async (id: number, produto: ProdutoRequestDto): Promise<ProdutosDto> => {
    try {
        const response = await axios.put<ProdutosDto>(`${GET_PRODUCTS}/${id}`, produto);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar um produto:', error);
        throw error;
    }
}

export const deleteProduct = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${GET_PRODUCTS}/${id}`);
    } catch (error) {
        console.error('Erro ao deletar um produto:', error);
        throw error;
    }
}

export const getProduct = async (id: number): Promise<ProdutosDto> => {
    try {
        const response = await axios.get(`${GET_PRODUCTS}/${id}`);
        if (response.status == 200 && response.data.STATUS == 'SUCCESS') {
            return response.data.DATA.produto;
        } else {
            throw new Error('Erro ao obter produto');
        }
       
    } catch (error) {
        console.error('Erro ao obter produto:', error);
        throw error;
    }
};