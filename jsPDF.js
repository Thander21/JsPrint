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
  pdf.fromHTML(
    element,
    5, // posição horizontal de início do conteúdo (em mm)
    0, // posição vertical de início do conteúdo (em mm)
    {
      // opções de formatação
      width: 70, // largura do conteúdo (em mm)
      height: elementHeightMm, // limite de altura do conteúdo (em mm)
    }
  );

  // Exibe o PDF em um modal
  const pdfData = pdf.output('datauristring');
  const modal = document.getElementById('pdfModal');
  modal.querySelector('iframe').src = pdfData;
  modal.style.display = 'block';
}