  function imprimir() {
    // Obtém o elemento HTML desejado pelo ID
    const element = document.getElementById('elementPrint');
  
    // Obtém a altura total do conteúdo (em pixels)
    const elementHeight = element.scrollHeight;
  
    // Converte a altura do conteúdo de pixels para milímetros
    const elementHeightMm = elementHeight * 0.264583;
  
    // Cria um novo objeto jsPDF com orientação paisagem e medidas de papel para uma bobina de 80mm
    const pdf = new jsPDF('landscape', 'mm', [80, elementHeightMm]);
  
    // Adiciona o conteúdo do elemento HTML ao PDF
    pdf.fromHTML(
      element,
      5, // posição horizontal de início do conteúdo (em mm)
      0, // posição vertical de início do conteúdo (em mm)
      {
        // opções de formatação
        width: 70, // largura do conteúdo (em mm)
        height: elementHeightMm, // limite de altura do conteúdo (em mm)
      },
      function() {
        // Callback executado após a impressão do PDF
        // Imprime o PDF usando um software de impressão de PDFs que suporte impressoras térmicas
        pdf.output('dataurlnewwindow');
      }
    );
  }
  