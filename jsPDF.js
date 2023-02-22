function imprimir() {
  // Obtém o elemento HTML desejado pelo ID
  const element = document.getElementById('elementPrint');

  // Obtém a altura total do conteúdo (em pixels)
  const elementHeight = element.scrollHeight;

  // Converte a altura do conteúdo de pixels para milímetros
  const elementHeightMm = elementHeight * 0.264583;

  // Cria um novo objeto jsPDF com orientação retrato e medidas de papel para uma bobina de 80mm
  const pdf = new jsPDF('portrait', 'mm', [80, elementHeightMm]);

   // Usa a biblioteca html2pdf para converter o elemento em um PDF
   html2pdf().from(element).outputPdf().then(function (pdf) {
    // Abre o PDF em uma nova janela de popup
    window.open(URL.createObjectURL(pdf), '_blank');
  });

  // window.open(pdf.output('bloburl'), '_self');
}

