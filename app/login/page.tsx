"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [mostrarRecuperar, setMostrarRecuperar] = useState(false);
  const [emailRecuperacao, setEmailRecuperacao] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function login(e: any) {

    e.preventDefault();
    setErro("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        senha
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setErro(data.erro || "Erro ao fazer login.");
      return;
    }

    router.push("/feed");
  }

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-200">

      <form
        onSubmit={login}
        autoComplete="off"
        className="bg-white p-8 rounded shadow w-96"
      >

        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        <label>Email</label>

        <input
          type="email"
          name="email_fake" 
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-4 bg-white"
          placeholder="Digite seu email"
        />

        <label>Senha</label>

        <div className="flex items-center border mb-4 bg-white">

          <input
            type={mostrarSenha ? "text" : "password"}
            name="senha_fake"
            autoComplete="new-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 outline-none bg-white"
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
          Entrar
        </button>

        <div className="text-center text-sm flex flex-col gap-2">

         <div
  onClick={() => setMostrarRecuperar(true)}
  className="text-blue-600 cursor-pointer hover:underline text-sm"
>
  Esqueci minha senha
</div>

          <Link href="/cadastro" className="text-blue-600 hover:underline">
            Cadastre-se
          </Link>

{/* 👇 COLE AQUI */}
{mostrarRecuperar && (
  <div className="mt-4 p-4 bg-gray-100 rounded-lg">

    <p className="text-sm mb-3">
      Digite seu email para recuperar a senha:
    </p>

    <input
      type="email"
      value={emailRecuperacao}
      onChange={(e) => setEmailRecuperacao(e.target.value)}
      className="w-full border p-2 rounded mb-3"
      placeholder="Seu email"
    />

    <button
      type="button"
      onClick={async () => {
        await fetch("/api/esqueci-senha", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: emailRecuperacao }),
        });

        setMensagem("Se o email existir, você receberá instruções.");
      }}
      className="bg-black text-white w-full py-2 rounded hover:bg-gray-800 transition"
    >
      Enviar
    </button>

    {mensagem && (
      <p className="text-green-600 text-sm mt-2 text-center">
        {mensagem}
      </p>
    )}

    <button
      type="button"
      onClick={() => {
        setMostrarRecuperar(false);
        setMensagem("");
      }}
      className="text-gray-500 text-sm mt-3 w-full"
    >
      Voltar
    </button>

  </div>
)}
        </div>

      </form>

    </div>
  );
}