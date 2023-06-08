const {getStorage, ref} = require("firebase/storage");
const {cloud} = require("./getFirebase");
const storage = getStorage();
const {getDownloadURL} = require("firebase/storage");

const getImage = async (imgName) => {
  const storageRef = ref(storage, `avatars/${imgName}`);
  const url = await getDownloadURL(storageRef);
  return url;
};

module.exports = {getImage};
