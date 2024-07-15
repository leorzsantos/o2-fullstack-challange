"use client";

import Link from "next/link";
import { ProdutosDto } from "./models/produto";
import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "./services/produto.service";

export default function Home() {
  const [products, setProducts] = useState<ProdutosDto[]>();
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        console.error("Erro ao obter produtos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      setProducts(products?.filter((product) => product.id !== id));
      alert("Produto deletado com sucesso");
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  return (
    <div>
      {loading ? (<p>Carregando</p>) : (<div>
        <div>
          <h2 className="p-4 text-2xl font-bold my-2">Lista de Produtos</h2>
          {
            products?.map((product) => (
              <div key={product.id} className="p-4 my-2 rounded-md border-b leading-9">
                <div className="font-bold ">{product.nome}</div>
                <div>
                  {product.descricao}
                </div>
                <div className="flex items-center justify-between gap-4 mt-4 ">
                  <p>Preço: R${product.preco}</p>
                  <p>Quantidade: {product.quantidade}</p>
                  <div className="flex items-center justify-end gap-4">
                  <Link className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest" href={"/pages/edit/" + product.id}>Editar</Link>
                  <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest">
                    Delete
                  </button>
                </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>)}
    </div>
  );
}
