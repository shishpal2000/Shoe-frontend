import style from "../../styles/otherLoginOpts.module.css";

import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import "flag-icon-css/css/flag-icon.min.css";

const OtherLoginOpts = () => {
  const [phone, setPhone] = useState("");
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
          <li>
            <button>
              <i>
                <img src="/apple.svg" alt="" />
              </i>
              Apple
            </button>
          </li>
        </ul>
        <PhoneInput
          country={"us"}
          value={phone}
          onChange={setPhone}
          enableSearch={true}
          disableSearchIcon={false}
        />
      </div>
    </>
  );
};

export default OtherLoginOpts;
