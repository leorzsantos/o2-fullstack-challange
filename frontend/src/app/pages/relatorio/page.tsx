"use client";

import { Estoque } from "@/app/models/estoque";
import { MovimentacaoRequestDto, Movimentacoes } from "@/app/models/movimentacao";
import { ProdutosDto } from "@/app/models/produto";
import { getStock } from "@/app/services/estoque.service";
import { getMovementsByDate } from "@/app/services/movimentacao.service";
import { getProducts } from "@/app/services/produto.service";
import { formatDate } from "@/app/utils/dateFormatter";
import { use, useEffect, useState } from "react";
import { set } from "react-hook-form";

export default function Relatorio() {
    const [estoque, setEstoque] = useState<Estoque | null>(null);
    const [movimentacao, setMovimentacao] = useState<Movimentacoes | null>(null);
    const [products, setProducts] = useState<ProdutosDto[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedOption, setSelectedOption] = useState<string>("1");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    useEffect(() => {
        const fetchEstoque = async () => {
            try {
                const response = await getStock();
                setEstoque(response);
            } catch (error) {
                console.error("Erro ao obter o estoque:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEstoque();
    }, [setEstoque]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response);
            } catch (error) {
                console.error("Erro ao obter produtos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [setProducts]);

    // useEffect(() => {
    //     const dateRange: MovimentacaoRequestDto = {
    //         dataInicio: startDate,
    //         dataFim: endDate
    //     };
    //     const fetchMovimentacao = async () => {
    //         try {
    //             const response = await getMovementsByDate(dateRange);
    //             setMovimentacao(response);
    //         } catch (error) {
    //             console.error("Erro ao obter movimentações:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchMovimentacao();
    // }, [setMovimentacao]);

    const fetchMovements = async () => {
        setLoading(true);
        const finalDate = new Date(endDate);
        finalDate.setDate(finalDate.getDate() + 1);
        const dateRange: MovimentacaoRequestDto = {
            dataInicio: new Date(startDate).toISOString(),
            dataFim: finalDate.toISOString()
        };

        console.log(JSON.stringify(dateRange));
        try {
            const movements = await getMovementsByDate(dateRange);
            setMovimentacao(movements);
        } catch (error) {
            console.error("Erro ao obter movimentações:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(event.target.value);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold my-3 mt-3">Tipo do Relatorio: </h2>
            <select className="py-1 px-4 border rounded-md" value={selectedOption} onChange={handleSelectChange}>
                <option value="1">Estoque Atual</option>
                <option value="2">Movimentação por Periodo</option>
                <option value="3">Total Estoque</option>
            </select>
            {selectedOption === "3" && (
                <div>
                    <h2 className="text-2xl font-bold my-8">Relatório de Estoque Total:</h2>
                    {loading ? (
                        <p>Carregando</p>
                    ) : (
                        <div className="flex gap-3 flex-col">
                            <p><span className="font-bold">Quantidade de itens: </span>{estoque?.quantidadeItens}</p>
                            <p><span className="font-bold">Valor total: </span>R${estoque?.valorTotal}</p>
                            <p><span className="font-bold">Quantidade de produtos: </span>{estoque?.quantidadeProdutos}</p>
                        </div>
                    )}
                </div>
            )}

            {selectedOption === "1" && (
                <div>
                    <h3 className="text-xl font-bold my-3 mt-3">Lista de Produtos</h3>
                    {loading ? (
                        <p>Carregando</p>
                    ) : (
                        <div className="max-h-96 overflow-y-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b">Código</th>
                                        <th className="py-2 px-4 border-b">Nome</th>
                                        <th className="py-2 px-4 border-b">Preço</th>
                                        <th className="py-2 px-4 border-b">Quantidade</th>
                                        <th className="py-2 px-4 border-b">Data Entrada</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.map((product) => (
                                        <tr key={product.id} className="text-center">
                                            <td className="py-2 px-4 border-b">{product.id}</td>
                                            <td className="py-2 px-4 border-b">{product.nome}</td>
                                            <td className="py-2 px-4 border-b">{product.preco}</td>
                                            <td className="py-2 px-4 border-b">{product.quantidade}</td>
                                            <td className="py-2 px-4 border-b">{formatDate(product.dataCriacao)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {selectedOption === "2" && (
                <div>
                    <h3 className="text-xl font-bold my-3 mt-3">Movimentações por data:</h3>
                    <p className="text-1xl font-bold">Périodo: </p>
                    <div className="flex justify-between items-center my-3">
                        <label htmlFor="" className="font-semibold">De</label>
                        <input type="date" value={startDate} onChange={handleStartDateChange} />
                        <label htmlFor="" className=" font-semibold">Até</label>
                        <input type="date" value={endDate} onChange={handleEndDateChange} />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-bold tracking-widest" onClick={fetchMovements}>Buscar</button>
                    </div>
                    {loading ? (
                        <p>Carregando</p>
                    ) : (
                        <div className="max-h-96 overflow-y-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b">Código</th>
                                        <th className="py-2 px-4 border-b">Código Produto</th>
                                        <th className="py-2 px-4 border-b">Quantidade</th>
                                        <th className="py-2 px-4 border-b">Tipo</th>
                                        <th className="py-2 px-4 border-b">Data Movimentação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {movimentacao?.movimentacoes?.map((movements) => (
                                        <tr key={movements.id} className="text-center">
                                            <td className="py-2 px-4 border-b">{movements.id}</td>
                                            <td className="py-2 px-4 border-b">{movements.produtoId}</td>
                                            <td className="py-2 px-4 border-b">{movements.quantidadeMovimentada}</td>
                                            <td className="py-2 px-4 border-b">{movements.tipoMovimentacao}</td>
                                            <td className="py-2 px-4 border-b">{formatDate(movements.dataMovimentacao)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}


        </div>
    );
}