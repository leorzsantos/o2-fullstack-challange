import axios from 'axios';
import { GET_ESTOQUE } from './endpoints';
import { MovimentacaoRequestDto, Movimentacoes } from '../models/movimentacao';
import { Estoque } from '../models/estoque';

export const getStock = async (): Promise<Estoque> => {
    try {
        const response = await axios.get(GET_ESTOQUE);
        if (response.status == 200 && response.data.STATUS == 'SUCCESS') {
            return response.data.DATA.estoque;
        } else {
            throw new Error('Erro ao obter estoque');
        }
    } catch (error) {
        console.error('Erro ao obter a lista de estoque:', error);
        throw error;
    }
};