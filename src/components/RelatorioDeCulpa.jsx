import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Simulação de dados preenchidos anteriormente
const processosSalvos = [
  {
    id: 1,
    numero: "123456",
    local: "Praia, Santiago",
    data: "2025-06-15",
    hora: "14:30",
    veiculo1: "João Pereira",
    veiculo2: "Maria Silva"
  },
  {
    id: 2,
    numero: "654321",
    local: "Assomada",
    data: "2025-06-16",
    hora: "10:15",
    veiculo1: "Carlos Andrade",
    veiculo2: "Inês Lopes"
  }
];

export default function RelatorioDeCulpa() {
  const [busca, setBusca] = useState("");

  const handleEditar = (id) => {
    alert(`Editar processo ${id}`);
  };

  const handleExportar = (id) => {
    alert(`Exportar processo ${id} em PDF`);
  };

  const processosFiltrados = processosSalvos.filter((p) =>
    p.numero.includes(busca) ||
    p.local.toLowerCase().includes(busca.toLowerCase()) ||
    p.veiculo1.toLowerCase().includes(busca.toLowerCase()) ||
    p.veiculo2.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Relatório de Atribuições de Culpa</h1>
      <p className="text-muted-foreground mb-6">Visualize, edite e exporte os processos já criados.</p>

      <div className="mb-4">
        <Input
          placeholder="Procurar por número, local ou condutor..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full md:max-w-md"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Processo</th>
              <th className="px-4 py-2 text-left">Local</th>
              <th className="px-4 py-2 text-left">Data</th>
              <th className="px-4 py-2 text-left">Hora</th>
              <th className="px-4 py-2 text-left">Condutor 1</th>
              <th className="px-4 py-2 text-left">Condutor 2</th>
              <th className="px-4 py-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {processosFiltrados.map((processo) => (
              <tr key={processo.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{processo.numero}</td>
                <td className="px-4 py-2">{processo.local}</td>
                <td className="px-4 py-2">{processo.data}</td>
                <td className="px-4 py-2">{processo.hora}</td>
                <td className="px-4 py-2">{processo.veiculo1}</td>
                <td className="px-4 py-2">{processo.veiculo2}</td>
                <td className="px-4 py-2 space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditar(processo.id)}>Editar</Button>
                  <Button className="bg-red-600 hover:bg-red-700" size="sm" onClick={() => handleExportar(processo.id)}>Exportar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
