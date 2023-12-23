import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { NavbarCursor, NavbarAnimation } from "./NavbarProperty";

export default function Navbar() {
  axios.defaults.withCredentials = true;
  const { navbar, magnets } = NavbarAnimation();
  const { onEnterNavbar, onLeaveNavbar } = NavbarCursor();

  const [isValid, setIsValid] = useState(false);
  const [getData, setGetData] = useState({});
  const [getCount, setGetCount] = useState(0);
  useEffect(() => {
    axios
      .get("https://project-ii-server.vercel.app/cart")
      .then((res) => {
        if (Array.isArray(res.data)) {
          let totalAmount = 0;

          res.data.forEach((item) => {
            totalAmount += item.amount;
          });

          setGetCount(totalAmount);
        } else {
          console.error("Data is not an array:", res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [getCount, getData]);

  useEffect(() => {
    axios
      .get("https://project-ii-server.vercel.app/session")
      .then((res) => {
        if (res.data.isValid === true) {
          setIsValid(true);
          setGetData(res.data.user);
          console.log(res.data);
        } else {
          setIsValid(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <nav className="nav-nav" ref={navbar}>
        <Link
          to="/"
          className="nav-logo"
          onMouseEnter={onEnterNavbar}
          onMouseLeave={onLeaveNavbar}
          ref={(e) => e && magnets.current.push(e)}
        >
          Shopionz
        </Link>
        <ul className="nav-ul">
          <li
            className="nav-li"
            onMouseEnter={onEnterNavbar}
            onMouseLeave={onLeaveNavbar}
            ref={(e) => e && magnets.current.push(e)}
          >
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li
            className="nav-li"
            onMouseEnter={onEnterNavbar}
            onMouseLeave={onLeaveNavbar}
            ref={(e) => e && magnets.current.push(e)}
          >
            <Link className="nav-link" to="/product">
              Product
            </Link>
          </li>
          <li
            className="nav-li"
            onMouseEnter={onEnterNavbar}
            onMouseLeave={onLeaveNavbar}
            ref={(e) => e && magnets.current.push(e)}
          >
            <Link className="nav-link" to="/about-us">
              About Us
            </Link>
          </li>
        </ul>
        <div className="nav-icon">
          <span
            className="material-symbols-outlined"
            onMouseEnter={onEnterNavbar}
            onMouseLeave={onLeaveNavbar}
            ref={(e) => e && magnets.current.push(e)}
          >
            search
          </span>
          <Link
            className="shopping-cart"
            onMouseEnter={onEnterNavbar}
            onMouseLeave={onLeaveNavbar}
            ref={(e) => e && magnets.current.push(e)}
            to={"/cart"}
          >
            <span className="material-symbols-outlined">local_mall</span>
            {isValid && <div className="shopping-cart-count">{getCount}</div>}
          </Link>
          <Link
            onMouseEnter={onEnterNavbar}
            onMouseLeave={onLeaveNavbar}
            ref={(e) => e && magnets.current.push(e)}
            to="/login"
            className="icon-login"
          >
            {isValid ? (
              <img
                className="home-user-image"
                src={`/client/src/assets/image/${getData.image}`}
              />
            ) : (
              <>
                <span className="material-symbols-outlined">person</span>
              </>
            )}
          </Link>
        </div>
      </nav>
    </>
  );
}
