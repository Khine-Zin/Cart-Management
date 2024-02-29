import { cartObserver } from "./app/cart";
import { categoryRender } from "./app/category";
import { productRender } from "./app/product";
import { cartBtnHandler } from "./core/handler";
import { cartBtn, closeCart } from "./core/selector";
import { categories, products } from "./core/variable";

export class Shop{
    preRender(){
        categoryRender(categories);
        productRender(products)
    }

    Listener(){
        cartBtn.addEventListener("click",cartBtnHandler);
        closeCart.addEventListener("click",cartBtnHandler)
    }

    observer(){
        cartObserver();
    }

    init(){
        this.observer(); 
        this.preRender();
        this.Listener();
    }
}