module.exports = () => {
  const date = new Date();
  // Função de converter data para string baseada no forum https://pt.stackoverflow.com/questions/262081/como-converter-data-e-hora-com-javascript
  // Documentação para extrair o tempo e data isolados https://www.w3schools.com/jsref/jsref_tolocaletimestring.asp
  // Consulta ao post sobre o replace: https://www.devmedia.com.br/javascript-replace-substituindo-valores-em-uma-string/39176
  // Consulta sobre forma correta de substituir uma barra com o replace https://qastack.com.br/programming/4566771/how-to-globally-replace-a-forward-slash-in-a-javascript-string
  const stringDate = date.toLocaleDateString('pt-BR').replace(/\//g, '-');
  const stringTime = date.toLocaleTimeString('pt-BR');

  return `${stringDate} ${stringTime}`;
};