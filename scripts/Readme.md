# 用語収集scriptの使用方法

## 動作環境
- python 3.6.4 (3.x以上 推奨)
- pip3

## インストール
- `$ cd platinum-dictionary/scripts/`
- `$ pip3 install -r requirements.txt`

## スクリプトの説明

### MakeDict_{site}.py
- `{site}` セキュリティ辞書を作成するにあたり参照にしたサイト
  - 各サイトのセキュリティ用語を取得, shift-jis 形式で保存
  - 日本語の用語は `{site}_JP.txt` , 英語の用語は `{site}_EN.txt`として記録
  - `MakeDict_nist.py` は参照先のPDFより用語をテキスト(nist.txt)に変換する必要あり
- スクリプト実行例)
  - `$ python3 MakeDict_goo.py`

### DumpDict.py
- `MakeDict_{site}.py` を用いて作成した辞書機能をJson形式で出力
  - 初回起動時, 用語の自動登録を行う際に読み込まれるファイルを作成
  - `platinum-dictionary/static/data/` 以下に出力
- スクリプト実行例)
  - `$ python3 DumpDict.py`

## 拡張機能への用語登録方法
- `platinum-dictionary/Readme.md` を参照

## 辞書用語：参照サイト
- [トレンドマイクロ セキュリティ情報「用語集」](https://www.trendmicro.com/vinfo/jp/security/definition/a)
- [IPA 情報処理推進機構 情報セキュリティ セキュリティ用語集](https://www.ipa.go.jp/security/glossary/glossary.html)
- [NECソリューションイノベータ セキュリティ用語集](https://www.nec-solutioninnovators.co.jp/ss/insider/security-words/)
- [NIST Glossary of Key Information Security Terms](https://nvlpubs.nist.gov/nistpubs/ir/2013/NIST.IR.7298r2.pdf)
- [警察庁 @police 用語集](https://www.npa.go.jp/cyberpolice/words/index.html)
- [デロイトトーマツ サイバーセキュリティ 用語集一覧](https://www2.deloitte.com/jp/ja/pages/technology/articles/cyb/cyber-security-glossary.html)
- [goo 辞書 情報セキュリティ用語辞書](https://dictionary.goo.ne.jp/infsec/)
- [総務省 国民のための情報セキュリティサイト](https://www.soumu.go.jp/main_sosiki/joho_tsusin/security/glossary/01.html)
- [NTT東日本 情報セキュリティ用語集](https://business.ntt-east.co.jp/solution/security/glossary/)
- [日本レジストリサービス(JPRS) 用語辞典](https://jprs.jp/glossary/index.php)