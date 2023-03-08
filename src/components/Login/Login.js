import ModalForm from "../ModalForm/ModalForm";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useFirebase } from "../../hooks/useFirebase";

const Login = ({ isOpenModal, handleCancel, setIsOpenModalLogin }) => {
  const dispatch = useDispatch();
  const { writeTaskData, getTasksFromFireBase } = useFirebase();

  const handleLogin = ({ email, password }) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
        setIsOpenModalLogin(false);
      })
      .catch(() =>
        alert("Пользователь с такими учетными данными не зарегистрирован")
      );
  };

  return (
    <ModalForm
      title="Login"
      handleClick={handleLogin}
      isOpenModal={isOpenModal}
      handleCancel={handleCancel}
    />
  );
};

export default Login;
