import axios from 'axios';

axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
  console.log(response);
  response.data.map((datum) => {
    const { userId, id, title, body } = datum;
    // li 생성
    const childNode = document.createElement('li');

    // li 내용 생성
    const text = document.createTextNode(`${id}. ${title} / Author: ${userId}`);
    childNode.appendChild(text);
    childNode.classList.add('list-group-item', 'list-group-item-action');
    childNode.setAttribute('id', `data-${id}`);
    childNode.setAttribute('data-toggle', 'modal');
    childNode.setAttribute('data-target', '#modal');

    // li map
    document.getElementById('board-list').appendChild(childNode);

    const listItem = document.getElementById(`data-${id}`);
    const onClick = () => {
      const modalTitle = document.getElementById('modal-title');
      const modalBody = document.getElementById('modal-body');

      const titleNode = document.createTextNode(`${title} / Author: ${userId}`);
      const bodyNode = document.createTextNode(`${body}`);

      if (modalTitle.hasChildNodes()) {
        modalTitle.removeChild(modalTitle.childNodes[0]);
        modalTitle.appendChild(titleNode);
        modalBody.removeChild(modalBody.childNodes[0]);
        modalBody.appendChild(bodyNode);
      } else {
        modalTitle.appendChild(titleNode);
        modalBody.appendChild(bodyNode);
      }
    };
    listItem.addEventListener('click', onClick, false);
  });
});
