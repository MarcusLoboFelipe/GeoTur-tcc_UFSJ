"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MeuCadastro() {

  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("usuario="));

    if (cookie) {
      const dados = JSON.parse(
        decodeURIComponent(cookie.split("=")[1])
      );

      setNome(dados.nome);
      setEmail(dados.email);
    }

    setSenha("");

  }, []);

  async function salvar() {

    setMensagem("");

    const res = await fetch("/api/usuarios", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome,
        email,
        senha: senha || undefined 
      })
    });

    if (!res.ok) {
      setMensagem("Erro ao atualizar cadastro.");
      return;
    }

    const usuarioAtualizado = await res.json();

    document.cookie =
      "usuario=" +
      encodeURIComponent(JSON.stringify(usuarioAtualizado)) +
      "; path=/";

    setMensagem("Cadastro atualizado com sucesso.");

    setTimeout(() => {
      router.refresh();
    }, 1200);
  }

  async function excluirConta() {

    const res = await fetch("/api/usuarios", {
      method: "DELETE"
    });

    if (!res.ok) {
      alert("Erro ao excluir conta.");
      return;
    }

    document.cookie =
      "usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    router.push("/");
  }

  return (

    <div className="p-8 max-w-xl">

      <h1 className="text-xl font-bold mb-6">
        Meu Cadastro
      </h1>

      {/* NOME */}
      <label className="block mb-1 font-medium">
        Nome
      </label>

      <input
        className="w-full border p-2 mb-4"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      {/* EMAIL */}
      <label className="block mb-1 font-medium">
        Email
      </label>

      <input
        className="w-full border p-2 mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* SENHA */}
      <label className="block mb-1 font-medium">
        Nova senha
      </label>

      <div className="flex items-center border mb-4">

        <input
          type={mostrarSenha ? "text" : "password"}
          className="w-full p-2 outline-none"
          value={senha}
          placeholder="Digite nova senha (opcional)"
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="new-password" 
        />

        <button
          type="button"
          onClick={() => setMostrarSenha(!mostrarSenha)}
          className="px-3 text-gray-600"
        >
          👁
        </button>

      </div>

      {/* BOTÕES */}
      <div className="flex gap-3 mt-6">

        <button
          onClick={salvar}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Salvar Alterações
        </button>

        <button
          onClick={() => router.push("/feed")}
          className="border px-4 py-2 rounded"
        >
          Voltar
        </button>

      </div>

      {/* EXCLUIR */}
      <button
        onClick={() => setMostrarModal(true)}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Excluir Conta
      </button>

      {/* MENSAGEM */}
      {mensagem && (
        <p className="mt-4 text-green-600">
          {mensagem}
        </p>
      )}

      {/* MODAL */}
      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">

          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">

            <h2 className="text-lg font-bold mb-4">
              Excluir Conta
            </h2>

            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir sua conta?
              Essa ação não pode ser desfeita.
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setMostrarModal(false)}
                className="border px-4 py-2 rounded"
              >
                Cancelar
              </button>

              <button
                onClick={excluirConta}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Excluir Conta
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}