import csv, json, glob


def dump_dict(files, output):
    platinum_dict = {}
    for f in files:        
        with open(f, encoding='shift-jis', mode='r') as rf:
            for item in csv.reader(rf, delimiter='\t'):
                if len(item) <= 1:
                    continue
                
                ### TSVファイル：1列目(用語)をkey, 2列目以降(説明,URL)をvalに指定
                if len(item) > 2:
                    key = item[0]
                    val = item[1] + '\n' + item[2]
                else:
                    key = item[0]
                    val = item[1]
                platinum_dict[key] = val
        

    with open(output, mode='w') as wf:
        json.dump(platinum_dict, wf, indent=4, sort_keys=True, ensure_ascii=False)


def main():
    ### 日本語のファイルを作成
    files = glob.glob('./*_JP.txt')
    output = "../static/data/sec_dict_jp.json"
    dump_dict(files, output)
    print("File outputs '../static/data/sec_dict_jp.json'")

    ### 英語のファイルを作成
    files = glob.glob('./*_EN.txt')
    output = "../static/data/sec_dict_en.json"
    dump_dict(files, output)
    print("File outputs '../static/data/sec_dict_en.json'")

    print("End")


if __name__ == '__main__':
    main()