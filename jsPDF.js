function imprimir() {
  const element = document.getElementById('elementPrint');
  const elementHeight = element.scrollHeight;

  const pdf = new jsPDF('portrait', 'mm', 'thermal', false);
  const margins = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
    width: 80
  };
  
  const contentWidth = margins.width - margins.left - margins.right;
  const pdfContent = pdf.splitTextToSize(element.innerText, contentWidth);
  pdf.setPage(1);
  pdf.text(margins.left, margins.top, pdfContent);
  pdf.output('dataurlnewwindow');
}
