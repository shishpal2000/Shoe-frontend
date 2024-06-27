import style from "../../../styles/secondaryBtn.module.css";

const SecondaryBtn = (props) => {
  return (
    <>
      <button className={style.secondaryBtn}>{props.btnText}</button>
    </>
  );
};

export default SecondaryBtn;
