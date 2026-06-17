"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditarComentarioPage() {
  const params = useParams();
  const router = useRouter();

  const pontoId = Number(params.pontoId);
  const comentarioId = Number(params.comentarioId);

  const [texto, setTexto] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      if (!comentarioId || isNaN(comentarioId)) return;

      const res = await fetch(`/api/comentarios/${comentarioId}`);

      if (!res.ok) {
        setErro("Erro ao carregar comentário.");
        return;
      }

      const data = await res.json();
      setTexto(data.texto ?? "");
    }

    carregar();
  }, [comentarioId]);

 
  async function salvar() {
    setErro("");

    if (!texto.trim()) {
      setErro("O comentário não pode estar vazio.");
      return;
    }

    const res = await fetch(`/api/comentarios/${comentarioId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto }),
    });

    if (!res.ok) {
      setErro("Erro ao salvar.");
      return;
    }

    router.push(`/pontos/comentarios/${pontoId}`);
  }

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-xl font-bold mb-6">
        Editar Comentário
      </h1>

      <label className="block mb-1 font-medium">
        Comentário
      </label>

      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        className="w-full border p-2 mb-4"
        rows={4}
      />

      {erro && (
        <p className="text-red-600 mb-4">{erro}</p>
      )}

      <div className="flex gap-3">
        <button
          onClick={salvar}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Salvar
        </button>

        <button
          onClick={() =>
            router.push(`/pontos/comentarios/${pontoId}`)
          }
          className="border px-4 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
