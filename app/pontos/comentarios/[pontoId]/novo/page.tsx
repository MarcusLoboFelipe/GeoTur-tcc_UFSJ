"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function NovoComentario() {

  const router = useRouter();
  const params = useParams();

  const pontoId = Number(params.pontoId);

  const [comentario,setComentario] = useState("");
  const [erro,setErro] = useState("");
  const [loading,setLoading] = useState(false);

  async function salvar(){

    setErro("");

    if(!comentario.trim()){
      setErro("Digite um comentário.");
      return;
    }

    if(!pontoId || isNaN(pontoId)){
      setErro("Ponto inválido.");
      return;
    }

    try{

      setLoading(true);

      const res = await fetch("/api/comentarios",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          texto: comentario,
          pontoId: pontoId
        })
      });

      if(!res.ok){
        const erroApi = await res.json();
        setErro(erroApi.erro || "Erro ao salvar comentário.");
        setLoading(false);
        return;
      }

      router.push(`/pontos/comentarios/${pontoId}`);

    }catch(e){
      setErro("Erro ao conectar com o servidor.");
      setLoading(false);
    }

  }

  return(

    <div className="p-8 max-w-xl">

      <h1 className="text-xl font-bold mb-6">
        Novo Comentário
      </h1>

      <label className="block mb-1 font-medium">
        Comentário
      </label>

      <textarea
        value={comentario}
        onChange={(e)=>setComentario(e.target.value)}
        className="w-full border p-2 mb-4"
        rows={4}
      />

      {erro && (
        <p className="text-red-600 mb-4">
          {erro}
        </p>
      )}

      <div className="flex gap-3">

        <button
          onClick={salvar}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>

        <button
          onClick={()=>router.push(`/pontos/comentarios/${pontoId}`)}
          className="border px-4 py-2 rounded"
        >
          Voltar
        </button>

      </div>

    </div>

  );

}