import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import jsPDF from 'jspdf';

const schema = yup.object().shape({
  numeroProcesso: yup.string().required('Obrigatório'),
  dataEntrada: yup.date().required('Obrigatório'),
  resumoAcidente: yup.string().required('Obrigatório'),
  parecerPerito: yup.string().required('Obrigatório'),
  parecerGestor: yup.string().required('Obrigatório'),
  parecerChefe: yup.string().required('Obrigatório'),
});

const SinistroForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log('Dados do formulário:', data);
    gerarPDF(data);
  };


  const loadImageAsBase64 = (url) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      })
      .catch(reject);
  });
};

const gerarPDF = async (data) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // ⬇️ Carrega a imagem da pasta public dinamicamente
  const logoBase64 = await loadImageAsBase64('/logo.png');

  const pageWidth = doc.internal.pageSize.getWidth();
  const logoWidth = 40;
  const logoHeight = 40;
  const logoX = (pageWidth - logoWidth) / 2;

  // ⬇️ Insere o logotipo centralizado
  doc.addImage(logoBase64, 'PNG', logoX, 10, logoWidth, logoHeight);

  doc.setFontSize(16);
  doc.setTextColor(229, 35, 27);
  doc.setFont(undefined, 'bold');
  doc.text('EMPRESA ÍMPAR SEGUROS', pageWidth / 2, 60, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text('Direção de Regulação de Sinistros', pageWidth / 2, 68, { align: 'center' });

  // Conteúdo do formulário
  doc.setFontSize(11);
  let y = 80;

  const addMultilineText = (label, value) => {
    doc.setFont(undefined, 'bold');
    doc.text(label, 20, y);
    y += 6;
    doc.setFont(undefined, 'normal');

    const lines = doc.splitTextToSize(value, 170);
    doc.text(lines, 20, y);
    y += lines.length * 6 + 4;
  };

  addMultilineText('Processo Sinistro Nº:', data.numeroProcesso);
  addMultilineText('Data de Entrada:', data.dataEntrada);
  addMultilineText('Resumo da Descrição do Acidente:', data.resumoAcidente);
  addMultilineText('Parecer do Perito(a):', data.parecerPerito);
  addMultilineText('Parecer do(a) Gestor(a):', data.parecerGestor);
  addMultilineText('Parecer da Chefe de Regulação:', data.parecerChefe);

  // ⬇️ Visualizar antes de baixar
  const pdfUrl = doc.output('bloburl');
  window.open(pdfUrl);
};


  
 
//funcao para gerar o PDF
/*
  const gerarPDF = (data) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const logoBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'; // cole sua logo aqui

  const pageWidth = doc.internal.pageSize.getWidth();
  const logoWidth = 40;
  const logoHeight = 40;
  const logoX = (pageWidth - logoWidth) / 2;

  doc.setFontSize(16);
  doc.setTextColor(229, 35, 27); // Cor da ÍMPAR
  doc.text('EMPRESA ÍMPAR SEGUROS', 20, 20);
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Direção de Regulação de Sinistros', 20, 28);

  doc.setFontSize(11);
  let y = 40;

  const addMultilineText = (label, value) => {
    doc.setFont(undefined, 'bold');
    doc.text(label, 20, y);
    y += 6;
    doc.setFont(undefined, 'normal');

    const lines = doc.splitTextToSize(value, 170);
    doc.text(lines, 20, y);
    y += lines.length * 6 + 4;
  };

  addMultilineText('Processo Sinistro Nº:', data.numeroProcesso);
  addMultilineText('Data de Entrada:', data.dataEntrada);
  addMultilineText('Resumo da Descrição do Acidente:', data.resumoAcidente);
  addMultilineText('Parecer do Perito(a):', data.parecerPerito);
  addMultilineText('Parecer do(a) Gestor(a):', data.parecerGestor);
  addMultilineText('Parecer da Chefe de Regulação:', data.parecerChefe);
  
  
  //gerar para imprimir o PDF
  const pdfUrl = doc.output('bloburl');
  window.open(pdfUrl);
};
*/


  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#EDEDED] shadow-md rounded-lg border-[1.5px] border-[#E5231B]">
    <div className="flex justify-center">
      <img src="/logo.png" alt="Logotipo ÍMPAR" className="h-20 mb-4" />
    </div>
      <h1 className="text-2xl font-bold mb-4 text-[#E5231B]">DIREÇÃO DE REGULAÇÃO DE SINISTROS</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Processo Sinistro Nº</label>
            <input {...register('numeroProcesso')} className="w-full border-[1.5px] border-[#E5231B] rounded px-3 py-2 bg-white" />
            <p className="text-red-600 text-sm">{errors.numeroProcesso?.message}</p>
          </div>
          <div>
            <label className="block font-semibold">Data de Entrada</label>
            <input type="date" {...register('dataEntrada')} className="w-full border-[1.5px] border-[#E5231B] rounded px-3 py-2 bg-white" />
            <p className="text-red-600 text-sm">{errors.dataEntrada?.message}</p>
          </div>
        </div>

        <div>
          <label className="block font-semibold">Resumo da Descrição do Acidente:</label>
          <textarea {...register('resumoAcidente')} rows="4" className="w-full border-[1.5px] border-[#E5231B] rounded px-3 py-2 bg-white" />
          <p className="text-red-600 text-sm">{errors.resumoAcidente?.message}</p>
        </div>

        <div>
          <label className="block font-semibold">Parecer do Perito(a):</label>
          <textarea {...register('parecerPerito')} rows="4" className="w-full border-[1.5px] border-[#E5231B] rounded px-3 py-2 bg-white" />
          <p className="text-red-600 text-sm">{errors.parecerPerito?.message}</p>
        </div>

        <div>
          <label className="block font-semibold">Parecer do(a) Gestor(a):</label>
          <textarea {...register('parecerGestor')} rows="4" className="w-full border-[1.5px] border-[#E5231B] rounded px-3 py-2 bg-white" />
          <p className="text-red-600 text-sm">{errors.parecerGestor?.message}</p>
        </div>

        <div>
          <label className="block font-semibold">Parecer da Chefe de Regulação:</label>
          <textarea {...register('parecerChefe')} rows="4" className="w-full border-[1.5px] border-[#E5231B] rounded px-3 py-2 bg-white" />
          <p className="text-red-600 text-sm">{errors.parecerChefe?.message}</p>
        </div>

        <button
          type="submit"
          className="bg-[#E5231B] text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Submeter e Gerar PDF
        </button>
      </form>
    </div>
  );
};

export default SinistroForm;