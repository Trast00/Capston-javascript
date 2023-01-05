const PopupMovies = require('./PopupMovies.js');

class ListMovies {
  constructor() {
    this.list = [];
    this.listLikedMovies = [];
    this.currentPage = 1;
    this.urlApi = 'https://api.tvmaze.com/shows';
    this.urlInvolvementAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
    this.appID = 'JJFDApwrWpJNeY3nWzvU';
  }

  /* add a movie to the list of movies */
  addMovie = (movie) => {
    this.list.push(movie);
    this.display(movie);
  }

  /* Display (Load dynnamically) a limited number of movies */
  display = (movie) => {
    // dynamic load of list of movies
    const liMovies = document.createElement('li');
    liMovies.classList.add('flex-center', 'movie');
    liMovies.id = `movie-${movie.id}`;

    const wrapper = document.createElement('div');
    const img = document.createElement('img');
    img.src = movie.image.medium;
    img.alt = `Movies ${movie.name} image`;

    const date = document.createElement('p');
    date.classList.add('movie-date');
    date.textContent = movie.premiered;

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

    const ulListGenre = document.createElement('ul');
    ulListGenre.classList.add('flex-center', 'list-genres');
    movie.genres.forEach((genre) => {
      const liGenre = document.createElement('li');
      liGenre.classList.add('genre');
      liGenre.textContent = genre;
      ulListGenre.append(liGenre);
    });

    const btnShowComment = document.createElement('button');
    btnShowComment.classList.add('btn-show-comment');
    btnShowComment.textContent = 'Comments';

    /* Event Listner */
    btnShowComment.addEventListener('click', () => {
      const popup = new PopupMovies();
      popup.showPopup(movie);
      popup.displayAllComment();
      popup.getComment();
    });
    /* List of append */
    divLikes.append(iconLike, pLike);
    content.append(h3, divLikes);
    wrapper.append(img, date, content, ulListGenre);
    liMovies.append(wrapper, btnShowComment);

    const ulListMovies = document.getElementById('list-movies');
    ulListMovies.append(liMovies);

    iconLike.addEventListener('click', (event) => {
      const icons = event.currentTarget;
      const isLiked = (icons.classList.contains('fa-solid'));
      if (isLiked) {
        return;
      }

      const { id } = liMovies;
      let likes = 0;
      let likeIndex = -1;
      // find the corrent number of like
      this.listLikedMovies.filter((item, index) => {
        if (item.item_id === id) {
          likes = item.likes;
          likeIndex = index;
        }
        return item;
      });

      // add a like and display
      likes += 1;

      icons.classList.remove('fa-regular', 'fa-heart');
      icons.classList.add('fa-solid', 'fa-heart');
      icons.nextSibling.textContent = `${likes}`;

      // save like on the list
      if (likeIndex === -1) {
        this.listLikedMovies.push({ item_id: id, likes });
      } else {
        this.listLikedMovies[likeIndex].likes = likes;
      }
      // save like on the API
      this.saveLike(id, likes);
    });

    // find the corrent number of like
    this.listLikedMovies.filter((item) => {
      if (item.item_id === liMovies.id) {
        pLike.textContent = `${item.likes}`;
      }
      return item;
    });

    // Update the count
    document.getElementById('count-movies').textContent = document.querySelectorAll('.movie').length;
  }

  /* Get list of movies with a GET request to the API:  */
  getListMovies = async () => {
    // API Request
    const data = await fetch(`${this.urlApi}?page=${this.currentPage}`);
    await data.json().then((data) => {
      this.list = data;
      this.list.forEach((movie) => {
        if (movie !== undefined) {
          this.addMovie(movie);
        }
      });
    });
  }

  getListLikes = async () => {
    const data = await fetch(`${this.urlInvolvementAPI}/apps/${this.appID}/likes/`);
    await data.json().then((listLikedMovies) => {
      this.listLikedMovies = listLikedMovies;
    });
  }

  saveLike = async (id, like) => {
    const liked = { item_id: id, likes: like };
    const result = await fetch(`${this.urlInvolvementAPI}/apps/${this.appID}/likes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(liked),
    });
    return result.ok;
  }

  /* involvement API: create a new APP */
  createApp = async () => {
    const data = await fetch(`${this.urlInvolvementAPI}/apps/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    return data;
  }
}

module.exports = ListMovies;