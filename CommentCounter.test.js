const countComments = require('./src/modules/CommentCounter.js');

document.body.innerHTML = '<div class="comment-modal flex-center"></div>';
const comment = '<div class="comment-container flex-center"><p class="date"><span>2023-01-04</span><span>Donald: </span><span>Nice movie </span></p></div>';
const listcomments = document.querySelector('.comment-modal');

describe('Count Basic Test ', () => {
  test('Add a comment', () => {
    listcomments.innerHTML += comment;
    expect(countComments()).toEqual(1);
  });
  test('add multiple comments', () => {
    listcomments.innerHTML += comment;
    listcomments.innerHTML += comment;
    expect(countComments()).toEqual(3);
  });
  test('clean the DOM element', () => {
    listcomments.innerHTML = '';
    expect(countComments()).toEqual(0);
  });
});
