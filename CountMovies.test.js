const countMovies = require('./src/modules/CountMovies')
const ListMovies = require('./src/modules/ListMovies')

document.body.innerHTML = `
  <li>Spaceships(<span id="count-movies">6</span>)</li>
  <ul id="list-movies" class="flex-center list-movies"></ul>
`

const listMovies = new ListMovies();
const movie = {"id":1,"url":"https://www.tvmaze.com/shows/1/under-the-dome","name":"Under the Dome","type":"Scripted","language":"English","genres":["Drama","Science-Fiction","Thriller"],"status":"Ended","runtime":60,"averageRuntime":60,"premiered":"2013-06-24","ended":"2015-09-10","officialSite":"http://www.cbs.com/shows/under-the-dome/","schedule":{"time":"22:00","days":["Thursday"]},"rating":{"average":6.5},"weight":98,"network":{"id":2,"name":"CBS","country":{"name":"United States","code":"US","timezone":"America/New_York"},"officialSite":"https://www.cbs.com/"},"webChannel":null,"dvdCountry":null,"externals":{"tvrage":25988,"thetvdb":264492,"imdb":"tt1553656"},"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"},"summary":"<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>","updated":1631010933,"_links":{"self":{"href":"https://api.tvmaze.com/shows/1"},"previousepisode":{"href":"https://api.tvmaze.com/episodes/185054"}}}
describe('Count Basic Test ', () => {
  test('Add single movie', () => {
    movie.id = 1
    listMovies.addMovie(movie)
    expect(countMovies()).toEqual(1);
    const txtCount = document.getElementById('count-movies').textContent
    expect(txtCount).toBe("1")
  });
  
  test('Add multiple movie', () => {
    movie.id = 2
    listMovies.addMovie(movie)
    movie.id = 3
    listMovies.addMovie(movie)
    movie.id = 4
    listMovies.addMovie(movie)
    expect(countMovies()).toEqual(4);
    const txtCount = document.getElementById('count-movies').textContent
    expect(txtCount).toBe("4")
  });
  
  test('Add movie to list but not the DOM', () => {
    movie.id = -100
    listMovies.list.push(movie)
    movie.id = -101
    listMovies.list.push(movie)
    movie.id = -102
    listMovies.list.push(movie)
    /* Value should change with a direct push */
    expect(countMovies()).toEqual(4);
    /* the screen should not update */
    const txtCount = document.getElementById('count-movies').textContent
    expect(txtCount).toBe("4")
  });
  
  test('Add DOM but not to list', () => {
    movie.id = 101
    listMovies.display(movie)
    movie.id = 102
    listMovies.display(movie)
    movie.id = 103
    listMovies.display(movie)
    /* Value should be updated even if add only on the DOM */
    expect(countMovies()).toEqual(7);
    const txtCount = document.getElementById('count-movies').textContent
    expect(txtCount).toBe("7")
  });
  test('Update the DOM element staticaly', () => {
    document.getElementById('list-movies').innerHTML += `<li class="flex-center movie" id="movie-250"><div><img src="https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg" alt="Movies Kirby Buckets image"><div class="flex-center movie-content"><h3>Kirby Buckets</h3><div class="flex-center likes"><i class="fa-regular fa-heart"></i><p>3 like</p></div></div></div><button class="btn-show-comment">Comments</button></li>`
    document.getElementById('list-movies').innerHTML += `<li class="flex-center movie" id="movie-251"><div><img src="https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg" alt="Movies Kirby Buckets image"><div class="flex-center movie-content"><h3>Kirby Buckets</h3><div class="flex-center likes"><i class="fa-regular fa-heart"></i><p>3 like</p></div></div></div><button class="btn-show-comment">Comments</button></li>`
    /* Value should be updated even if add only on the DOM */
    expect(countMovies()).toEqual(9);
  });
  test('Clean the DOM element', () => {
    document.getElementById('list-movies').innerHTML = ``
    expect(countMovies()).toEqual(0);
  });
});