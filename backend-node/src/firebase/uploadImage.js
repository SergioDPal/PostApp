const {getStorage, ref, uploadBytes} = require("firebase/storage");
const {cloud} = require("./getFirebase");
const storage = getStorage();
const sharp = require("sharp");

const resizeImage = async (file) => {
  const sharpImg = await sharp(file.data)
    .resize({width: 250, height: 250, fit: "cover"})
    .withMetadata()
    .toBuffer();

  return sharpImg;
};

const uploadImage = async (file) => {
  const resizedImg = await resizeImage(file);
  const storageRef = ref(storage, `avatars/${file.name}`);
  const snapshot = await uploadBytes(storageRef, resizedImg);
  console.log("Uploaded a blob or file!");
  return snapshot;
};

module.exports = {uploadImage};
