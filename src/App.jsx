import React, { useState } from 'react';
import AtribuicaoDeCulpa from './components/AtribuicaoDeCulpa';
import RelatorioDeCulpa from './components/RelatorioDeCulpa'; // <--- ADICIONADO
import { UserIcon, Home, FileText, BarChart2, Settings } from 'lucide-react';

const Inicio = () => (
  <div>
    <h1 className="text-3xl font-bold text-red-600 mb-2">Bem-vindo</h1>
    <p className="text-gray-600">Escolha uma das opções no menu lateral para iniciar.</p>
  </div>
);


export default function App() {
  const [currentPage, setCurrentPage] = useState("inicio");

  const renderPage = () => {
    switch (currentPage) {
      case "inicio":
        return <Inicio />;
      case "avaliacoes":
        return <AtribuicaoDeCulpa />;
      case "relatorios":
        return <RelatorioDeCulpa />; // <-- atualizado aqui
      default:
        return <Inicio />;
    }
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-red-600 text-white flex flex-col p-4 shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <img src={`${import.meta.env.BASE_URL}logo_white.png`} alt="Logotipo ÍMPAR" className="h-12" />
        </div>

        <nav className="space-y-2">
          <SidebarButton label="Início" icon={<Home size={18} />} active={currentPage === "inicio"} onClick={() => setCurrentPage("inicio")} />
          <SidebarButton label="Avaliações" icon={<FileText size={18} />} active={currentPage === "avaliacoes"} onClick={() => setCurrentPage("avaliacoes")} />
          <SidebarButton label="Relatórios" icon={<BarChart2 size={18} />} active={currentPage === "relatorios"} onClick={() => setCurrentPage("relatorios")} />
        
        </nav>
      </aside>

      {/* Painel principal com cabeçalho */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <header className="flex justify-end items-center p-4 bg-white shadow-md">
          <div className="flex items-center gap-2">
            <UserIcon className="text-red-600" size={20} />
            <span className="text-gray-700 font-medium">Usuário IM</span>
          </div>
        </header>

        {/* Conteúdo principal */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

function SidebarButton({ label, onClick, active, icon }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 text-left px-4 py-2 rounded-lg transition ${
        active ? "bg-white text-red-600 font-semibold shadow" : "hover:bg-red-700"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}