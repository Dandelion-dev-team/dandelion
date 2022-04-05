from PIL import Image
import os
from app.utils.uploads import content_folder


# def make_image_directory_name(object_type, id):
#     newdir = content_folder(object_type, id, 'image', upload=True)
#     if not os.path.exists(newdir):
#         os.makedirs(newdir)
#     return newdir


def image_processing(pic, object_type, id, filename):
    newdir = content_folder(object_type, id, 'image', upload=True)
    save_image(pic, newdir, filename)

    pil_image = Image.open(os.path.join(newdir, filename))

    # Full_size
    target_width = 590
    target_height = 330
    pil_resized = resize_and_crop(pil_image, target_width, target_height)
    pil_resized.save(os.path.join(newdir, 'full.png'))

    # Thumbnail
    target_width = 115
    target_height = 90
    pil_resized = resize_and_crop(pil_image, target_width, target_height)
    pil_resized.save(os.path.join(newdir, 'thumb.png'))


def save_image(pic, newdir, filename):
    pic.save(os.path.join(newdir, filename))


def resize_and_crop(pil_image, target_width, target_height):
    width, height = pil_image.size
    resized_cropped = pil_image

    # Calculate the reduction factor
    factor = min(height / target_height, width / target_width)
    size = (round(width / factor), round(height / factor))
    resized_cropped = resized_cropped.resize(size)  # This does not change the aspect ratio

    width, height = resized_cropped.size

    # Calculate the cropping box
    left = (width - target_width) / 2
    right = width - left
    top = (height - target_height) / 2
    bottom = height - top
    box = left, top, right, bottom
    resized_cropped = resized_cropped.crop(box)

    return resized_cropped
