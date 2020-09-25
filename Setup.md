# Platinum Dictionary セットアップ方法

## 環境 (動作確認済み)
- Chrome 85.0.4183.121
- Firefox 81.0
- node 6.14.8 (6+ 推奨)

## セットアップ方法

### 事前準備
1. Node.js をインストール
2. https://github.com/mtmtEM/platinum_dictionary からソースコードをダウンロード
3. ダウンロードしたファイルを展開し,`platinum_dictionary/`に移動
4. `$ npm install` コマンドを実行
5. `$ npm run build` コマンドを実行

### Chrome
1. ChromeブラウザのURLに `chrome://extensions/` を入力しアクセス
2. 画面右上の「デベロッパーモード」を有効にする
3. 画面左上の「パッケージ化されていない拡張機能を読み込む」を選択
4. `platinum_dictionary//dist-chrome` を選択
5. ブラウザ右上(URLの右)の拡張機能アイコンからPlatinum Dictionary縦の3点リーダーよりオプション項目を選択
6. 辞書データの自動登録ポップアップでOKを選択

### Firefox (一時的なアドオンの追加)
1. FirefoxブラウザのURLに `about:debugging` を入力しアクセス
2. 左側タブの「このFirefox」をクリックし「一時的なアドオンを読み込む」をクリック
3. `platinum_dictionary//dist-firefox/main.js` を選択
4. ブラウザ右上(URLの右)のPlatinum Dictionaryアイコンを右クリックし「拡張機能を管理」を選択
5. Platinum Dictionary のオプション(横の3点リーダー)から設定をクリック
6. 辞書データの自動登録ポップアップでOKを選択

※Firefoxの上記手順は一時的なアドオン追加のためブラウザを再起動すると再度設定しなければならない
永続的なインストール手順は"MDN web docs パッケージ化とインストール"ページを参照
https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/Packaging_and_installation

## 使用方法

### 辞書機能
- 拡張機能を起動後,Webサイト中の文字列をマウスオーバーまたは範囲選択を行うと登録されている用語を検索

### 用語の登録
- ブラウザ右上の拡張機能アイコンからオプション項目を選択
- オプション画面にて作成した辞書データを選択
  - 辞書データの文字コード(Shift-JIS, UTF-8, UTF-16)を選択
  - 辞書データのファイル形式(TSV,JSON等)を選択
  - 作成した対象ファイルを指定し, LOADを選択
- 辞書ファイル形式のサンプルは `platinum_dictionary//scripts/` にテキストファイルがあるのでそちらを参照

### 検索機能
- 拡張機能を起動後,Webサイト中の以下の特定の文字列を範囲選択を行うとパネル上にボタンが出現する
  - ハッシュ値： MD5, SHA1, SHA256
  - ドメイン名
  - IPアドレス
- パネル上の各種検索サービスのボタンを押すことで検索を実施
  - VT (Virus Total)
  - HA (Hybrid Analysis)
  - FeodoTracker
  - abuse.ch
  - urlhaus
- マウスオーバー時にもパネル上にボタンは出現するが,精度が低いため範囲選択での操作を推奨


### 分析機能
- IPアドレス,ハッシュ値などを範囲選択した後,拡張機能アイコンまたは右クリックから「VTの分析結果を見る」を実施
  - 機能の利用にあたりAPIキーの登録が必要
  - `platinum-dictinary/static/analysis/src/getSecinfoView.js` ファイル中にVirus Totalから取得したAPIキーを登録する
  - 登録箇所は `const api_key = "";` の中とする 
- 複数サイトの分析結果を比較する機能は今後の実装課題とする

