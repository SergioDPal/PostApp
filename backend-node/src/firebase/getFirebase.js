const {initializeApp} = require("firebase/app");
const {getFirestore} = require("firebase/firestore");
const firebaseConfig = {
  // Your firebase config
  // Example:
  // databaseURL: "gs://postapp-2d659.appspot.com/",
  // projectId: "postapp-2d659"

  databaseURL: "gs://postapp-2d659.appspot.com/",
  projectId: "postapp-2d659",
  storageBucket: "postapp-2d659.appspot.com",
};

const app = initializeApp(firebaseConfig);
const cloud = getFirestore(app);

module.exports = {cloud};
