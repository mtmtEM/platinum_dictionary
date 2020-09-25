import requests
import bs4
import re
from time import sleep

def is_kana(title):
    ### ひらがな・カタカナ・常用漢字を検出
    re_katakana = re.compile(r'[\u3041-\u309F]+|[\u30A1-\u30F4]+|[亜-熙]')
    ### 英数字・記号の場合は Noneが返却
    if re_katakana.search(title) == None:
        return False
    else:
        return True


def contents_jprs(url):
    ### リクエスト数が多いのでGETに失敗した場合は3秒間休止したのち継続
    try:
        print("access to: " + url)
        res = requests.get(url)
        print("Status Code:" + str(res.status_code))
    except Exception as e:
        print("Error: {}\nStatusCode:{}".format(e, str(res.status_code)))
        sleep(3)
        return None

    soup = bs4.BeautifulSoup(res.content, "html.parser")
    content = soup.select('#glossaryDesc')[0].find('p').text
    return re.sub('\*\s.*\n|\*\s.*', '', content).replace("\n","").replace("\r","").replace(" ","").encode("cp932","ignore").decode("cp932").replace("\uff0d","-").replace("\uff5e","~").replace("\u2460","1.").replace("\u2461","2.").replace("\u2462","3.").replace("\u2463","4.").replace("\u2464","5.")

        
        
def words_jprs(dict_en, dict_jp):
    url = 'https://jprs.jp/glossary/index.php'
    print("access to: " + url)
    res = requests.get(url)
    print("Status Code:" + str(res.status_code))

    soup = bs4.BeautifulSoup(res.content, "html.parser")
    words = soup.select('table')[1].select('td')
    count_request = 0
    for n in range(1, len(words), 2):
        title = re.sub("（.*?）|\(.*?\)|\(.*?）|（.*?\)", "", words[n].text).strip()
        link = words[n].find('a')['href']
        link_id = link.split('?')[-1]
        content = contents_jprs(url+"?"+link_id)
        ### 情報の取得に失敗した場合,継続する
        if content == None:
            continue
        
        ### 用語に日本語(全角)と英数字(半角)が混在していないか判定
        if is_kana(title):
            title_jp = title.translate(str.maketrans({chr(0x0021 + i): chr(0xFF01 + i) for i in range(94)})).encode("cp932","ignore").decode("cp932").replace("\uff0d","-")
            dict_jp.write(title_jp + "\t" + content + "\t" + url + "?" + link_id + "\n")
        else:
            dict_en.write(title + "\t" + content + "\t" + url + "?" + link_id + "\n")


        ### リクエスト数の制御: リクエスト数が多いので30以上リクエストを投げた後は8秒間休止
        if count_request > 30:
            sleep(8)
            count_request = 0
        else:
            count_request += 1



def main():
    print('Dictionary JPRS')
    ### 辞書の書き込み
    dict_en = open("jprs_EN.txt","w", encoding='shift-jis')
    dict_jp = open("jprs_JP.txt","w", encoding='shift-jis')
    
    ### JPRS用語辞典
    words_jprs(dict_en, dict_jp)
    
    dict_en.close()
    dict_jp.close()
    print("End!")


if __name__ == '__main__':
    main()