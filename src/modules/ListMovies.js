
export default class ListMovies {
  constructor() {
    this.list = []
    this.urlApi = "https://api.tvmaze.com/shows" //+id
    this.currentPage = 1
  }

  /* Display (Load dynnamically) a limited number of movies */
  display = () => {
    this.list.forEach(movie => {
      //dynamic load of list of movies
      const liMovies = document.createElement('li')
      liMovies.classList.add('flex-center', 'movie')
      liMovies.id = `movie-${movie.id}`

      const wrapper = document.createElement('div')
      const img = document.createElement('img')
      img.src = movie.image.medium //`${this.urlApi}${movie.id}/images`
      img.alt = `Movies ${movie.name} image`

      const content = document.createElement('div')
      content.classList.add('flex-center', 'movie-content')
      const h3 = document.createElement('h3')
      h3.textContent = movie.name
      const divLikes = document.createElement('div')
      divLikes.classList.add('flex-center', 'likes')
      const iconLike = document.createElement('i')
      iconLike.classList.add('fa-regular', 'fa-heart')
      const pLike = document.createElement('p')
      pLike.textContent = "3 Like"

      const btnShowComment = document.createElement('button')
      btnShowComment.classList.add('btn-show-comment')
      btnShowComment.textContent = 'Comments'

      /* List of append */
      divLikes.append(iconLike, pLike)
      content.append(h3, divLikes)
      wrapper.append(img, content)
      liMovies.append(wrapper, btnShowComment)

      const ulListMovies = document.getElementById('list-movies')
      ulListMovies.append(liMovies)
    });
  }

  /* Get list of movies with a GET request to the API:  */
  getList = async () => {
    //API Request
    const data = await fetch (`${this.urlApi}?page=${this.currentPage}`)
    await data.json().then((data) => {
      this.list = data
      console.log('list movies getted: ', this.list)
    })
  }
}