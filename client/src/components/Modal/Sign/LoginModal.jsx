import styles from "./SignModal.module.scss";
import btn from "styles/Button.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "store/slice/userSlice";
import axios from "axios";
import toastMessage from "utils/toast";

const LoginModal = ({
  openModal,
  closeModal,
  userId,
  userPassword,
  onChangeValue,
  setValueInit,
}) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  //const JWT_EXPIRY_TIME = 1000 * 60 * 10;

  const onSumitLogin = async e => {
    e.preventDefault();
    //유효성 검사
    if (userId === "") {
      setMessage("아이디를 입력하세요");
      return;
    }

    if (userPassword === "") {
      setMessage("비밀번호를 입력하세요");
      return;
    }

    const userInfo = {
      id: userId,
      password: userPassword,
    };

    try {
      const response = await axios.post("/api/users/signIn", userInfo);

      if (!response.data.isLogin) {
        setMessage(response.data.messsage);
        return;
      }

      if (response.data.isLogin) {
        setMessage("");
        setValueInit("login");
        getAccessToken(response);
        toastMessage(response.data.messsage);
        dispatch(loginUser(response.data));
        closeModal();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //const onSilentRefresh = () => {
  //    axios.post('/silent-refresh', {})
  //        .then(onLoginSuccess)
  //}

  const getAccessToken = response => {
    const { accessToken } = response.data;
    // accessToken 설정
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    console.log(accessToken);
    // accessToken 만료하기 1분 전에 로그인 연장
    //setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 50000);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSumitLogin}>
        <div className={styles.header}>
          <FontAwesomeIcon
            className={styles.cancel}
            icon={faX}
            size="lg"
            onClick={closeModal}
          />
          <h2 className={styles.title}>로그인</h2>
          <div></div>
        </div>

        <input
          id="user-form-id"
          className={styles.input}
          type="text"
          placeholder="아이디"
          maxLength="12"
          onChange={onChangeValue}
        />

        <input
          id="user-form-pw"
          className={styles.input}
          type="password"
          placeholder="비밀 번호"
          maxLength="15"
          onChange={onChangeValue}
        />

        <span className={styles.message}>{message}</span>

        <div className={styles.button_box}>
          <button className={btn.signButton} type="submit">
            로그인
          </button>

          <button className={btn.signButton} type="submit">
            카카오 로그인
          </button>
        </div>

        <div className={styles.questionBox}>
          <span className={styles.question}>계정이 없으신가요?&nbsp;</span>

          <span className={styles.navigate} onClick={() => openModal("signup")}>
            회원가입
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginModal;
