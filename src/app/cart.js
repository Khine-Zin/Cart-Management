import { app, cartBtnCount, cartItem, cartTotalAmount } from "../core/selector";
import { products } from "../core/variable";

export const createCartUi = ({ id, image, title, price }) => {
  const cart = document.createElement("div");
  cart.classList.add("cart-item-ui");
  cart.setAttribute("data-id", id);
  cart.innerHTML = `
    <div class=" mb-4">
    <img class="h-[80px] mb-[-40px] ps-4" src="${image}">
    <div class="border p-4 pt-10 border-neutral-700 text-neutral-700">
      <p class="font-bold line-clamp-1 ">${title}</p>
      <div class="flex justify-between items-center">
        <p class="text-neutral-500">$<span class="cart-cost">${price}</span></p>
        <div class="flex w-[100px] bg-neutral-200 justify-between items-center">
          <button class="px-2 py-1 bg-neutral-300" id="minus-count">-</button>
          <p class="flex-grow text-end pe-2" id="quantity">1</p>
          <button class="px-2 py-1 bg-neutral-300" id="plus-count" >+</button>
        </div>
      </div>
    </div>
   </div>
    `;

  const plusCartBtn = cart.querySelector("#plus-count");
  plusCartBtn.addEventListener("click", plusCartBtnHandler);

  const minusCartBtn = cart.querySelector("#minus-count");
  minusCartBtn.addEventListener("click", minusCartBtnHander);

  return cart;
};
export const calculateAmountTotal = () => {
  const cartCost = app.querySelectorAll(".cart-cost");

  const total = [...cartCost].reduce(
    (pv, cv) => pv + parseFloat(cv.innerText),
    0
  );
  return total;
};

export const calculateCartCount = () => {
  const cartLength = cartItem.children.length - 1;
  return cartLength;
};

let count = 1;
export const plusCartBtnHandler = event => {
  let currentCart = event.target.closest(".cart-item-ui");
  const cartId = currentCart.getAttribute("data-id");
  const currentCartProduct = products.find(el => el.id == cartId);
  let quantity = currentCart.querySelector("#quantity");
  let cartCost = currentCart.querySelector(".cart-cost");
  let Qty = parseFloat(quantity.innerText);
  if (currentCartProduct.id == cartId) {
    let totalQuantity = Qty + count;
    quantity.innerText = totalQuantity;
    let price = currentCartProduct.price;
    cartCost.innerText = totalQuantity * price;
    // console.log(currentCartProduct.price);
  }
  return plusCartBtnHandler;
};

export const minusCartBtnHander = event => {
  let currentCart = event.target.closest(".cart-item-ui");
  const cartId = currentCart.getAttribute("data-id");
  const currentCartProduct = products.find(el => el.id == cartId);
  let quantity = currentCart.querySelector("#quantity");
  let cartCost = currentCart.querySelector(".cart-cost");
  let Qty = parseFloat(quantity.innerText);
  if (currentCartProduct.id == cartId) {
    let totalQuantity = Qty - count;
    if (totalQuantity > 0) {
      quantity.innerText = totalQuantity;
      let price = currentCartProduct.price;
      cartCost.innerText = totalQuantity * price;
    }
  }
};

export const cartObserver = () => {
  const observerOptions = {
    childList: true,
    subtree: true,
  };

  const observer = new MutationObserver(() => {
    cartTotalAmount.innerText = calculateAmountTotal();
    cartBtnCount.innerText = calculateCartCount();
  });
  observer.observe(cartItem, observerOptions);
};
