/* Função de gerar string aleatória encontrei no link abaixo
  https://www.webtutorial.com.br/funcao-para-gerar-uma-string-aleatoria-random-com-caracteres-especificos-em-javascript/
  Ela funciona criando uma string base com os caracteres que serão utilizados para
  gerar o nome aleatório. O laço for pega um caracter qualquer dentro da string base
  atraves do comando charAt. O comando math.random gera um numero entre 0 e 1 aleatorio
  do tipo float, ao multiplicar esse numero pelo tamanho da string base e usarmos o comando
  math.floor teremos um numero inteiro que se encontrará entre 0 e o tamanho da string base,
  neste ponto o charAt percorrerá a string base tendo o numero aleatório gerado como parametro
  para buscar um caracter que será adicionando à variavel randomName, formando dessa forma
  o nome aleatório
 */
const randomNameGenerate = () => {
  let randomName = '';
  const characters = 'qwertyuiopasdfghjklzxcvbnm';
  for (let index = 0; index < 16; index += 1) {
    randomName += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomName;
};

/*
  A função Date aprendi com o colega Alberto Candito
  https://github.com/tryber/sd-011-project-webchat/pull/45
  A variavel data message recebe um obj. do tipo date que é passível de ser
  manipulado pelas funções toLocaleDataString e toLocaleTimeString. Na linha
  23 o uso do replace procura, atraves de um regex, por ocorrencias na string desejada
  e substitui pelo sinal '-'. Na linha 24 o objeto entre parenteses seta o horario
  utilizado como padrão de 12 horas e mostra AM ou PM para definir o período do dia
*/

const dataMessageGenerate = () => {
  const dataMessage = new Date();
  const date = dataMessage.toLocaleDateString('pt-BR').replace(/\//g, '-');
  const time = dataMessage.toLocaleTimeString('pt-BR', { hour12: true });

  return { date, time };
};

module.exports = {
  randomNameGenerate,
  dataMessageGenerate,
};