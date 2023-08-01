import { FC } from "react";
import Image from "next/image";
import styles from "./index.module.scss";

interface HeaderProps {
  logoSrc: string;
  logoAltText?: string;
}
const Header: FC<HeaderProps> = ({ logoSrc, logoAltText = "" }) => {
  return (
    <header className={styles.container}>
      <button>
        <i>☢</i>
      </button>

      <div className={styles.logo}>
        <Image
          src={logoSrc}
          alt={logoAltText}
          className={styles.logo}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <button>
        <i>☠</i>
      </button>
    </header>
  );
};

export default Header;
