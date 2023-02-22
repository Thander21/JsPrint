function imprimir() {
  // Obtém o elemento HTML desejado pelo ID
  const element = document.getElementById('elementPrint');

  // Obtém a altura total do conteúdo (em pixels)
  const elementHeight = element.scrollHeight;

  // Converte a altura do conteúdo de pixels para milímetros
  const elementHeightMm = elementHeight * 0.264583;

  // Cria um novo objeto jsPDF com orientação retrato e medidas de papel para uma bobina de 80mm
  const pdf = new jsPDF('portrait', 'mm', [80, elementHeightMm]);

  // Adiciona o conteúdo do elemento HTML ao PDF
  pdf.fromHTML(element);

  // Imprime o PDF usando um software de impressão de PDFs que suporte impressoras térmicas
  pdf.output('dataurlnewwindow');

}

