import styles from "./Loading.module.scss";
import { theme } from "store/slice/themeSlice";
import { BounceLoader } from "react-spinners";
import { useSelector } from "react-redux";

const Loading = () => {
  const isDark = useSelector(theme);

  return (
    <>
      <div className={styles.loading}>
        <h3 className="loading-text">로딩중</h3>

        <BounceLoader
          className="loadig-spinner"
          color={isDark ? "#3498db" : "#36d7b7"}
        />
      </div>
    </>
  );
};

export default Loading;
