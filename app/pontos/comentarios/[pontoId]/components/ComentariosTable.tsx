"use client";

import { useState } from "react";
import Link from "next/link";

export type Comentario = {
  id: number;
  texto: string;
};

type Props = {
  comentarios: Comentario[];
  pontoId: number;
  onExcluir: (id: number) => void;
};

export default function ComentariosTable({
  comentarios,
  pontoId,
  onExcluir,
}: Props) {
  const [abertoId, setAbertoId] = useState<number | null>(null);
  const [confirmar, setConfirmar] = useState<Comentario | null>(null);

  if (!comentarios || comentarios.length === 0) {
    return (
      <p className="text-center text-gray-500 py-6">
        Nenhum comentário cadastrado
      </p>
    );
  }

  return (
    <div className="border rounded overflow-hidden">
      <div className="max-h-[65vh] overflow-y-auto relative">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr>
              <th className="px-4 py-2 border text-left">Comentário</th>
              <th className="px-4 py-2 border text-center w-32">Ações</th>
            </tr>
          </thead>

          <tbody>
            {comentarios.map((comentario) => (
              <tr key={comentario.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">
                  {comentario.texto}
                </td>

                <td className="px-4 py-2 border text-center relative">
                  <button
                    onClick={() =>
                      setAbertoId(
                        abertoId === comentario.id
                          ? null
                          : comentario.id
                      )
                    }
                    className="inline-flex items-center gap-2 border px-3 py-1 rounded bg-white hover:bg-gray-100"
                  >
                    ⚙️ Ações
                  </button>

                  {abertoId === comentario.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                      <Link
                        href={`/pontos/comentarios/${comentario.id}/editar?pontoId=${pontoId}`}
                        onClick={() => setAbertoId(null)}
                        className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-left"
                      >
                        ✏️ Editar
                      </Link>

                      <button
                        onClick={() => {
                          setConfirmar(comentario);
                          setAbertoId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 text-left"
                      >
                        🗑️ Excluir
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {confirmar && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-2">
              Excluir comentário
            </h2>

            <p className="mb-4">
              Tem certeza que deseja excluir este comentário?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmar(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  onExcluir(confirmar.id);
                  setConfirmar(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
