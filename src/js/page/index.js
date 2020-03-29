import axios from 'axios';

axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
  console.log(response);
  response.data.map((datum) => {
    const { userId, id, title, body } = datum;
    // li 생성
    const childNode = document.createElement('li');

    // li 내용 생성
    const text = document.createTextNode(
      `No. ${id} / Title: ${title} / Author: ${userId}`
    );
    childNode.appendChild(text);
    childNode.classList.add('list-group-item', 'list-group-item-action');
    childNode.setAttribute('id', `data-${id}`);
    childNode.setAttribute('data-toggle', 'modal');
    childNode.setAttribute('data-target', '#modal');

    // li map
    document.getElementById('board-list').appendChild(childNode);
  });
});
