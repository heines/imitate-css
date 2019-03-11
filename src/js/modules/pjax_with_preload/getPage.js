export default function(pageId, page) {
  switch (pageId) {
    case 'index':
      return page.index;
    case 'moves':
      return page.moves;
    case 'page01':
    case 'page02':
    case 'page03':
      return page.lower;
    default:
      return page.blank;
  }
}
