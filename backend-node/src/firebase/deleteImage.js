const {getStorage, ref, deleteObject} = require("firebase/storage");
const {cloud} = require("./getFirebase");
const storage = getStorage();

const deleteImage = async (filename) => {
  const storageRef = ref(storage, `avatars/${filename}`);
  try {
    console.log("Deleting image...");
    await deleteObject(storageRef);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {deleteImage};
