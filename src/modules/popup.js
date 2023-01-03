const showPopup = (movie) => {
  const projectModal = document.querySelector('.popup');
  const body = document.querySelector('body');
  projectModal.style.display = 'block';
  const modalVisible = `
              <div class="popup-modal">
              <div class="image-close flex-center">
                  <div class="modal-image">
                      <img src="${movie.image.medium}" alt="">
                      <h3 class="flex-center movie-title">${movie.name}</h3>
                  </div>
                  <div class="close"> <i class="fa-solid fa-xmark"></i></div>
              </div>
              <div class="flex-center description">
              <div class="start-end">
              <p> Premiered: <span>${movie.premiered}</span></p>
              <p>Ended: <span>${movie.ended}</span></p>
             </div>
             <div class="movie-for">
              <p>Genres: <span>${movie.genres}</span></p>
              <p>language: <span>${movie.language}</span></p>
             </div>
              </div>
              <h4 class="flex-center"> comments(<span>2</span>)</h4>
              <div class="flex-center comment-modal">
                  <div class="comment-container flex-center">
                      <p class="date">03/11/2021</p>
                      <p class="commentor">Alex: </p>
                      <p class="comment">nice movie</p>
                  </div>
              </div>
              <div class="flex-center type-comment-modal">
                  <form class="form flex-center">
                      <input type="text" name="name" id="name" placeholder="Your name">
                      <textarea class="textarea" name="commnet" id="comment" cols="30" rows="10"></textarea>
                      <button class="commnet-btn" type="submit">comment</button>
                  </form>
  
              </div>
  
          </div>`;
  body.style.position = 'fixed';
  projectModal.innerHTML = modalVisible;

  const closeModal = document.getElementsByClassName('close');
  for (let i = 0; i < closeModal.length; i += 1) {
    closeModal[i].addEventListener('click', () => {
      projectModal.style.display = 'none';
      body.style.position = 'relative';
    });
  }
};

export default showPopup;