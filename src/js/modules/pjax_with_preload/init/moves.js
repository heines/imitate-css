import loadContentImgs from '../../common/loadContentImgs';
import openMovesNav from '../../moves/openMovesNav';

// initBeforeTransit method: before scrollManager.resize run.
const initBeforeTransit = async (contents, modules) => {
};

// initAfterTransit method: after scrollManager.resize run.
const initAfterTransit = (contents, modules) => {
  const navButton = contents.querySelector(".js-nav-button");
  navButton.addEventListener("click", openMovesNav, false);
};

// clear any variables.
const clear = (modules) => {
};

export {
  initBeforeTransit,
  initAfterTransit,
  clear
}
