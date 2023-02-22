function imprimir() {
  // Obtém o elemento HTML desejado pelo ID
  const element = document.getElementById('elementPrint');

  // Cria um novo objeto jsPDF com orientação paisagem e medidas de papel para uma bobina de 80mm
  const pdf = new jsPDF('portrait', 'mm', [80, 100]); // altura de 297mm = A4

  // Adiciona o conteúdo do elemento HTML ao PDF
  pdf.fromHTML(
    function() {
      // Callback executado após a impressão do PDF
      // Imprime o PDF usando um software de impressão de PDFs que suporte impressoras térmicas
      pdf.output('dataurlnewwindow');
    }
  );
}


/*
function imprimir() {
  // Obtém o elemento HTML desejado pelo ID
  const element = document.getElementById('elementPrint');

  // Obtém a altura total do conteúdo (em pixels)
  const elementHeight = element.scrollHeight;

  // Converte a altura do conteúdo de pixels para milímetros
  const elementHeightMm = elementHeight * 0.264583;

  // Cria um novo objeto jsPDF com orientação retrato e altura da página definida pelo tamanho do elemento HTML
  const pdf = new jsPDF('portrait', 'mm', [80, elementHeightMm]);

  // Cria a tabela com o conteúdo do elemento HTML
  const table = pdf.autoTableHtmlToJson(element);

  // Configura a altura da página de acordo com o tamanho do elemento HTML
  pdf.internal.pageSize.height = elementHeightMm;

  // Verifica se a tabela cabe na página atual e, se não, adiciona uma nova página antes de adicionar a tabela
  const y = pdf.autoTable.previous.finalY;
  if (y + table.height > pdf.internal.pageSize.height) {
    pdf.addPage();
  }

  // Adiciona a tabela ao PDF
  pdf.autoTable(table);

  // Adiciona uma quebra de página no final do documento
  pdf.addPage();

  // Abre a janela de impressão
  pdf.output('dataurlnewwindow');
}
*/