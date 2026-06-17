"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PontosLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();
  const [usuario, setUsuario] = useState<any>(null);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {

    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("usuario="));

    if (cookie) {
      const dados = JSON.parse(
        decodeURIComponent(cookie.split("=")[1])
      );
      setUsuario(dados);
    }

  }, []);

  function logout() {
    document.cookie =
      "usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.replace("/");
  }

  return (
    <div className="min-h-screen bg-white"> 

      {/* HEADER */}
      <div className="bg-black text-white flex justify-between items-center px-4 py-2">

        <div className="flex items-center gap-3">

          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="text-lg"
          >
            ☰
          </button>

          <span className="font-semibold text-base">
            GeoTur
          </span>

        </div>

        <div className="flex items-center gap-3 text-sm">

          {usuario && (
            <span>
              Bem-vindo, {usuario.nome}
            </span>
          )}

          <button
            onClick={logout}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>

        </div>

      </div>

      <div className="flex bg-white"> 

        {/* MENU */}
        {menuAberto && (
          <div className="w-60 bg-gray-50 border-r min-h-screen"> 

            <div className="p-4 font-bold border-b">
              Menu
            </div>

            <div className="flex flex-col gap-3 text-sm p-4">

              <div
                onClick={() => {
                  router.push("/feed");
                  setMenuAberto(false);
                }}
                className="cursor-pointer hover:text-blue-600"
              >
                📰 Feed
              </div>

              <div
                onClick={() => {
                  router.push("/explorar");
                  setMenuAberto(false);
                }}
                className="cursor-pointer hover:text-blue-600"
              >
                🔎 Explorar
              </div>

              <div
                onClick={() => {
                  router.push("/pontos");
                  setMenuAberto(false);
                }}
                className="cursor-pointer hover:text-blue-600"
              >
                📍 Pontos de Interesse
              </div>

              <div
                onClick={() => {
                  router.push("/pontos/meu-cadastro");
                  setMenuAberto(false);
                }}
                className="cursor-pointer hover:text-blue-600"
              >
                👤 Meu Cadastro
              </div>

            </div>

          </div>
        )}

        {/* CONTEÚDO */}
        <main className="flex-1 w-full p-6 bg-white"> 
          {children}
        </main>

      </div>

    </div>
  );
}