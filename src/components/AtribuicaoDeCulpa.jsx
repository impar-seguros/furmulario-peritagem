import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AtribuicaoDeCulpa() {
  const [step, setStep] = useState("sinistro");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2 text-red-600">Atribuição de Culpa</h1>
      <p className="text-muted-foreground mb-6">
        Preencha os dados para relatar um sinistro de automóveis
      </p>

      <div className="bg-white rounded-lg shadow p-4">
        <Tabs defaultValue="sinistro" value={step} onValueChange={setStep} className="w-full">
          <TabsList className="mb-6 border-b">
            {[ 
              { label: "Dados do Sinistro", value: "sinistro" },
              { label: "Veículos", value: "veiculos" },
              { label: "Características do Acidente", value: "acidente" },
              { label: "Descrição do Acidente", value: "descricao" },
              { label: "Legislação Infringida", value: "legislacao" },
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setStep(tab.value)}
                className={`px-4 py-2 rounded-t-md font-semibold transition-all duration-200 border-b-2
                  ${step === tab.value 
                    ? "bg-red-600 text-white border-red-600 shadow" 
                    : "text-gray-600 border-transparent hover:text-red-600 hover:border-red-300"}`}
              >
                {tab.label}
              </button>
            ))}
          </TabsList>
        

          <TabsContent value={step}>
            {step === "sinistro" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="processo">Nº do Processo</Label>
                  <Input id="processo" placeholder="Ex: 123456" />
                </div>
                <div>
                  <Label htmlFor="local">Local do Sinistro</Label>
                  <Input id="local" placeholder="Praia, Santiago" />
                </div>
                <div>
                  <Label htmlFor="data">Data do Sinistro</Label>
                  <Input id="data" type="date" />
                </div>
                <div>
                  <Label htmlFor="hora">Hora do Sinistro</Label>
                  <Input id="hora" type="time" />
                </div>
                <div className="flex justify-end col-span-full mt-6">
                  <Button onClick={() => setStep("veiculos")} className="bg-red-600 hover:bg-red-700">
                    Próximo
                  </Button>
                </div>
              </div>
            )}
            {/* Dados dos Veículos */}  

            {step === "veiculos" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2].map(i => (
                    <div key={i}>
                      <h2 className="text-lg font-semibold mb-2">Veículo {i}</h2>
                      <Label>Nome do Proprietário</Label>
                      <Input placeholder="Nome completo" />
                      <Label className="mt-2">Matrícula</Label>
                      <Input placeholder="Ex: ST-00-00" />
                      <Label className="mt-2">Marca</Label>
                      <Input placeholder="Toyota" />
                      <Label className="mt-2">Cor</Label>
                      <Input placeholder="Azul" />
                      <Label className="mt-2">Nome do Condutor</Label>
                      <Input placeholder="Nome completo" />
                      <Label className="mt-2">Carta de Condução Nº</Label>
                      <Input placeholder="Número da carta" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setStep("sinistro")}>Voltar</Button>
                  <Button onClick={() => setStep("acidente")} className="bg-red-600 hover:bg-red-700">
                    Próximo
                  </Button>
                </div>
              </div>
            )}

               {/* Características do Acidente */}

            {step === "acidente" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Local</Label><Input placeholder="Local do acidente" /></div>
                  <div><Label>Visibilidade</Label><Input placeholder="Boa, reduzida, etc." /></div>
                  <div><Label>Estado do tempo</Label><Input placeholder="Ex: Chuvoso, limpo" /></div>
                  <div><Label>Sinais existentes</Label><Input placeholder="Semáforos, sinalização horizontal..." /></div>
                  <div><Label>Estado do pavimento</Label><Input placeholder="Seco, molhado..." /></div>
                  <div><Label>Largura da via</Label><Input placeholder="Ex: 6m" /></div>
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setStep("veiculos")}>Voltar</Button>
                  <Button onClick={() => setStep("descricao")} className="bg-red-600 hover:bg-red-700">
                    Próximo
                  </Button>
                </div>
              </div>
            )}
            {/* Descrição do Acidente */}

            {step === "descricao" && (
              <div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Descrição do Acidente</Label>
                    <textarea
                      rows={8}
                      className="w-full border border-gray-300 p-3 rounded mt-1 resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Descreva como ocorreu o acidente..."
                    />
                  </div>
                  <div>
                    <Label>Parecer do Perito</Label>
                    <textarea
                      rows={8}
                      className="w-full border border-gray-300 p-3 rounded mt-1 resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Insira o parecer técnico do perito sobre o acidente..."
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setStep("acidente")}>Voltar</Button>
                  <Button onClick={() => setStep("legislacao")} className="bg-red-600 hover:bg-red-700">
                    Próximo
                  </Button>
                </div>
              </div>
            )}

            {/* Legislação Infringida */}

            {step === "legislacao" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="artigo">Artigo Infringido</Label>
                  <Input id="artigo" placeholder="Ex: Artigo 12.º" />
                </div>

                <div>
                  <Label htmlFor="codigo">Código/Referência</Label>
                  <Input id="codigo" placeholder="Ex: Código da Estrada" />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="descricaoInfracao">Descrição da Infração</Label>
                  <textarea
                    id="descricaoInfracao"
                    rows={3}
                    className="w-full border border-gray-300 p-2 rounded mt-1 resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Explique brevemente a infração observada..."
                  />
                </div>

                <div>
                  <Label htmlFor="responsavel">Responsável</Label>
                  <Input id="responsavel" placeholder="Nome ou veículo envolvido" />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="observacoes">Observações Adicionais</Label>
                  <textarea
                    id="observacoes"
                    rows={3}
                    className="w-full border border-gray-300 p-2 rounded mt-1 resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Outras informações relevantes..."
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep("descricao")}>Voltar</Button>
                <Button className="bg-red-600 hover:bg-red-700">Enviar</Button>
              </div>
            </div>
      )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

