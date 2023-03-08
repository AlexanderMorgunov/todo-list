import {
  getDatabase,
  ref,
  set,
  child,
  get,
  update,
  remove,
} from "firebase/database";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { firebaseConfig } from "../firebase";
import { useAuth } from "./use-auth";
import moment from "moment";

const app = initializeApp(firebaseConfig);

const db = getDatabase();

export const useFirebase = () => {
  const { userId } = useAuth();

  function writeTaskData({
    id,
    date,
    title,
    description,
    // userId,
    fontSize,
    status,
    isAttach,
  }) {
    set(ref(db, `${userId}/` + id), {
      id,
      date: date || moment(new Date()).format("MMMM Do YYYY, h:mm a"),
      title: title || "",
      status: status || "active",
      description: description || "",
      fontSize: fontSize,
      isAttach: isAttach || false,
    });
  }

  function getData(dataReq) {
    const dbRef = ref(getDatabase());
    const data = get(child(dbRef, dataReq))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          return false;
        }
      })
      .catch((error) => {
        return error;
      });
    return data;
  }

  const getTasksFromFireBase = () =>
    getData(`${userId}`).then((data) => Object.values(data));

  const removeAllDataFireBase = () => {
    set(ref(db, `${userId}`), null);
  };

  const deleteTaskData = (id) => {
    set(ref(db, `${userId}/` + id), null);
  };

  return {
    writeTaskData,
    getData,
    getTasksFromFireBase,
    removeAllDataFireBase,
    deleteTaskData,
  };
};
