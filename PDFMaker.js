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
  
      // Gere o arquivo PDF e exiba o link para download
      var gerarBotao = document.getElementById('gerar');
      gerarBotao.addEventListener('click', function() {
        var pdfDocGenerator = pdfMake.createPdf(docDefinition);
        pdfDocGenerator.getBlob(function(blob) {
          var blobUrl = URL.createObjectURL(blob);
          var pdfWindow = window.open('', '_blank', 'height=600,width=800');
          pdfWindow.document.write('<html><head><title>Documento PDF</title></head><body style="margin: 0;"><embed width="100%" height="100%" name="plugin" src="' + blobUrl + '" type="application/pdf" /></body></html>');
          pdfWindow.print();
        });
      });