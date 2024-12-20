import style from "../../../styles/primaryBtn.module.css";

const PrimaryBtn = (props) => {
  return (
    <>
      <button className={style.primaryBtn}>
        {props.btnText} <img src="arrow-right.svg" alt="" />
      </button>
    </>
  );
};

export default PrimaryBtn;
