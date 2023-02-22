function imprimir() {
  // Obtém o elemento HTML desejado pelo ID
  const element = document.getElementById('elementPrint');

  // Obtém a altura total do conteúdo (em pixels)
  const elementHeight = element.scrollHeight;

  // Converte a altura do conteúdo de pixels para milímetros
  const elementHeightMm = elementHeight * 0.264583;

  // Define a altura máxima do conteúdo por página
  const maxHeightMm = 200;

  // Calcula o número de páginas necessárias para imprimir todo o conteúdo
  const totalPages = Math.ceil(elementHeightMm / maxHeightMm);

  // Cria um novo objeto jsPDF com orientação retrato e medidas de papel para uma bobina de 80mm
  const pdf = new jsPDF('portrait', 'mm', [80, 200]);

  // Adiciona o conteúdo do elemento HTML ao PDF, dividindo em páginas
  let startY = 5; // posição vertical inicial do conteúdo (em mm)
  for (let i = 0; i < totalPages; i++) {
    // Define a altura máxima do conteúdo para a página atual
    const maxHeightPx = maxHeightMm / 0.264583;
    const startYpx = startY / 0.264583;
    const remainingHeightPx = elementHeight - (i * maxHeightPx);
    const heightPx = Math.min(maxHeightPx, remainingHeightPx);

    // Adiciona o conteúdo da página atual ao PDF
    pdf.fromHTML(
      element,
      5, // posição horizontal de início do conteúdo (em mm)
      startY, // posição vertical de início do conteúdo (em mm)
      {
        // opções de formatação
        width: 70, // largura do conteúdo (em mm)
        height: heightPx, // limite de altura do conteúdo (em mm)
      },
      i === totalPages - 1 ? function() {
        // Callback executado após a impressão do PDF, no caso da última página
        // Imprime o PDF usando um software de impressão de PDFs que suporte impressoras térmicas
        pdf.output('dataurlnewwindow');
      } : null
    );

    // Atualiza a posição vertical para a próxima página
    startY += (heightPx / 0.264583);
  }
}
