from PIL import Image
import os
from flask import jsonify
from instance.config import ALLOWED_EXTENSIONS


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def image_processing(pic, id, filename, folder_location):
    # Saves the original file with original name and filetype in while creating a new unique id directory
    newdir = (os.path.join(folder_location, id))
    if not os.path.exists(newdir):
        os.makedirs(newdir)
    pic.save(os.path.join(newdir, filename))

    # Transforms uploaded image into .png file, name changing into [id].png
    pic = Image.open(pic)
    pic.save(os.path.join(newdir, id + '.png'))

    # Saves the image in predetermined "full size" dimensions (590, 330). Saves it as [id]_full.png in proper directory
    full_size = pic.resize((590, 330))
    full_size.save(os.path.join(newdir, id + '_full.png'))

    # Image cropping and resising into the "full size" dimensions. Alternative to full size. Saving it as [id]_cropped_full.png
    cw, ch = 590, 330
    w, h = pic.size
    box = w // 2 - cw // 2, h // 2 - ch // 2, w // 2 + cw // 2, h // 2 + ch // 2
    cropped_image = pic.crop(box)
    cropped_image.save(os.path.join(newdir, id + '_cropped_full.png'))

    # Creates thumbnail, saving as [id]_thumb.png
    thumb_size = pic.resize((115, 90))
    thumb_size.save(os.path.join(newdir, id + '_thumb.png'))

    resp = jsonify({'message': 'Image successfully uploaded'})
    resp.status_code = 201
    return resp

# def change_image_type(image_type):  # <--- Changes the image type into the .png standard format
#
#     image = Image.open('demo_image.jpg')
#     image.save('new_image.png')
#
#
# def create_image_set(image_dir,
#                      image_name):  # <--- Creates the two different versions of the image (Full_Size, thumbnail)
#
#     thumb = 30, 30
#     full_size = 1080, 1080
#
#     image = Image.open(os.path.join(image_dir, image_name))
#
#     image_ext = image_name.split(".")[-1]
#     image_name = image_name.split(".")[0]
#
#     ### FULL_SIZE ###
#     full_size_image = image.copy()
#     full_size_image.thumbnail(full_size, Image.LANCZOS)
#     full_size_image.save(f"{os.path.join(image_dir, image_name)}-fullsize.{image_ext}", optimize=True, quality=95)
#
#     ### THUMBNAIL ###
#     thumbnail_image = image.copy()
#     thumbnail_image.thumbnail(thumb, Image.LANCZOS)
#     thumbnail_image.save(f"{os.path.join(image_dir, image_name)}-thumbnail.{image_ext}", optimize=True, quality=95)
#
# # def allowed_file(filename):
# #     return '.' in filename and \
# #            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
