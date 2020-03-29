import axios from 'axios';

axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
  console.log(response);
});
