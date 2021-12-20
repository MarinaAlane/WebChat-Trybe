const socket = window.io();

const btnSendMessage = document.querySelector('#sendMessage');
const inputMessage = document.querySelector('#messageInput');
const btnSaveNickname = document.querySelector('#saveNickname');
const nicknameInp = document.querySelector('#nicknameInput');

let currentNickname = [];

function logRandomName(gender) {
  generateName(gender).then(currentNickname.push());
  console.log(currentNickname, 'AQUI')
}

btnSaveNickname.addEventListener('click', () => {
  currentNickname = nicknameInp.value;
});

btnSendMessage.addEventListener('click', () => {
  socket.emit('message', {
    chatMessage: inputMessage.value,
    nickname: currentNickname,
  });
  inputMessage.value = '';
});

const createMessage = (chatMessage) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = chatMessage;
  messagesUl.appendChild(li);
};

socket.on('message', (chatMessage) => createMessage(chatMessage));

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Unable to fetch data:', error);
  }
}

function fetchNames(nameType) {
  return fetchData(`https://www.randomlists.com/data/names-${nameType}.json`);
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

async function generateName(gender) {
  try {
    const response = await Promise.all([
      fetchNames(gender || pickRandom(['male', 'female'])),
      fetchNames('surnames')
    ]);

    const [firstNames, lastNames] = response;

    const firstName = pickRandom(firstNames.data);
    const lastName = pickRandom(lastNames.data);

    return `${firstName} ${lastName}`;
  } catch (error) {
    console.error('Unable to generate name:', error);
  }
}

// function logRandomName(gender) {
//   generateName(gender).then(console.log);
// }

// logRandomName()

// function returnRandomName(){
//   generateName(gender).then(console.log)
// }

// generateName(gender).then(console.log);