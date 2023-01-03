
export default class ListMovies {
  constructor() {
    this.list = []
    this.urlApi = "https://api.tvmaze.com/shows/" //+id
    this.idLastDisplayed = 0
  }

  /* Display (Load dynnamically) a limited number of movies */
  display = (limit) => {
    
  }

  /* Get list of movies with a GET request to the API:  */
  getList = async () => {
    //API Request
    const data = await fetch ("https://api.tvmaze.com/shows")
    await data.json().then((data) => {
      this.list = data
      console.log('list movies getted: ', this.list)
    })
  }
}