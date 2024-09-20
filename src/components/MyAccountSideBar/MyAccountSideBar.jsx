import Link from "next/link";
import style from "../../styles/MyAccountSideBar.module.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const MyAccountSideBar = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const user = response.data;
          console.log(response.data);
          setUserName(`${user.firstName} ${user.lastName}`);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout/user`, {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      localStorage.removeItem('token');
      router.push('/credential/log-in');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div className={style.sideBarMainContainer}>
        <div className={style.sideBarItems}>
          <div className={style.tittle}>
            <h3>Hey, {userName}</h3>
            <p>Welcome to your Account</p>
          </div>

          <ul className={style.sideBarNav}>
            <li>
              <Link className={style.navActive} href="/account/my-orders">
                <figure>
                  <img src="/myOrder.svg" alt="" />
                </figure>
                My orders
              </Link>
            </li>

            <li>
              <Link href="/account/wishlist">
                <figure>
                  <img src="/wishlist1.svg" alt="" />
                </figure>
                Wishlist
              </Link>
            </li>

            <li>
              <Link href="/account/my-info">
                <figure>
                  <img src="/user1.svg" alt="" />
                </figure>
                My info
              </Link>
            </li>
            {/* <li>
              <Link href="/credential/log-in">
                <figure>
                  <img src="/signOut.svg" alt="" />
                </figure>
                Sign out
              </Link>
            </li> */}
            <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <figure>
                <img src="/signOut.svg" alt="" />
              </figure>
              Sign out
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MyAccountSideBar;
