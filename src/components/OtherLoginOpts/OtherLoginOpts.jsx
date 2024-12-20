import style from "../../styles/otherLoginOpts.module.css";

const OtherLoginOpts = () => {
  return (
    <>
      <div className={style.socialLoginOpts}>
        <label>OR Continue with</label>
        <ul>
          <li>
            <button>
              <i>
                <img src="/fb.svg" alt="" />
              </i>
              Facebook
            </button>
          </li>
          <li>
            <button>
              <i>
                <img src="/google.svg" alt="" />
              </i>
              Google
            </button>
          </li>
          {/* <li>
            <button>
              <i>
                <img src="/apple.svg" alt="" />
              </i>
              Apple
            </button>
          </li> */}
        </ul>
      </div>
    </>
  );
};

export default OtherLoginOpts;
