function imprimir() {
  // Obtém o elemento HTML desejado pelo ID
  const element = document.getElementById('elementPrint');

  // Cria um novo objeto jsPDF com orientação retrato e medidas de papel para uma bobina de 80mm
  const pdf = new jsPDF('portrait', 'mm', [80, 0]);

  // Cria a tabela com o conteúdo do elemento HTML
  const table = pdf.autoTableHtmlToJson(element);

  // Configura a altura da página de acordo com a altura do conteúdo da tabela
  const pageSize = pdf.internal.pageSize;
  const pageHeight = pageSize.height - pdf.autoTable.previous.finalY;
  pdf.autoTable.previous.finalY = 0;
  pdf.autoTableEndPosY(pageHeight);

  // Adiciona a tabela ao PDF
  pdf.autoTable(table);

  // Imprime o PDF usando um software de impressão de PDFs que suporte impressoras térmicas
  pdf.output('dataurl');
}
