"use client";
import { FC } from "react";
import Image from "next/image";
import styles from "./index.module.scss";

interface HeaderProps {
  logoSrc: string;
  logoAltText?: string;
}
const Header: FC<HeaderProps> = () => {

  return (
    <>
      <header className={styles.container}>
        <div className={styles.logo}>
          <Image
            src={"/vercel.svg"}
            alt={'logo'}
            className={styles.logo}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </header>
    </>
  );
};

export default Header;
