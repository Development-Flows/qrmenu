"use client";
import { FC, useState } from "react";
import { Response_getAllWithProduct } from "@/service/types";
import styles from "./index.module.scss";
import Image from "next/image";

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
          return <ProductCard product={product} key={product._id} />;
        })}
      </section>
    </section>
  );
};

interface ProductCardProps {
  product: ContentProps["categories"][0]["products"][0];
}
const ProductCard: FC<ProductCardProps> = ({ product }) => {
  console.log("product", product);
  return (
    <button className={styles.productContainer}>
      <div className={styles.productImageContainer}>
        {product.image.startsWith("http") ? (
          <Image src={product.image} alt={product.name} layout="fill" />
        ) : (
          <span>☆</span>
        )}
      </div>
      <div className={styles.productContentContainer}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>
      <div className={styles.productPriceContainer}>
        <span>{product.priceSale} TL</span>
      </div>
    </button>
  );
};

export default Content;
