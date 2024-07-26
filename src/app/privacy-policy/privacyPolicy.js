import Link from "next/link";
import style from "../../styles/policy.module.css";

const PrivacyPolicy = () => {
  return (
    <>
      <div className={style.policyMainContainer}>
        <div className="container">
          <div className={style.policyInnerItems}>
            <div className={style.sectionDivider}>
              <h2>Privacy Policy</h2>
              <p>
                This Privacy Policy explains how information about you is
                collected, used and disclosed by Alberto Torresi’s official
                website. To keep your personal security intact, it is important
                for you to read the following Privacy Policy and understand how
                we will treat information about you when you use our website.
              </p>
            </div>
            <div className={style.sectionDivider}>
              <h4>HOW DO WE COLLECT YOUR INFORMATION?</h4>
              <p>
                When you visit the Site, we automatically collect certain
                information about your device, including information about your
                web browser, IP address, time zone, and some of the cookies that
                are installed on your device. Additionally, as you browse the
                Site, we collect information about the individual web pages or
                products that you view, what websites or search terms referred
                you to the Site, and information about how you interact with the
                Site. We refer to this automatically-collected information as
                “Device Information”. We collect Device Information using the
                following technologies:
              </p>
              <ul>
                <li>
                  <i></i>
                  <p>
                    {" "}
                    “Cookies” are data files that are placed on your device or
                    computer and often include an anonymous unique identifier.
                    For more information about cookies, and how to disable
                    cookies, visit{" "}
                    <Link href="http://www.allaboutcookies.org">
                      http://www.allaboutcookies.org.
                    </Link>
                  </p>
                </li>

                <li>
                  <i></i>
                  <p>
                    “Log files” track actions occurring on the Site, and collect
                    data including your IP address, browser type, Internet
                    service provider, referring/exit pages, and date/time
                    stamps.
                  </p>
                </li>
                <li>
                  <i></i>
                  <p>
                    “Web beacons”, “tags”, and “pixels” are electronic files
                    used to record information about how you browse the Site.
                  </p>
                </li>
              </ul>
              <p>
                Additionally when you make a purchase or attempt to make a
                purchase through the Site, we collect certain information from
                you, including your name, billing address, shipping address,
                payment information, email address, and phone number. We refer
                to this information as “Order Information”.
              </p>
              <p>
                When we talk about “Personal Information” in this Privacy
                Policy, we are talking about both Device Information and Order
                Information
              </p>
            </div>
            <div className={style.sectionDivider}>
              <ul>
                <h4>HOW DO WE USE YOUR PERSONAL INFORMATION?</h4>
                <li>
                  <i></i>
                  <p>
                    To personalize and improve the Sites and provide
                    advertisements, content or features that match user profiles
                    and interests.
                  </p>
                </li>

                <li>
                  <i></i>
                  <p>
                    {" "}
                    To communicate with you for information/materials about
                    products, offers, events, news and for other promotional
                    purposes we think you will find valuable.
                  </p>
                </li>

                <li>
                  <i></i>
                  <p>
                    To administer contests, promotions, surveys or other Site
                    features and to provide you with the relevant products or
                    services.
                  </p>
                </li>

                <li>
                  <i></i>
                  <p>
                    To monitor analyzes about how our customers browse and
                    interact with the Site to help improve your online
                    experience with us.
                  </p>
                </li>

                <li>
                  <i></i>
                  <p>To screen our orders for potential risk or fraud.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
