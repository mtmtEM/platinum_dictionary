
import requests
import bs4
import datetime
import time
import string

#https://www.trendmicro.com/vinfo/jp/security/definition/a a~z
url_org = "https://www.trendmicro.com/vinfo/jp/security/definition/"

dict_en = open("trendmicro_EN.txt","w", encoding='shift-jis')
dict_jp = open("trendmicro_JP.txt","w", encoding='shift-jis')

#a~zのテーブル
table = string.ascii_lowercase

for ch in table:
    #urlを作って取得
    url = url_org + ch
    print("access to: "+url)
    res = requests.get(url)
    print("Status Code:" + str(res.status_code))

    #htmlをパースする
    soup = bs4.BeautifulSoup(res.text,"html.parser")

    #用語のリストを取り出し
    contents = soup.find_all(class_="enclose")
    print("contents: "+str(contents)+"\n")

    
    i = 0
    for content in contents:
        #用語のリンク先にアクセス
        url = url_org + content.find(class_="titlelist").find("a").get("href")
        res = requests.get(url)
        print("Status Code:" + str(res.status_code))
        soup = bs4.BeautifulSoup(res.text,"html.parser")
        #説明文だけ抽出
        text = soup.find(class_="bgwhite").get_text().replace("\n","").replace("\r","").replace(" ","").encode("cp932","ignore").decode("cp932")

        print(url)

        #日本語の用語を取り出し、日本語があれば辞書に書き出し
        JPName = content.find(class_="JPNameList").get_text().translate(str.maketrans({chr(0x0021 + i): chr(0xFF01 + i) for i in range(94)})).encode("cp932","ignore").decode("cp932").replace("\uff0d","-")
        if len(JPName) != 0:
            dict_jp.write(JPName + "\t" + text+ "(" + url + ")\n")


        #英語の用語を取り出し、あれば辞書に書き出し
        ENName = content.find(class_="titlelist").find("a").get_text().encode("cp932","ignore").decode("cp932")
        if len(ENName) != 0:
            dict_en.write(ENName + "\t" + text+ "(" + url + ")\n")
        i+=1

dict_en.close()
dict_jp.close()
print("End!")
