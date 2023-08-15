import { FC } from "react";
import styles from "./index.module.scss";

interface FooterProps {}
const Footer: FC<FooterProps> = () => {
  return <footer  className={styles.container}>Created by biz</footer>;
};
export default Footer;
