import { currentId } from './popup.js';

const getComment = async () => {
  try {
    const AvatarURL = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/JJFDApwrWpJNeY3nWzvU/comments?item_id=${currentId}`);
    console.log('hello world')
    const response = await AvatarURL.json();
    console.log(response);
    return response;
  } catch (error) {
    if (error.contains('400')) {
      return
    }

    //return error;
  }
};
export default getComment;