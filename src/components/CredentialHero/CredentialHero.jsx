import style from "../../styles/credentialHero.module.css";

const CredentialHero = () => {
  return (
    <>
      <div className={style.credHeroCard}>
        <div className={style.bgImg}>
          <figure>
            <img src="/logInHero.png" alt="" />
          </figure>
        </div>
        <div className={style.credHeroContent}>
          <div className={style.tag}>
            <p>A WISE QUOTE</p>
            <hr />
          </div>

          <div className={style.mainContent}>
            <h2>
              Get Everything
              <br /> You Want
            </h2>
            <p>
              You can get everything you want if you work hard, trust the
              <br />
              process, and stick to the plan.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CredentialHero;
