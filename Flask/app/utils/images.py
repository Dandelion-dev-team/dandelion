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

    pic = Image.open(pic)
    # Saves the image in predetermined "full size" dimensions (590, 330). Saves it as [id]_full.png in proper directory
    full_size = pic.resize((590, 330))
    full_size.save(os.path.join(newdir, 'full.png'))

    # Creates thumbnail, saving as [id]_thumb.png
    thumb_size = pic.resize((115, 90))
    thumb_size.save(os.path.join(newdir, 'thumb.png'))

    # Image cropping and resising into the "full size" dimensions. Alternative to full size. Saving it as [id]_cropped_full.png
    cw, ch = 590, 330
    w, h = pic.size
    box = w // 2 - cw // 2, h // 2 - ch // 2, w // 2 + cw // 2, h // 2 + ch // 2
    cropped_image = pic.crop(box)
    cropped_image.save(os.path.join(newdir, 'cropped_full.png'))

    resp = jsonify({'message': 'Image successfully uploaded'})
    resp.status_code = 201
    return resp





def image_processing_2(pic, id, filename, folder_location):

    newdir = get_image_directory_name(folder_location, id)
    save_image(pic, newdir, filename)
    pil_image = Image.open(pic)

    # Full size
    box = get_box(pil_image, 590, 330)
    pil_resized = resize_and_crop(pil_image, box)
    pil_resized.save(os.path.join(newdir, 'full.png')


    # Thumbnail
    box = get_box(pil_image, 115, 90)
    pil_resized = resize_and_crop(pil_image, box)
    pil_resized.save(os.path.join(newdir, 'thumb.png')


def get_box(original_image, target_width, target_height):
    width, height = original_image.size
    box = width // 2 - target_width // 2, height // 2 - target_height // 2, width // 2 + target_width // 2, height // 2 + target_height // 2
    return box


def get_image_directory_name(folder_location, id):
    newdir = (os.path.join(folder_location, id))
    if not os.path.exists(newdir):
        os.makedirs(newdir)


def save_image(pic, newdir,filename):
    pic.save(os.path.join(newdir, filename))


def resize_and_crop(image_object, box, pic):

    # Image cropping and resising into the "full size" dimensions. Alternative to full size. Saving it as [id]_cropped_full.png
    cw, ch = 590, 330
    w, h = pic.size
    box = w // 2 - cw // 2, h // 2 - ch // 2, w // 2 + cw // 2, h // 2 + ch // 2
    cropped_image = pic.crop(box)
    cropped_image.save(os.path.join(newdir, 'cropped_full.png'))
