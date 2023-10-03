import os
import re
import json

root = "../product_images/w-720"
imgs = os.listdir(root)

# print(re.match(r'\w*\.\d*\.jpg','abc.1.jpg'))
dc = {}
for img in imgs:
    mt = re.match(r'(\w*)\.(\d*)\.jpg',img)
    if mt == None:
        print("Filename not matching pattern: " + img)
    else:
        cd = mt.group(1)
        ix = mt.group(2)
        if cd not in dc:
            dc[cd]=[]
        dc[cd].append(f'/product-img/{img}')

print(len(dc.keys()), " products have images")

with open("codeToURL.json","w+") as file:
    file.write(json.dumps(dc))

