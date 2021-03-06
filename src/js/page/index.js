import axios from 'axios';
import parse from 'parse-link-header';

// query string to parameter function
const getUrlParams = () => {
  const params = {};
  window.location.search.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    (str, key, value) => {
      params[key] = value;
    }
  );
  return params;
};

// List and Modal View function
const createListAndModal = (data) => {
  data.map((datum) => {
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

    // modal control
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
};

// api
axios
  .get(`https://jsonplaceholder.typicode.com/posts${window.location.search}`)
  .then((response) => {
    console.log(response);

    // total count
    const headers = Object.entries(response.headers);
    for (const a of headers) {
      if (a[0] === 'x-total-count') {
        const totalCount = document.getElementById('total-count');
        const countText = document.createTextNode(a[1]);
        totalCount.appendChild(countText);
      }
    }

    // active page
    const search = window.location.search;
    const pageLinks = document.getElementsByClassName('page-link');
    for (const a of pageLinks) {
      const href = a.attributes.href.value;
      if (href == search) {
        a.parentNode.setAttribute('class', 'page-item active');
      }
    }

    // call view function
    createListAndModal(response.data);
  });
