"use client";

import { ProdutoRequestDto, ProdutosDto } from "@/app/models/produto";
import { SubmitErrorHandler, SubmitHandler, useForm, Controller } from "react-hook-form";
import { getProduct, updateProduct } from "@/app/services/produto.service";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'

export default function EditPage() {
    const [product, setProduct] = useState<ProdutosDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const pathname = usePathname().split("/");
    const id = pathname[pathname.length - 1] as unknown as number;
    const { control, register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ProdutoRequestDto>({
        defaultValues: product ? product : {}
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getProduct(id);
                console.log("Produto:", product);
                setValue("nome", product.nome);
                setValue("descricao", product.descricao);
                setValue("quantidade", product.quantidade);
                setValue("preco", product.preco);
                setValue("categoria", product.categoria);
                setProduct(product);
            } catch (error) {
                console.error("Erro ao obter o produto:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, setValue]);

    const onSubmit: SubmitHandler<ProdutoRequestDto> = (async (data: ProdutoRequestDto) => {
        try {
            const formattedData = {
                ...data,
                preco: parseFloat(data.preco as unknown as string),
                quantidade: parseInt(data.quantidade as unknown as string, 10)
            };
            await updateProduct(id, formattedData);
            alert("Produto editado com sucesso!");
        } catch (error) {
            console.error("Erro ao registrar o produto:", error);
            alert("Erro ao registrar o produto. Tente novamente.");
        }
        console.log(data);
    });
    const onError: SubmitErrorHandler<FormData> = (errors) => console.log(errors);
    console.log(register("nome"));
    return (
        <div>
            {loading ? (<p>Carregando</p>) : <div>
                <h2 className="text-2xl font-bold my-8">Editar Produto</h2>

                <form onSubmit={handleSubmit(onSubmit, onError)} action="" className="flex gap-3 flex-col">
                    <Controller
                        name="nome"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <input {...field} type="text" placeholder="Nome" className="py-1 px-4 border rounded-md" />}
                    />
                    {errors.nome && <span className="text-red-500">Nome é obrigatório</span>}

                    <Controller
                        name="descricao"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <textarea {...field} rows={4} placeholder="Descrição" className="py-1 px-4 border rounded-md resize-none"></textarea>}
                    />
                    {errors.descricao && <span className="text-red-500">Descrição é obrigatória</span>}

                    <div className="py-1 flex justify-between items-center">
                        <Controller
                            name="quantidade"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => <input {...field} type="number" placeholder="Quantidade" className="py-1 px-4 border rounded-md" />}
                        />
                        {errors.quantidade && <span className="text-red-500">Quantidade é obrigatória</span>}

                        <Controller
                            name="preco"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => <input {...field} type="number" placeholder="Preço" className="py-1 px-4 border rounded-md" />}
                        />
                        {errors.preco && <span className="text-red-500">Preço é obrigatório</span>}

                        <Controller
                            name="categoria"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <select {...field} className="py-1 px-4 border rounded-md">
                                    <option value="Eletronico">Eletrônicos</option>
                                    <option value="Informatica">Informática</option>
                                    <option value="CMB">Cama, Mesa e Banho</option>
                                    <option value="Moveis">Móveis</option>
                                </select>
                            )}
                        />
                        {errors.categoria && <span className="text-red-500">Categoria é obrigatória</span>}
                    </div>

                    <button type="submit" className="bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer">Editar Produto</button>
                </form>
            </div>}
        </div>
    );
}