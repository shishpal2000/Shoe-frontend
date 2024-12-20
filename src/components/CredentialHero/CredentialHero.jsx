import style from "../../styles/credentialHero.module.css";

const CredentialHero = ({ bg, tag, heading, descrip }) => {
  return (
    <>
      <div className={style.credHeroCard}>
        <div className={style.bgImg}>
          <figure>
            <img src={bg} alt="" />
          </figure>
        </div>
        <div className={style.credHeroContent}>
          <div className={style.tag}>
            <p>{tag}</p>
            <hr />
          </div>

          <div className={style.mainContent}>
            <h2>{heading}</h2>
            <p>{descrip}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CredentialHero;
