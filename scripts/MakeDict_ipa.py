import requests
import bs4
import re
import string

### A~Zのテーブル
table = string.ascii_uppercase

### IPA:ウイルス用語辞典 辞書作成
def words_virus(dict_en, dict_jp):
    url = 'https://www.ipa.go.jp/security/virus/beginner/dic/dic_sub.html'
    print("access to: " + url)
    res = requests.get(url)
    print("Status Code:" + str(res.status_code))

    soup = bs4.BeautifulSoup(res.content, "html.parser")
    words = soup.select('.unit')
    for word in words:
        title = word.find_all('h4')
        contents = word.find_all('p')
        links = word.find_all('a')
        for n in range(0, len(title)):
            ### 用語へのリンク
            link = url + "#" + links[n]['id']
            ### 説明文の抽出
            content = contents[n].text.replace("\n","").replace("\r","").replace(" ","").encode("cp932","ignore").decode("cp932")

            ### 日本語(用語)取り出し
            title_jp = re.sub("（.*?）|\(.*?\)|\(.*?）|（.*?\)", "", title[n].text).strip()
            ### 日本語(用語)を辞書に書き出し
            dict_jp.write(title_jp + "\t" + content + "(" + link + ")\n")
            

            ### 英語(用語)取り出し
            title_en = re.search("(?<=（).*?(?=）)|(?<=\().*?(?=\))|(?<=（).*?(?=\))|(?<=\().*?(?=）)", title[n].text).group().translate(str.maketrans({chr(0xFF01 + i): chr(0x21 + i) for i in range(94)})).encode("cp932","ignore").decode("cp932").replace("\uff0d","-").strip()
            ### 英語(用語)を辞書に書き出し
            dict_en.write(title_en + "\t" + content + "(" + link + ")\n")
            


### IPA:ネットワークセキュリティ関連用語集 辞書作成
def words_network(dict_en, dict_jp):
    ### IPA:ネットワークセキュリティ関連用語集
    url = 'https://www.ipa.go.jp/security/ciadr/crword.html'
    print("access to: " + url)
    res = requests.get(url)
    print("Status Code:" + str(res.status_code))
    
    soup = bs4.BeautifulSoup(res.content, "html.parser")
    words = soup.select('.unit')
    index = -1
    for word in words:
        title = word.find_all('h4')
        ### 用語がない項目はスキップ
        if len(title) == 0:
            continue
        else:
            index += 1
        contents = word.find_all('p')
        ### 用語へのリンク
        link = url + "#" + table[index] 
        for n in range(0, len(title)):
            ### 説明文の抽出
            content = contents[n].text.replace("\n","").replace("\r","").replace(" ","").encode("cp932","ignore").decode("cp932")

            ### 英語(用語)取り出し
            title_en = re.sub("（.*?）|\(.*?\)|\(.*?）|（.*?\)|／.*$", "", title[n].text).strip()
            ### 英語(用語)を辞書に書き出し
            dict_en.write(title_en + "\t" + content + "(" + link + ")\n")

            ### 日本語(用語)取り出し
            title_jp = re.search("(?<=（).*?(?=）)|(?<=\().*?(?=\))|(?<=（).*?(?=\))|(?<=\().*?(?=）)", title[n].text)

            ### 日本語の用語がない項目はスキップ
            if title_jp != None:
                title_jp = title_jp.group().strip()
                title_jp = title_jp.translate(str.maketrans({chr(0x0021 + i): chr(0xFF01 + i) for i in range(94)})).encode("cp932","ignore").decode("cp932").replace("\uff0d","-")
                ### 日本語(用語)を辞書に書き出し
                dict_jp.write(title_jp + "\t" + content + "(" + link + ")\n")
            

def main():
    print('Dictionary IPA')
    ### 辞書の書き込み
    dict_en = open("ipa_EN.txt","w", encoding='shift-jis')
    dict_jp = open("ipa_JP.txt","w", encoding='shift-jis')
    
    ### IPA:ウイルス用語辞典 辞書作成
    words_virus(dict_en, dict_jp)
    ### IPA:ネットワークセキュリティ関連用語集 辞書作成
    words_network(dict_en, dict_jp)
    
    dict_en.close()
    dict_jp.close()
    print("End!")


if __name__ == '__main__':
    main()
