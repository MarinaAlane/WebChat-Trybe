const chatModel = require('../models/chatModel'); // importação da dos metodos da camada Model

async function saveMessages({ nickname, chatMessage }, date) {
  try {
    await chatModel.saveMessages(nickname, chatMessage, date);
  } catch (error) {
    console.log(error);
  }
}

// Função camada controller que tem como responsabilidade tentar enviar as informações a proxima camada

async function getMessages(_req, res) {
  try {
    const result = await chatModel.getMessages();
    res.status(200).render('chat', { result });
  } catch (error) {
    console.log(error);
  }
}
/*
Função que tenta buscar as mensagens no banco e caso consiga ele faz um metodo render
[ - tirado do corse - alterado para o projeto
  No controller, tudo que precisamos fazer é chamar res.render , passando o caminho do arquivo. 
  Os dados necessários para renderizar o template são passados como um objeto no segundo parâmetro. 
  Como o JavaScript que embutimos na view espera que exista uma variável result , passamos nesse objeto 
  uma propriedade result contendo a lista de escritores.
]
*/
module.exports = {
  saveMessages,
  getMessages,
};