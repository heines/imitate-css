# imitate-css
## 2019Mar14th
### 模擬対象Webページ
https://moves.basicagency.com/
### 模擬対象詳細
グローバルメニュー部 登場アニメーション
（ベースとなるWebページの再現、マウスカーソルの変更、マウスストーカーの模擬などは行いません）
### 所感
- （このページに限らず、）easeを使っているサイトが存外に多い
- remを単位としているサイトが多い。（→レスポンシブ対応のため）
- vw/vhを使用している。（→〃）
### 上記の実装に際して気をつけた部分
- 隣接セレクタの使用
- remで大きさを記載する。
- 擬似要素で使用する数字のインクリメントを0からスタートする。
- 行ごとのインタラクション時間などをfor文を使用して記載する。
### 上記の実装に際して気をつけた部分
- 隣接セレクタの使用
- remで大きさを記載する。
- 擬似要素で使用する数字のインクリメントを0からスタートする。
- 行ごとのインタラクション時間などをfor文を使用して記載する。
### 補足
- 使用フォントが有償だったため、Googleフォントにある類似するもので置き換えました。
- 元Webページではhtmlのフォントサイズを10pxとしていますが、現在使用しているリポジトリでは様々なWebページの模擬を想定しているため、htmlのフォントサイズの変更は行いませんでした（= 16px）


## 2019Feb21st（実装中）

site: https://www.agentur-loop.com/cases

hover時動作模倣 / easeOutQuartが使われている。（.4s cubic-bezier(.165,.84,.44,1)）

## 2019Mar**（次回実装予定）

site: https://felixlesouef.com/#/

良。
