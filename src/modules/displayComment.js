import getComment from './getComments.js';

const postComment = () => {
  const GetData = document.querySelector('.commnet-btn');
  const Display = document.querySelector('.comment-modal');
  GetData.addEventListener('click', async () => {
    const commentUpdate = await getComment();
    Display.innerHTML = '';
    commentUpdate.forEach((comment) => {
      Display.innerHTML += `
    <div class="comment-container flex-center">
    <p class="date"><span>${comment.creation_date} </span><span>${comment.username}: </span><span> ${comment.comment} </span></p>
</div>
      `;
    });
  });
};

export default postComment;