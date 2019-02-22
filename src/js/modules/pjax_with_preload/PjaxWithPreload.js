/**
* Pjax
*
* Copyright (c) 2018 Yoichi Kobayashi
* Released under the MIT license
* http://opensource.org/licenses/mit-license.php
*/

import axios from 'axios';
import sleep from 'js-util/sleep';
import ConsoleSignature from '../common/ConsoleSignature';
import page from './page';
import getPage from './getPage';

const consoleSignature = new ConsoleSignature('page transition in this website with original pjax module', 'https://github.com/ykob/pjax', '#497');

const CLASSNAME_LINK = 'js-pjax-link';
const CLASSNAME_LINK_MOMENT = 'js-pjax-link-moment';
const CLASSNAME_PAGE = 'js-pjax-page';
const CLASSNAME_CONTENTS = 'js-pjax-contents';

export default class PjaxWithPreload {
  constructor() {
    this.modules = null;
    this.elm = {
      page: document.querySelector(`.${CLASSNAME_PAGE}`),
      contents: document.querySelector(`.${CLASSNAME_CONTENTS}`),
      overlay: document.querySelector('.js-pjax-overlay'),
      progress: document.querySelector('.js-pjax-progress'),
    };
    this.href = location.pathname + location.search;
    this.currentPage = null;
    this.isAnimate = false;
    this.isPageLoaded = false;
  }
  async onLoad() {
    // ページが最初に読み込まれた際の処理
    this.elm.progress.classList.add('is-shown');

    // ページ切替時の処理諸々
    await sleep(500);
    this.switchPage();

    // ページごとの、遷移演出終了前に実行する初期化処理
    page.common.initBeforeTransit(document, this.modules, this.isPageLoaded);
    await this.currentPage.initBeforeTransit(this.elm.contents, this.modules);

    // Pjaxの初期ロード処理を行ったのちにScroll Managerを開始
    await this.modules.scrollManager.start();

    // 初期ロード後の非同期遷移のイベント設定
    this.onPjaxLinks(document);

    // 遷移演出の終了
    this.transitEnd();

    // ロード完了のフラグを立てる
    this.isPageLoaded = true;

    // set events.
    this.on();

    return;
  }
  switchPage() {
    // ページ固有の関数オブジェクトを選択
    this.currentPage = getPage(this.elm.page.dataset.pageId, page);
  }
  send() {
    // turn off each individual events.
    this.modules.renderer.off();
    this.modules.scrollManager.off();

    // run axios.
    axios.get(this.href)
      .then((response) => {
        // succeed to post.
        this.replaceContent(response);
      })
      .catch((error) => {
        // failed to post.
        console.error(`A post by axios had an error : ${error.response.status} ${error.response.statusText}`);
        if (error.response.status === 404) this.replaceContent();
      });
  }
  async replaceContent(response) {
    // 前ページの変数を空にするclear関数を実行
    this.currentPage.clear(this.modules);

    // 次のページを取得
    const responseHtml = document.createElement('div');
    responseHtml.innerHTML = response.data;
    const responsePage = responseHtml.querySelector(`.${CLASSNAME_PAGE}`);
    const responseContents = responseHtml.querySelector(`.${CLASSNAME_CONTENTS}`);

    // ページの中身を差し替え
    this.elm.page.dataset.pageId = responsePage.dataset.pageId;
    this.elm.contents.innerHTML = responseContents.innerHTML;
    document.title = responseHtml.querySelector('title').innerHTML;

    // Google Analytics の集計処理。
    if (window.ga) ga('send', 'pageview', window.location.pathname.replace(/^\/?/, '/') + window.location.search);

    // ページのトップに戻る
    window.scrollTo(0, 0);

    // Some processing when switch pages.
    this.switchPage();

    // ページごとの、遷移演出終了前に実行する初期化処理
    page.common.initBeforeTransit(this.elm.contents, this.modules, this.isPageLoaded);
    await this.currentPage.initBeforeTransit(this.elm.contents, this.modules);

    // 差し替えたページの本文に対しての非同期遷移のイベント設定
    this.onPjaxLinks(this.elm.contents);

    // Initialize Scroll Manager.
    await this.modules.scrollManager.start();

    // 遷移演出の終了
    this.transitEnd();
  }
  transitStart(withAnime) {
    // ページ切り替え前の演出
    if (this.isAnimate) return;
    this.isAnimate = true;
    this.modules.scrollManager.isWorkingScroll = false;
    this.elm.overlay.classList.remove('is-shrink');

    // オーバーレイのアニメを省略するか否かの判定
    if (withAnime) {
      this.elm.overlay.classList.add('is-expand');
      this.elm.progress.classList.add('is-shown');
    } else {
      this.elm.overlay.classList.add('is-expand-moment');
      this.elm.progress.classList.add('is-shown-moment');
      this.href = location.pathname + location.search;
      this.send();
    }
  }
  async transitEnd() {
    // ページ切り替え後の演出
    await sleep(100);
    this.elm.overlay.classList.remove('is-expand');
    this.elm.overlay.classList.remove('is-expand-moment');
    this.elm.overlay.classList.add('is-shrink');
    this.elm.progress.classList.add('is-hidden');
  }
  on() {
    // On several events.

    // About History API.
    window.addEventListener('popstate', (event) => {
      event.preventDefault();
      history.scrollRestoration = 'manual';
      this.transitStart(true);
    });

    // 遷移演出の途中または終了時の処理
    this.elm.overlay.addEventListener('transitionend', () => {
      if (this.elm.overlay.classList.contains('is-expand')) {
        // オーバーレイが展開したあとの処理
        this.href = location.pathname + location.search;
        this.send();
      } else {
        // オーバーレイが収縮したあとの処理
        this.isAnimate = false;
        this.modules.scrollManager.isWorkingScroll = true;
        this.elm.progress.classList.remove('is-shown');
        this.elm.progress.classList.remove('is-shown-moment');
        this.elm.progress.classList.remove('is-hidden');

        // history.back連打によって、読み込まれた本文とその瞬間に表示されているURIが異なる場合、自動的に再度読み込みを行う。
        if (this.href !== location.pathname + location.search) {
          this.transitStart(true);
          return;
        }

        // ページごとの、遷移演出終了後に実行する初期化処理
        page.common.initAfterTransit(this.elm.contents, this.modules);
        this.currentPage.initAfterTransit(this.elm.contents, this.modules);
      }
    });
  }
  transit(href, withAnime) {
    if (href == location.pathname + location.search) {
      return;
    }
    history.pushState(null, null, href);
    this.transitStart(withAnime);
  };
  onPjaxLinks(content) {
    const self = this;

    // 非同期遷移のイベント設定は頻発するため、処理を独立させた。
    const elms = content.getElementsByTagName('a');

    // 事前に取得したアンカーリンク要素が非同期遷移の対象かどうかを判定し、イベントを付与する
    for (var i = 0; i < elms.length; i++) {
      const elm = elms[i];
      const href = elm.getAttribute('href');
      const target = elm.getAttribute('target');
      if (
        elm.classList.contains(CLASSNAME_LINK) // It has the class name to set Pjax transition.
        || (
          target !== '_blank' // It doesn't have "_blank" value in target attribute.
          && href.indexOf('#') !== 0 // It doesn't link to an anchor on the same page.
          && !(href.indexOf('http') > -1 && href.match(location.host) === null) // It doesn't have this website's hostname in the href attribute value.
        )
      ) {
        elm.addEventListener('click', function(event) {
          event.preventDefault();
          self.transit(this.getAttribute('href'), true);
        });
      }
      if (elm.classList.contains(CLASSNAME_LINK_MOMENT)) {
        elm.addEventListener('click', function(event) {
          event.preventDefault();
          self.transit(this.getAttribute('href'));
        });
      }
    }
  }
}
