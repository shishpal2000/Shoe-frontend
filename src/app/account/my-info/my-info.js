import MyAccountSideBar from "@/components/MyAccountSideBar/MyAccountSideBar";
import style from "../../../styles/myAccount.module.css";
import { MyAccoutPageLinkBar } from "@/components/PageLinkBar/PageLinkBar";
import styles from "../../../styles/myInfo.module.css";
import Link from "next/link";

const MyInfo = () => {
  const AddressList = [
    {
      id: 1,
      name: "Ujjwal",
      conNum: "8980252445",
      address:
        "1/4 Pragatinagar Flats, opp. jain derasar , near Jain derasar, Vijaynagar road",
    },

    {
      id: 2,
      name: "Ujjwal",
      conNum: "8980252445",
      address:
        "1/4 Pragatinagar Flats, opp. jain derasar , near Jain derasar, Vijaynagar road",
    },

    {
      id: 3,
      name: "Ujjwal",
      conNum: "8980252445",
      address:
        "1/4 Pragatinagar Flats, opp. jain derasar , near Jain derasar, Vijaynagar road",
    },

    {
      id: 4,
      name: "Ujjwal",
      conNum: "8980252445",
      address:
        "1/4 Pragatinagar Flats, opp. jain derasar , near Jain derasar, Vijaynagar road",
    },
  ];

  return (
    <>
      <div className={style.myAccountMainContainer}>
        <MyAccoutPageLinkBar currentPage="My Info" />
        <div className="container">
          <div className={style.myAccountInnerItems}>
            <div className={style.left}>
              <MyAccountSideBar />
            </div>
            <div className={style.right}>
              <div className={styles.myInfoContainer}>
                <h3>My Info</h3>
                <div className={styles.topBar}>
                  <p>
                    <b>Contact Details</b>
                  </p>
                  <p>
                    <Link href="/account/my-info/edit-my-info">change</Link>
                  </p>
                </div>

                <ul className={styles.infoBlanks}>
                  <li>
                    <h5>Your Name</h5>
                    <p>Ujjwal</p>
                  </li>
                  <li>
                    <h5>Email Address</h5>
                    <p>ujjwal@gmail.com</p>
                  </li>

                  <li>
                    <h5>Phone Number</h5>
                    <p>84654755547</p>
                  </li>
                  <li>
                    <h5>Password</h5>
                    <p className={styles.password}>........</p>
                  </li>
                </ul>

                <div className={styles.infoAddress}>
                  <div className={styles.topBar}>
                    <p>
                      <b>Address</b>
                    </p>
                    <p>
                      <Link href="">Add New</Link>
                    </p>
                  </div>

                  <ul className={styles.addressCardList}>
                    {AddressList.map(({ id, name, conNum, address }) => {
                      return (
                        <>
                          <li key={id}>
                            <h4>{name}</h4>
                            <h5>{conNum}</h5>
                            <p>{address}</p>
                            <ul className={styles.addresOpt}>
                              <li>Home</li>
                              <li>Default billing address</li>
                            </ul>

                            <ul className={styles.addresEditOpt}>
                              <li>remove</li>|<li>edit</li>
                            </ul>
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyInfo;
