const MathEx = require('js-util/MathEx');
const isIE = require('js-util/isIE');

export default class ParallaxItem {
  constructor(elm, scrollManager, hookes, opt) {
    this.scrollManager = scrollManager;
    this.hookes = hookes;
    this.elm = elm;
    this.height = 0;
    this.top = 0;
    this.rangeX = (opt && opt.rangeX) ? opt.rangeX : 10000;
    this.ratioX = (opt && opt.ratioX) ? opt.ratioX : 0;
    this.unitX = (opt && opt.unitX) ? opt.unitX : 'px';
    this.rangeY = (opt && opt.rangeY) ? opt.rangeY : 10;
    this.ratioY = (opt && opt.ratioY) ? opt.ratioY : 0.012;
    this.unitY = (opt && opt.unitY) ? opt.unitY : '%';
  }
  init(scrollTop, iwWorking) {
    this.elm.style.transform = '';
    if (iwWorking === true)  {
      const rect = this.elm.getBoundingClientRect();
      this.height = rect.height;
      this.top = scrollTop + rect.top;
      this.elm.style.backfaceVisibility = 'hidden';
    }
    this.render();
  }
  render(iwWorking) {
    if (iwWorking === false) return;
    const x = MathEx.clamp(
      this.hookes.velocity[0] * this.ratioX,
      this.rangeX * -1,
      this.rangeX
    );
    const y = MathEx.clamp(
      (this.hookes.velocity[1] - (this.top + this.height * 0.5)) * this.ratioY,
      this.rangeY * -1,
      this.rangeY
    );
    this.elm.style.transform =
      (isIE())
        ? `translate(${x}${this.unitX}, ${y}${this.unitY})`
        : `translate3D(${x}${this.unitX}, ${y}${this.unitY}, 0)`;
  }
}
