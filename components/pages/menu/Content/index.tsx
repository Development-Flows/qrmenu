"use client";
import { FC, useState } from "react";
import { Response_getAllWithProduct } from "@/service/types";
import styles from "./index.module.scss";

interface ContentProps {
  categories: Response_getAllWithProduct["data"];
}
const Content: FC<ContentProps> = ({ categories }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  return (
    <section className={styles.container}>
      <nav>
        {categories.map((category, index) => (
          <button
            key={category._id}
            onClick={() => setActiveCategoryIndex(index)}
          >
            <span>{category.name}</span>
          </button>
        ))}
      </nav>
      <section className={styles.content}>
        {categories[activeCategoryIndex].products.map((product, index) => {
          return (
            <button key={product._id}>
              <span>{product.name}</span>
            </button>
          );
        })}
      </section>
    </section>
  );
};

export default Content;
