import ListMovies from './modules/ListMovies';
import './style.css';

const ulListMovies = document.getElementById('list-movies')

const listMovies = new ListMovies()

window.addEventListener('load', async () => {
  await listMovies.getListLikes()
  await listMovies.getListMovies()
  listMovies.display()
  //listMovies.addLike(1, "-1")
  //listMovies.createApp()
})

