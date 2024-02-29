import { categoryList, productCart } from "../core/selector";

import { products } from "../core/variable";

import { productRender } from "./product";

export const categoryRender = list => {
  list.forEach(el => categoryList.append(categoryUi(el)));
};

export const categoryUi = categoryName => {
  const btn = document.createElement("button");
  btn.classList.add("category-badge", "category");

  btn.addEventListener("click", categoryBtnHandler);
  btn.innerText = categoryName;

  return btn;
};

const categoryBtnHandler = event => {
  productCart.innerHTML = "";
  const currentText = event.target.innerText;
  const currentCatagory = products.filter(
    product => product.category == currentText
  );

  productRender(currentCatagory);
  const categoryBtn = document.querySelectorAll(".category");

  categoryBtn.forEach(btn =>
    btn.classList.remove("bg-neutral-900", "text-white")
  );
  event.target.classList.add("bg-neutral-900", "text-white");
};
