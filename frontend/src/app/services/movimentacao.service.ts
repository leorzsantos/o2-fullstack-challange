import axios from 'axios';
import { GET_MOVIMENTACOES } from './endpoints';
import { MovimentacaoRequestDto, Movimentacoes } from '../models/movimentacao';

export const getMovementsByDate = async (periodo: MovimentacaoRequestDto): Promise<Movimentacoes> => {
    try {
        const response = await axios.post(GET_MOVIMENTACOES, periodo);
        if (response.status == 200 && response.data.STATUS == 'SUCCESS') {
            return response.data.DATA.movimentacoes;
        } else {
            throw new Error('Erro ao obter a lista de movimentações');
        }
    } catch (error) {
        console.error('Erro ao obter a lista de movimentações:', error);
        throw error;
    }
};