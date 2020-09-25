import re

iFile = open("nist.txt", mode="r", encoding="utf-8")
oFile = open("nist_en.txt", mode="w")

title = ""
desc = ""
srcflag = False

i = 0
for line in iFile:
    if " – " in line:
        if len(title) > 0:
            srcflag = False
            desc = desc.encode("cp932","ignore").decode("cp932") + "\n"
            desc = desc.replace("\t\n","\n").replace("\t\t","\t")
            oFile.write(title + "\t" + desc)
        text = re.split(" – ", line)
        title = text[0].replace("\t","").replace("\n","")
        desc = text[1].replace("\t","").replace("\n","")

    else:
        desc = desc + line.replace("\t","").replace("\n","")

    if i == 10:
        break

iFile.close()
oFile.close()
