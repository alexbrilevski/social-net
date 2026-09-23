import type { FC } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import defaultAvatar from "../../assets/images/man_avatar.png";
import styles from "./Header.module.css";

type HeaderProps = {
  userId: number | null,
  fullName: string | null,
  photo: string | null,
  isAuth: boolean,
  logout: () => void,
};

const Header: FC<HeaderProps> = ({ userId, fullName, photo, isAuth, logout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="DevNet" width="120" height="20" />
        </Link>
      </div>
      <div className={styles["login-block"]}>
        {isAuth ?
          !fullName ?
            <span>Loading...</span>
            :
            <div className={styles["container"]}>
              <Link to={"/profile/" + userId}>
                <img
                  src={photo ?? defaultAvatar}
                  alt={fullName}
                />
              </Link>
              <div className={styles.userInfo}>
                <p>{fullName}</p>
                <button onClick={logout}>Logout</button>
              </div>
            </div>
          :
          <Link to="/login">Sign In</Link>
        }
      </div>
    </header>
  );
};

export default Header;
