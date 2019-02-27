import loadContentImgs from '../../common/loadContentImgs';

// initBeforeTransit method: before scrollManager.resize run.
const initBeforeTransit = async (contents, modules) => {
};

// initAfterTransit method: after scrollManager.resize run.
const initAfterTransit = (contents, modules) => {
  const arrives = contents.querySelector('.js-open');
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
