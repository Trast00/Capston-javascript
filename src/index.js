import ListMovies from './modules/ListMovies.js';
import './style.css';

const listMovies = new ListMovies();

window.addEventListener('load', async () => {
  await listMovies.getListMovies();
  listMovies.display();
});
