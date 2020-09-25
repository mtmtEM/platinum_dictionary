import requests
import bs4
import re
import string
import time

def is_kana(title):
    title_en = re.sub("（.*?）|\(.*?\)", "", title)
    ### ひらがな・カタカナ・常用漢字を検出
    re_katakana = re.compile(r'[\u3041-\u309F]+|[\u30A1-\u30F4]+|[亜-熙]')
    ### 英数字・記号の場合は Noneが返却
    if re_katakana.search(title_en) == None:
        return title_en
    else:
        return title_en.translate(str.maketrans({chr(0x0021 + i): chr(0xFF01 + i) for i in range(94)})).encode("cp932","ignore").decode("cp932").replace("\uff0d","-")


def words_jp(dict_en, dict_jp, url):
    print("access to: "+url)
    res = requests.get(url)
    print("Status Code:" + str(res.status_code))
    
    soup = bs4.BeautifulSoup(res.content, "lxml")
    words = soup.select('.list-normal-01')
    links = soup.select('.hdg-lv2-01')
    for n in range(0, len(words)):
        link = url + "#" + links[n].find("a")['id']
        dt = words[n].find_all("dt")
        dd = words[n].find_all("dd")
        if len(dt) == len(dd):
            for l in range(0, len(dt)):
                ### 日本語(用語)取り出し
                title_jp = re.sub("（.*?）|\(.*?\)", "", dt[l].text).translate(str.maketrans({chr(0x0021 + i): chr(0xFF01 + i) for i in range(94)})).encode("cp932","ignore").decode("cp932").replace("\uff0d","-").replace("\uff5e","~")
                content = dd[l].text.replace("\n","").replace("\r","").replace(" ","").encode("cp932","ignore").decode("cp932").replace("\uff0d","-").replace("\uff5e","~")
                ### 日本語(用語)を辞書に書き出し
                dict_jp.write(title_jp + "\t" + content + "\t" + link + "\n")
        else:
            print(len(words), len(dt), len(dd), l)
            print(link)
            print(dt)
            print(dd)
            time.sleep(2)



def words_en(dict_en, dict_jp, url):
    print("access to: "+url)
    res = requests.get(url)
    print("Status Code:" + str(res.status_code))
    
    soup = bs4.BeautifulSoup(res.content, "html.parser")
    words = soup.select('.list-normal-01')
    links = soup.select('.hdg-lv2-01')
    for n in range(0, len(words)):
        link = url + "#" + links[n].find("a")['id']
        dt = words[n].find_all("dt")
        dd = words[n].find_all("dd")
        for l in range(0, len(dt)):
            ### 英語(用語)取り出し
            title_en = is_kana(dt[l].text)
            content = dd[l].text.replace("\n","").replace("\r","").replace(" ","").encode("cp932","ignore").decode("cp932").replace("\uff0d","-").replace("\uff5e","~")
            ### 英語(用語)を辞書に書き出し            
            dict_en.write(title_en + "\t" + content + "\t" + link + "\n")


def main():
    print('Dictionary Soumu(Ministry of Internal Affairs and Communications)')
    
    ### 辞書の書き込み
    dict_en = open("soumu_EN.txt","w", encoding='shift-jis')
    dict_jp = open("soumu_JP.txt","w", encoding='shift-jis')
    
    ### 総務省 用語辞典 国民のための情報セキュリティサイト JP(01〜10), EN(11)
    url = 'https://www.soumu.go.jp/main_sosiki/joho_tsusin/security/glossary/'

    ### 総務省 用語辞典 国民のための情報セキュリティサイト JP(01〜10)
    for num in range(1, 11):
        words_jp(dict_en, dict_jp, url+str(num).zfill(2)+".html")

    ### 総務省 用語辞典 国民のための情報セキュリティサイト EN(11)
    words_en(dict_en, dict_jp, url+"11.html")
    
    dict_en.close()
    dict_jp.close()
    print("End!")


if __name__ == '__main__':
    main()