class PopupMovies {
  constructor() {
    this.currentMoviesID = undefined;
    this.listComent = [];
    this.API = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SfXJVXbXl4mhQfF5BbuY/comments';
  }

    getComment = async () => {
      try {
        const AvatarURL = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SfXJVXbXl4mhQfF5BbuY/comments?item_id=${this.currentMoviesID}`);
        const response = await AvatarURL.json();
        if (response.error !== undefined || response === undefined) {
          return [];
        }
        return response;
      } catch (error) {
        return [];
      }
    };

    showPopup = async (movie) => {
      this.currentMoviesID = movie.id;
      const projectModal = document.querySelector('.popup');
      const body = document.querySelector('main');
      projectModal.style.display = 'flex';

      let pEnded = `${movie.ended}`;
      if (movie.ended === null) {
        pEnded = 'In progress';
      }

      const modalVisible = `
                  <div class="popup-modal flex-center">
                  <div class="image-close flex-center">
                      <div class="modal-image flex-center">
                          <img src="${movie.image.original}" alt="">
                          <h3 class="movie-title">${movie.name}</h3>
                      </div>
                      <div class="close"> <i class="fa-solid fa-xmark"></i></div>
                  </div>
                  <div class="flex-center description">
                  <div class="start-end">
                  <p> Premiered: <span>${movie.premiered}</span></p>
                  <p id='movie-ended'>Ended: <span>${pEnded}</span></p>
                </div>
                <div class="movie-for">
                  <p>Genres: <span>${movie.genres}</span></p>
                  <p>Language: <span>${movie.language}</span></p>
                </div>
                  </div>
                  <h4 class="flex-center"> Comments(<span class ="count">0</span>)</h4>
                  <div class="flex-center type-comment-modal">
                      <form class="form flex-center">
                          <input type="text" name="name" id="name" placeholder="Your name">
                          <textarea placeholder ="Type comment" class="textarea" name="comment" id="comment" cols="30" rows="10"></textarea>
                          <button class="btn-show-comment commnet-btn">Comment<span> <i class="fa-solid fa-comment"></i></span></button>
                      </form>
      
                  </div>
                  <div class="comment-modal flex-center">
                      <div class="comment-container flex-center">
                          
                      </div>
                  </div>
              </div>`;

      body.style.position = 'fixed';
      projectModal.innerHTML = modalVisible;

      /* event listener */
      /* Add new comments */
      const Submit = document.querySelector('.commnet-btn');
      Submit.addEventListener('click', async (event) => {
        event.preventDefault();
        const userName = document.querySelector('#name');
        const comment = document.querySelector('#comment');
        await this.postComment(movie.id);
        this.displayAllComment();
        userName.value = '';
        comment.value = '';
      });

      const closeModal = document.querySelector('.close');
      closeModal.addEventListener('click', () => {
        projectModal.style.display = 'none';
        body.style.position = 'relative';
      });
    };

    postComment = async (id) => {
      const userName = document.querySelector('#name');
      const comment = document.querySelector('#comment');
      const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/SfXJVXbXl4mhQfF5BbuY/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: id,
          username: userName.value,
          comment: comment.value,
        }),
      });
      return response.ok;
    };

    displayAllComment = async () => {
      const listComments = await this.getComment();
      const Display = document.querySelector('.comment-modal');
      const count = document.querySelector('.count');
      count.textContent = listComments.length;
      Display.innerHTML = '';
      listComments.forEach((comment) => {
        Display.innerHTML += `
        <div class="comment-container flex-center">
        <p class="date"><span><i class="fa-solid fa-user"> </i><span>${comment.username} </span> </span><span>${comment.creation_date} </span></p>
        <p class = "comment"><span> ${comment.comment} </span></p>
        </div>
        `;
      });
    };
}

module.exports = PopupMovies;