import { useDispatch } from "react-redux";
import ModalForm from "../ModalForm/ModalForm";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { setUser } from "../../store/slices/userSlice";

const SignUp = ({ isOpenModal, handleCancel, setIsOpenModalSignUp }) => {
  const dispatch = useDispatch();

  const handleSignUp = ({ email, password }) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
        setIsOpenModalSignUp(false);
      })
      .catch(console.error);
  };

  return (
    <ModalForm
      title="SignUp"
      handleClick={handleSignUp}
      isOpenModal={isOpenModal}
      handleCancel={handleCancel}
    />
  );
};

export default SignUp;
