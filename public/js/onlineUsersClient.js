export default function OnlineUsers() {
  // arquitetura observer
  // nao é necessario nesse caso, mas eu quis implementar na mesmo pra brincar um pouco
  const observers = [];

  const addObs = (fnc) => {
    observers.push(fnc)
  }

  const notifyAllObs = (option) => {
    for (const fnc of observers) {
      fnc(option)
    }
  }
  //--

  const userCard = document.getElementById('user-card');

  const delUser = (id) => {
    const user = document.getElementById(id);
    user.remove();
  };

  const render = (list) => {
    list.forEach(({userId}) => {
      const existingCard = document.getElementById(userId);
      if(!existingCard) {
        const userSection = document.createElement('section');
        const userImg = document.createElement('img');
        const userInfo = document.createElement('div');
        const userName = document.createElement('strong');
        const onlineTag = document.createElement('p');
        
        userSection.setAttribute('id', userId);
        userSection.setAttribute('class', 'user');
        userImg.setAttribute('class', 'user-img');
        userImg.setAttribute('src', '/icons/user.png');
        userInfo.setAttribute('class', 'user-info');
        userName.innerHTML = userId;
        onlineTag.innerHTML = 'online';
          
        userCard.appendChild(userSection)
        userSection.appendChild(userImg);
        userSection.appendChild(userInfo);
        userInfo.appendChild(userName);
        userInfo.appendChild(onlineTag);
      }
    });
  };

  return {
    addObs,
    notifyAllObs,
    delUser,
    render,
  }
}
