import os
import shutil
from PIL import Image

img_width = 720
root = "../product_images"
out_dir = os.path.join(root, "final")
in_dir = os.path.join(root, "w-1080")
if (os.path.exists(out_dir)):
    shutil.rmtree(out_dir)
os.mkdir(out_dir)
imgs = os.listdir(in_dir)

for img in imgs:
    pi = Image.open(os.path.join(in_dir, img))
    pi = pi.resize((img_width, int(img_width/pi.width*pi.height)))
    pi.save(os.path.join(out_dir, img.lower()))
    print(img)
