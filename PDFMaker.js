// Defina o tamanho da página como 80mm x 100mm (a altura será ajustada dinamicamente)
var pageSize = {
    width: 80,
    height: '*'
  };
  
  // Crie o conteúdo do PDF (este é apenas um exemplo - substitua pelo seu próprio conteúdo)
  var content = [
    { text: 'Exemplo de impressão térmica', style: 'header' },
    { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', style: 'body' },
    { text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.', style: 'body' }
  ];
  
  // Defina os estilos do PDF (novamente, substitua pelos seus próprios estilos)
  var styles = {
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 10]
    },
    body: {
      fontSize: 12,
      margin: [0, 0, 0, 5]
    }
  };
  
  // Crie o documento PDF usando o pdfmake
  var docDefinition = {
    pageSize: pageSize,
    content: content,
    styles: styles
  };
  
  // Gere o arquivo PDF e imprima-o
  var pdfDocGenerator = pdfMake.createPdf(docDefinition);
  pdfDocGenerator.getBlob(function(blob) {
    var blobUrl = URL.createObjectURL(blob);
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.src = blobUrl;
    iframe.onload = function() {
      setTimeout(function() {
        iframe.contentWindow.print();
      }, 1000);
    };
  });
  