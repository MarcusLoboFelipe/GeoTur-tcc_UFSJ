"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CadastroPage() {

  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");

  async function cadastrar(e: any) {

    e.preventDefault();
    setErro("");

    const res = await fetch("/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome,
        email,
        senha
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setErro(data.erro || "Erro ao cadastrar.");
      return;
    }

    router.push("/");
  }

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-200">

      <form
        onSubmit={cadastrar}
        autoComplete="off"
        className="bg-white p-8 rounded shadow w-96"
      >

        <h1 className="text-2xl font-bold mb-6 text-center">
          Cadastro de Usuário
        </h1>

        <label>Nome</label>

        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          autoComplete="off"
          className="w-full border p-2 mb-4"
          placeholder="Digite seu nome"
        />

        <label>Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          className="w-full border p-2 mb-4"
          placeholder="Digite seu email"
        />

        <label>Senha</label>

        <div className="flex items-center border mb-4">

          <input
            type={mostrarSenha ? "text" : "password"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="new-password"
            className="w-full p-2 outline-none"
            placeholder="Digite sua senha"
          />

          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="px-3 text-gray-600"
          >
            {mostrarSenha ? "👁" : "👁"}
          </button>

        </div>

        {erro && (
          <p className="text-red-600 mb-4">
            {erro}
          </p>
        )}

        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded mb-4"
        >
          Cadastrar
        </button>

        <div className="text-center text-sm">

          <Link
            href="/login"
            className="text-blue-600 hover:underline"
          >
            Já tenho conta → Fazer login
          </Link>

        </div>

      </form>

    </div>
  );
}