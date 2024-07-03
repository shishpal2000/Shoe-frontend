import style from "../../../styles/sectionTittle.module.css";

const SectionTittle = (props) => {
  return (
    <>
      <div className={style.sectionTittle}>
        <div className="container">
          <div className={style.tittle}>
            <h2>{props.secTittle}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionTittle;
