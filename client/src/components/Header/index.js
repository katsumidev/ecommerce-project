import React, { useEffect, useState, useRef } from "react";
import {
  BsGeoAlt,
  RiArrowDropDownLine,
  RiShoppingCartLine,
} from "../../styles/Icons";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import cep from "cep-promise";
import {
  Container,
  LocationInfo,
  SearchWrapper,
  SearchTitle,
  SearchBarContent,
  ProfilePicture,
  UserProfile,
  DropDownMenu,
  DropDownItem,
  SearchIcon,
  DropDownContainer,
  SearchBar,
  Row,
  UserInfo,
  CartWrapper,
  Menu,
} from "./styles";
function Header() {
  const [logged, setLogged] = useState(false);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const dropdownRef = useRef(null);
  const [locationInfo, setLocationInfo] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/auth/consult", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then(async (res) => {
      let data = await res.json();

      switch (res.status) {
        case 200:
          setLogged(!logged);
          setUserData(data);
          break;
      }
    });
  }, []);

  useEffect(() => {
    cep(userData.cep).then((res) => {
      setLocationInfo(res);
    });
  }, [userData]);

  useEffect(() => {
    const pageClick = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(!open);
      }
    };

    if (open) {
      window.addEventListener("click", pageClick);
    }

    return () => {
      window.removeEventListener("click", pageClick);
    };
  }, [open]);

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.clear();
  }

  const navigate = useNavigate();

  return (
    <Container>
      <LocationInfo>
        <BsGeoAlt size={25} />
        <div>
          {logged ? (
            <>
              <p>Deliver to</p>
              <h3>
                {locationInfo.city} {locationInfo.cep}
              </h3>
            </>
          ) : (
            <p>Do login to see this information</p>
          )}
        </div>
      </LocationInfo>
      <SearchWrapper>
        <SearchBar placeholder="Search for products here..." />
        <div className="separator"></div>
        <SearchIcon />
      </SearchWrapper>
      <CartWrapper onClick={() => navigate("/cart")}>
        <RiShoppingCartLine size={25} />
        <h4>Your cart</h4>
      </CartWrapper>
      <Row>
        <Menu
          buttonWidth={30}
          barColor="#FFFFFF"
          isActive={open}
          toggleButton={() => setOpen(!open)}
        />
        <UserInfo>
          {logged ? (
            <>
              <p>Hi {userData.name}</p>
              <div className="userinfo_div" onClick={() => setOpen(!open)}>
                <strong>Your account</strong>
                <RiArrowDropDownLine size={30} />
              </div>
            </>
          ) : (
            <>
              <div className="userinfo_div" onClick={() => setOpen(!open)}>
                <strong>Login</strong>
                <RiArrowDropDownLine size={30} />
              </div>
            </>
          )}
        </UserInfo>
        <DropDownContainer ref={dropdownRef}>
          {open && (
            <DropDownMenu>
              {logged ? (
                <UserProfile>
                  <ProfilePicture picture={`http://localhost:3001/files/${userData.picture}`} />
                  <div className="wrapper">
                    <h3>Hi {userData.name} 👋 </h3>
                    <a href="/login" onClick={() => logout()}>
                      Log out
                    </a>
                  </div>
                </UserProfile>
              ) : (
                <UserProfile>
                  <ProfilePicture picture="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP5IU8GgSurLLlvDn7J82C_uQHCfNHaxEqP7aU2P8xSx5QfhTIZVqHYkT-g7bggRhu92w&usqp=CAU" />
                  <div className="wrapper">
                    <h3>Hi! 👋 </h3>
                    <Link to="/login">Login or register!</Link>
                  </div>
                </UserProfile>
              )}
              <DropDownItem>
                <a>Account</a>
              </DropDownItem>
              <DropDownItem
                className="cart-btn"
                onClick={() => navigate("/cart")}
              >
                <a>Cart</a>
              </DropDownItem>
              <DropDownItem>
                <a>Orders</a>
              </DropDownItem>
              <DropDownItem>
                <a>Security</a>
              </DropDownItem>
              <DropDownItem>
                <a>Privacy</a>
              </DropDownItem>
              <DropDownItem>
                <a>Wishlist</a>
              </DropDownItem>
              <DropDownItem onClick={() => navigate("/product/register")}>
                <a>Sell</a>
              </DropDownItem>
            </DropDownMenu>
          )}
        </DropDownContainer>
      </Row>
    </Container>
  );
}

export default Header;
