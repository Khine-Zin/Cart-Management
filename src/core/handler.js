import { cartUi } from "./selector";

export const cartBtnHandler = () => {
  cartUi.classList.toggle("translate-x-full");
  cartUi.classList.add("duration-300");
};
