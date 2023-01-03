const showPopup = (movie) => {
  const projectModal = document.querySelector('.popup');
  projectModal.style.display = 'block';
  const modalVisible = `
              <div class="popup-modal">
              <div class=" flex-center image-close">
                  <div class="modal-image">
                      <img src="../img/logo-social.png" alt="">
                      <h3 class="flex-center movie-title">${movie.name}</h3>
                  </div>
                  <i class="fas fa-times-circle"></i>
              </div>
              <div class="flex-center description">
                  movie for kids and adults
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
  projectModal.innerHTML = modalVisible;
};

export default showPopup;