
import requests
import bs4
import datetime
import time
import string

#https://www.trendmicro.com/vinfo/jp/security/definition/a a~z
url_org = "https://dictionary.goo.ne.jp"

dict_en = open("goo_EN.txt","w", encoding='shift-jis')
dict_jp = open("goo_JP.txt","w", encoding='shift-jis')

#a~zのテーブル
table = string.ascii_lowercase

#urlを作って取得
print("access to: "+ url_org + "/infsec/")
res = requests.get(url_org + "/infsec/")
print("Status Code:" + str(res.status_code))

#htmlをパースする
soup = bs4.BeautifulSoup(res.text,"html.parser")

#用語のリストを取り出し
contents = soup.find_all(class_="list-simple-a col2 sp-linkbar cx")
#print("contents: "+str(contents)+"\n")


i = 0
for content in contents:
    #用語のリンク先にアクセス
    links = content.find_all("a")
    for link in links:
        url = url_org + link.get("href")
        res = requests.get(url)
        print("Status Code:" + str(res.status_code))
        soup = bs4.BeautifulSoup(res.text,"html.parser")
        
        #説明文だけ抽出
        print(soup.find("meta", attrs={"name":"personal_snippet"}))
        text = soup.find("meta", attrs={"name":"personal_snippet"}).get("content").encode("cp932","ignore").decode("cp932").replace("①","(1)").replace("②","(2)").replace("③","(3)")

        title = link.get_text()

        if "【" in title:
            title_en = title.split("【")[1].replace("】","")
            title = title.split("【")[0]
            dict_en.write(title_en.encode("cp932","ignore").decode("cp932") + "\t" + text + "\t" + url + "\n")
                                     

        if "（" in title:
            title_acro = title.split("（")[1].replace("）","")
            title = title.split("（")[0]
            if not title_acro.isascii():
                title_acro = title_acro.translate(str.maketrans({chr(0x0021 + i): chr(0xFF01 + i) for i in range(94)}))
            
            dict_jp.write(title_acro.encode("cp932","ignore").decode("cp932") + "\t" + text + "\t" + url + "\n")

        if not title.isascii():
            title = title.translate(str.maketrans({chr(0x0021 + i): chr(0xFF01 + i) for i in range(94)}))
        dict_jp.write(title.encode("cp932","ignore").decode("cp932") + "\t" + text + "\t" + url + "\n")
                
dict_en.close()
dict_jp.close()
print("End!")
