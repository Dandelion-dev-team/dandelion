from PIL import Image
import os
from instance.config import ALLOWED_EXTENSIONS


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def change_image_type(image_type):  # <--- Changes the image type into the .png standard format

    image = Image.open('demo_image.jpg')
    image.save('new_image.png')


def create_image_set(image_dir,
                     image_name):  # <--- Creates the two different versions of the image (Full_Size, thumbnail)

    thumb = 30, 30
    full_size = 1080, 1080

    image = Image.open(os.path.join(image_dir, image_name))

    image_ext = image_name.split(".")[-1]
    image_name = image_name.split(".")[0]

    ### FULL_SIZE ###
    full_size_image = image.copy()
    full_size_image.thumbnail(full_size, Image.LANCZOS)
    full_size_image.save(f"{os.path.join(image_dir, image_name)}-fullsize.{image_ext}", optimize=True, quality=95)

    ### THUMBNAIL ###
    thumbnail_image = image.copy()
    thumbnail_image.thumbnail(thumb, Image.LANCZOS)
    thumbnail_image.save(f"{os.path.join(image_dir, image_name)}-thumbnail.{image_ext}", optimize=True, quality=95)

# def allowed_file(filename):
#     return '.' in filename and \
#            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
