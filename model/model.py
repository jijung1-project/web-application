from keras import metrics
from keras.engine.saving import load_model
import numpy as np
from PIL import Image
import sys

answer_arr = np.load('model/classes_300.npy')
model = load_model('model/59-0.5797.hdf5')
input_imgs= list()


for i in range(1, len(sys.argv)):
    input_img = Image.open(sys.argv[i])
    input_img = input_img.convert("RGB")
    input_img_resize = input_img.resize((128,128))
    input_img_resize = np.asarray(input_img_resize)
    input_imgs.append(input_img_resize)

input_imgs = np.asarray(input_imgs)
input_imgs = input_imgs.astype('float32')
input_imgs = input_imgs / 255.0

model.compile(loss='categorical_crossentropy', optimizer='adam',metrics=[metrics.categorical_accuracy])
predict = model.predict_classes(input_imgs)


for i in range(len(input_imgs)):
    print(answer_arr[predict[i]])
