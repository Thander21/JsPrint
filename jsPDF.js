function imprimir() {
    // Obtém o elemento HTML desejado pelo ID
    const element = document.getElementById('elementPrint');

    // Calcula a altura do elemento HTML
    const elementHeight = element.offsetHeight;

    // Cria um novo objeto jsPDF com orientação paisagem e medidas de papel para uma bobina de 80mm
    const pdf = new jsPDF('landscape', 'mm', [80, elementHeight]);

    // Adiciona o conteúdo do elemento HTML ao PDF
    pdf.fromHTML(element);

    // Imprime o PDF usando um software de impressão de PDFs que suporte impressoras térmicas
    pdf.output('dataurlnewwindow');
  }