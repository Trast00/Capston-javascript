import ListMovies from './modules/ListMovies.js';
import './style.css';

// eslint-disable-next-line no-unused-vars
const ulListMovies = document.getElementById('list-movies');

const listMovies = new ListMovies();

window.addEventListener('load', async () => {
  await listMovies.getList();
  listMovies.display(10);
});
