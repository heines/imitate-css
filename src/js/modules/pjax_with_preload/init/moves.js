import loadContentImgs from '../../common/loadContentImgs';
import openMovesNav from '../../moves/openMovesNav';
import closeMovesNav from '../../moves/closeMovesNav';

// initBeforeTransit method: before scrollManager.resize run.
const initBeforeTransit = async (contents, modules) => {
};

// initAfterTransit method: after scrollManager.resize run.
const initAfterTransit = (contents, modules) => {
  const navButtonOpen = contents.querySelector(".js-nav-button-open");
  navButtonOpen.addEventListener("click", openMovesNav, false);
  const navButtonClose = contents.querySelector(".js-nav-button-close");
  navButtonClose.addEventListener("click", closeMovesNav, false);
};

// clear any variables.
const clear = (modules) => {
};

export {
  initBeforeTransit,
  initAfterTransit,
  clear
}
