import showPopup from './popup.js';

export default class ListMovies {
  constructor() {
    this.list = [];
    this.listLikedMovies = [];
    this.currentPage = 1;
    this.urlApi = 'https://api.tvmaze.com/shows';
    this.urlInvolvementAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
    this.appID = 'JJFDApwrWpJNeY3nWzvU';
  }

  /* Display (Load dynnamically) a limited number of movies */
  display = () => {
    this.list.forEach((movie) => {
      // dynamic load of list of movies
      const liMovies = document.createElement('li');
      liMovies.classList.add('flex-center', 'movie');
      liMovies.id = `movie-${movie.id}`;

      const wrapper = document.createElement('div');
      const img = document.createElement('img');
      img.src = movie.image.medium;
      img.alt = `Movies ${movie.name} image`;

      const content = document.createElement('div');
      content.classList.add('flex-center', 'movie-content');
      const h3 = document.createElement('h3');
      h3.textContent = movie.name;
      const divLikes = document.createElement('div');
      divLikes.classList.add('flex-center', 'likes');
      const iconLike = document.createElement('i');
      iconLike.classList.add('fa-regular', 'fa-heart');
      const pLike = document.createElement('p');
      if (this.listLikedMovies.containt) { pLike.textContent = '3 Like'; }

      const btnShowComment = document.createElement('button');
      btnShowComment.classList.add('btn-show-comment');
      btnShowComment.textContent = 'Comments';

      /* Event Listner */
      btnShowComment.addEventListener('click', () => {
        showPopup(movie);

        /* List of append */
        divLikes.append(iconLike, pLike);
        content.append(h3, divLikes);
        wrapper.append(img, content);
        liMovies.append(wrapper, btnShowComment);

        const ulListMovies = document.getElementById('list-movies');
        ulListMovies.append(liMovies);
      });

      iconLike.addEventListener('click', async (event) => {
        const { id } = liMovies;
        let likes = 0;

        // find the corrent number of like
        this.listLikedMovies.filter((item) => {
          if (item.item_id === id) {
            likes = item.likes;
          }
          return item;
        });

        // add a like and display
        const isLiking = event.currentTarget.classList.contains('fa-regular');
        if (isLiking) {
          likes += 1;
          event.currentTarget.classList.remove('fa-regular', 'fa-heart');
          event.currentTarget.classList.add('fa-solid', 'fa-heart');
        } else {
          likes -= 1;
          event.currentTarget.classList.remove('fa-solid', 'fa-heart');
          event.currentTarget.classList.add('fa-regular', 'fa-heart');
        }
        event.currentTarget.nextSibling.textContent = `${likes} like`;
      });

      // find the corrent number of like
      this.listLikedMovies.filter((item) => {
        if (item.item_id === liMovies.id) {
          pLike.textContent = `${item.likes} like`;
        }
        return item;
      });
    });
  }

  /* Get list of movies with a GET request to the API:  */
  getList = async () => {
    // API Request
    const data = await fetch(`${this.urlApi}?page=${this.currentPage}`);
    await data.json().then((data) => {
      this.list = data;
    });
  }
}