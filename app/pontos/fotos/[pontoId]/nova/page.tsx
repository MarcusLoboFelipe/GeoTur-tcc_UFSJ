"use client";

import { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function NovaFotoPage() {
  const { pontoId } = useParams();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const [arquivo, setArquivo] = useState<File | null>(null);
  const [erro, setErro] = useState("");

  function abrirSeletor() {
    inputRef.current?.click();
  }

  async function salvar() {

    setErro("");

    if (!arquivo) {
      setErro("Selecione uma imagem.");
      return;
    }

    const formData = new FormData();
    formData.append("file", arquivo);
    formData.append("pontoId", String(pontoId));

    const res = await fetch("/api/fotos", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      setErro("Erro ao salvar imagem.");
      return;
    }

    router.push("/feed");
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-xl px-6 py-8">

        <h1 className="text-2xl font-bold mb-6">
          Adicionar Nova Foto
        </h1>

        {/* Input escondido */}
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setArquivo(e.target.files[0]);
            }
          }}
        />

        {/* Botão estilizado */}
        <button
          onClick={abrirSeletor}
          className="w-96 border-2 border-dashed border-gray-400 p-5 rounded-lg text-gray-600 hover:bg-gray-50 transition text-left"
        >
          {arquivo ? arquivo.name : "Clique para selecionar uma imagem"}
        </button>

        {erro && (
          <p className="text-red-600 text-sm mt-3">
            {erro}
          </p>
        )}

        <div className="flex gap-3 mt-6">

          <button
            onClick={salvar}
            className="bg-black text-white px-6 py-2 rounded hover:opacity-90"
          >
            Salvar
          </button>

          <button
            onClick={() => router.push("/feed")}
            className="border px-6 py-2 rounded hover:bg-gray-100"
          >
            Cancelar
          </button>

        </div>

      </div>
    </div>
  );
}