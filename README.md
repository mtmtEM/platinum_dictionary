# platinum-dictionary

## platinum-dictionry とは
- セキュリティの用語を取り扱う辞書

## インストール

### npm バージョン
npm 6+ 推奨(参考元コードに準拠)

```
$ npm -version
6.14.8
```

### build
パッケージのインストールとbuild
```
$ npm install
$ npm run build
```

開発時にはwatchオプションを用いたdebugが推奨,以下はChromeの例
```
$ npm run watch-chrome
```

その他build方法の詳細は参考元コードのgithub(Readme)を参照する

## 分析機能(API機能)を利用する際
- `platinum-dictinary/static/analysis/src/getSecinfoView.js` ファイル中にVirus Totalから取得したAPIキーを登録する
  - 登録箇所は `const api_key = "";` の中とする 

## 本機能について
- 本拡張機能は Mouse Dictioanry (製作者@wtetsu様)を元に作成しております.
  - [Mouse Dictionary](https://chrome.google.com/webstore/detail/mouse-dictionary/dnclbikcihnpjohihfcmmldgkjnebgnj)
  - [Github](https://github.com/wtetsu/mouse-dictionary)

## 利用素材
- [mini.css](https://minicss.org/)
- [FLAT PRELOADERS](https://pixelbuddha.net/animation/flat-preloaders)