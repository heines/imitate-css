export default function() {
  const nav = document.querySelector('.js-nav');
  const navList = nav.classList;
  if(navList.contains('is-open')) {
    navList.replace('is-open', 'is-close');
  } else {
    navList.add('is-open');
  }
}
