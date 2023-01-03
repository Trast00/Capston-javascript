import ListMovies from './modules/ListMovies';
import './style.css';

const ulListMovies = document.getElementById('list-movies')

const listMovies = new ListMovies()

window.addEventListener('load', async () => {
  await listMovies.getList()
  listMovies.display(10)
})
