"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetarSenha() {
  const params = useSearchParams();
  const router = useRouter();

  const token = params.get("token");

  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  async function redefinirSenha() {
    const res = await fetch("/api/resetar-senha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, senha }),
    });

    const data = await res.json();

    if (res.ok) {
      setMensagem("Senha redefinida com sucesso!");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setMensagem(data.erro || "Erro ao redefinir senha.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded shadow w-96">

        <h1 className="text-xl font-bold mb-4 text-center">
          Redefinir senha
        </h1>

<div className="flex items-center border mb-4 bg-white">
  <input
    type={mostrarSenha ? "text" : "password"}
    placeholder="Nova senha"
    value={senha}
    onChange={(e) => setSenha(e.target.value)}
    className="w-full p-2 outline-none bg-white"
  />

  <button
    type="button"
    onClick={() => setMostrarSenha(!mostrarSenha)}
    className="px-3 text-gray-600"
  >
    👁
  </button>
</div>

        <button
          onClick={redefinirSenha}
          className="bg-black text-white w-full py-2 rounded"
        >
          Redefinir senha
        </button>

        {mensagem && (
          <p className="text-center mt-3 text-sm">{mensagem}</p>
        )}

      </div>
    </div>
  );
}