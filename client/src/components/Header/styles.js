import styled from "styled-components";
import { BsSearch } from "../../styles/Icons";
import { HamburgerCollapse } from "react-animated-burgers";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: sticky;
  top: 0;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 100%;
  padding: 15px 50px;
  background-color: var(--accent-color);
  color: #ffffff;
  z-index: 999;

  @media (max-width: 500px) {
    padding: 0;
  }
`;

export const LocationInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 900px) {
    display: none;
  }

  div p {
    font-size: 9pt;
  }

  h3 {
    font-size: 10pt;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  width: 80%;
  margin: 0 20px;

  .separator {
    position: relative;
    z-index: 1;
    width: 2px;
    height: 25px;
    left: -50px;
    background-color: rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 500px) {
    display: none;
  }
`;
export const SearchIcon = styled(BsSearch)`
  height: 20px;
  width: 20px;
  fill: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;
export const SearchBar = styled.input`
  background-color: white;
  padding: 10px 70px 10px 10px;
  outline: none;
  width: 100%;
  border: 0;
  border-radius: 5px;

  ~ svg {
    position: relative;
    left: -35px;
    z-index: 1;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 11pt;

  @media (max-width: 900px) {
    display: none;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
  }

  .userinfo_div {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

export const DropDownContainer = styled.div`
  position: relative;

  @media (max-width: 500px) {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 80px;
    left: 0;

    ${(props) => props.open ? `display: flex` : `display: none`}
  }
`;

export const DropDownMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  color: black;
  position: absolute;
  top: 85px;
  overflow: hidden;
  right: -30px;
  width: 300px;
  padding: 1rem 0;
  border-radius: 10px;
  transform: translateY(-20px);
  box-shadow: 0 10px 10px #666;

  @media (max-width: 500px) {
    position: relative;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    border-radius: 0;
    transform: none;
  }

  .cart-btn {
    display: flex;

    @media (min-width: 900px) {
      display: none;
    }
  }
`;

export const DropDownItem = styled.div`
  border-top: 1px solid #eeeeee;
  padding: 1rem;
  height: 50px;
  width: 100%;
  transition: 0.25s;
  cursor: pointer;

  :hover {
    background-color: #eeeeee;
  }
`;

export const ProfilePicture = styled.div`
  background-image: ${(props) => `url(${props.picture})`};
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  border: 3px solid var(--accent-color-hover);
  margin: 0 10px 0 0;
  width: 50px !important;
  height: 50px !important;
  flex-shrink: 0;
`;
export const UserProfile = styled.div`
  margin: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .wrapper {
    display: flex;
    flex-direction: column;

    h3 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 200px;
    }
  }
`;

export const CartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 20px 0 0;

  @media (max-width: 900px) {
    display: none;
  }

  svg {
    margin: 0 10px;
  }
`;

export const Menu = styled(HamburgerCollapse)`
  display: block;

  @media (min-width: 900px) {
    display: none;
  }
`;
