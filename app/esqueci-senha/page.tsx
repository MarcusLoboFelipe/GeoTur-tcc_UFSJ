"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  async function enviar(e: any) {
    e.preventDefault();

    await fetch("/api/esqueci-senha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    setMensagem("Se o email existir, você receberá instruções.");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">

      <form
        onSubmit={enviar}
        className="bg-white p-8 rounded shadow w-96"
      >

        <h1 className="text-xl font-bold mb-4 text-center">
          Recuperar senha
        </h1>

        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-4"
        />

        <button className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800 transition">
          Enviar
        </button>

      {mensagem && (
  <>
    <p className="text-green-600 text-sm mt-3 text-center">
      {mensagem}
    </p>

    <button
      type="button"
      onClick={() => router.push("/")}
      className="mt-3 w-full border py-2 rounded hover:bg-gray-100 transition"
    >
      Voltar para Login
    </button>
  </>
)}
      </form>

    </div>
  );
}