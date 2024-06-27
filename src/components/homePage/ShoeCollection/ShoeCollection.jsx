import style from "../../../styles/shoeCollection.module.css";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";

const ShoeCollection = () => {
  return (
    <>
      <div className={style.shoe_collection_main}>
        <div className={style.shoe_collect_items}>
          <figure>
            <img src="shoe_collection_bg.png" alt="" />
          </figure>
          <div className={style.content}>
            <h3>Men's Shoe Collection</h3>
            <p>
              It is a long established fact that a reader <br />
              will be distracted .
            </p>
            <SecondaryBtn btnText="explore" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoeCollection;
