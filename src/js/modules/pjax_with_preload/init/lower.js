import loadContentImgs from '../../common/loadContentImgs';

// initBeforeTransit method: before scrollManager.resize run.
const initBeforeTransit = async (contents, modules) => {
};

// initAfterTransit method: after scrollManager.resize run.
const initAfterTransit = (contents, modules) => {
  const title = contents.querySelector('.p-lower-header__title');
  console.log("pass");
  console.log(title);
  const excerpt = contents.querySelector('.p-lower-header__excerpt');
  const arrives = contents.querySelector('.js-open');

  title.classList.add('is-shown');
  excerpt.classList.add('is-shown');
  arrives.classList.add('is-open');
};

// clear any variables.
const clear = (modules) => {
};

export {
  initBeforeTransit,
  initAfterTransit,
  clear
}
