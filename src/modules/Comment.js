// eslint-disable-next-line import/no-cycle
import { currentId } from './popup.js';

const sendComment = () => {
  const userName = document.querySelector('#name');
  const comment = document.querySelector('#comment');
  const Submit = document.querySelector('.commnet-btn');

  const postComment = async (id) => {
    const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/JJFDApwrWpJNeY3nWzvU/comments', {
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
  Submit.addEventListener('click', (event) => {
    event.preventDefault();
    postComment(currentId);
    userName.value = '';
    comment.value = '';
  });
};

export default sendComment;