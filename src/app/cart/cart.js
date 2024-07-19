import PageLinkBar from "@/components/PageLinkBar/PageLinkBar";
import style from "../../styles/cart.module.css";

const Cart = () => {
  return (
    <>
      <PageLinkBar currentPage="Cart" />

      <div className={style.cartMainContainer}>
        <div className="container">
          <div className={style.cartItemsContainer}>
            <div className={style.left}>
              <div className={style.cartDetail}>
                <h3>Your Cart</h3>
                <p>
                  Items in your bag not reserved- check out now to make them
                  yours.
                </p>
              </div>
            </div>
            <div className={style.right}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
