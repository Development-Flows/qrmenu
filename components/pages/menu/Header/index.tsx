"use client";
import { FC, useState } from "react";
import Image from "next/image";
import styles from "./index.module.scss";
import Modal from "@/components/Modal";

interface HeaderProps {
  logoSrc: string;
  logoAltText?: string;
}
const Header: FC<HeaderProps> = ({ logoSrc, logoAltText = "" }) => {
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);

  return (
    <>
      <header className={styles.container}>
          {/*<button onClick={() => setIsLeftVisible(true)}>
          <i>☢</i>
        </button>*/}

        <div className={styles.logo}>
          <Image
            src={logoSrc}
            alt={logoAltText??''}
            className={styles.logo}
            layout="fill"
            objectFit="contain"
          />
        </div>

          {/* <button onClick={() => setIsRightVisible(true)}>
          <i>☠</i>
        </button>*/}
      </header>

      <Modal
        isVisible={isLeftVisible}
        enteringAnimation="slideLeft"
        exitingAnimation="slideLeft"
        onBackDropClick={() => setIsLeftVisible(false)}
        onBackButtonClick={() => setIsLeftVisible(false)}
        style={{ alignItems: "flex-start" }}
      >
        <div
          style={{
            padding: 20,
            height: window.innerHeight,
            width: Math.min((window.innerWidth * 3) / 4, 400),
            background: "white",
          }}
        >
          Sol menü içeriği
        </div>
      </Modal>

      <Modal
        isVisible={isRightVisible}
        enteringAnimation="slideRight"
        exitingAnimation="slideRight"
        onBackDropClick={() => setIsRightVisible(false)}
        onBackButtonClick={() => setIsRightVisible(false)}
        style={{ alignItems: "flex-end" }}
      >
        <div
          style={{
            padding: 20,
            height: window.innerHeight,
            width: Math.min((window.innerWidth * 3) / 4, 400),
            background: "white",
          }}
        >
          Sağ menü içeriği
        </div>
      </Modal>
    </>
  );
};

export default Header;
