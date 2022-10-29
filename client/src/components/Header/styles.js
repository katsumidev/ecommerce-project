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
  height: 50px;
  width: 100vw;
  padding: 15px 30px;
  background-color: var(--secundary-background);
  z-index: 999;

  img {
    cursor: pointer;
  }

  @media (max-width: 500px) {
    padding: 16px;
  }
`;

export const LocationInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-direction: row;

  @media (max-width: 900px) {
    display: none;
  }

  div p {
    font-size: 0.8rem;
  }

  h3 {
    font-size: 0.8rem;
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

export const LocationDropDownContainer = styled.div`
  position: relative;

  ${(props) => (props.locationOpen ? `display: flex` : `display: none`)}
`;

export const LocationDropDown = styled.div`
  width: 150px;
  position: absolute;
  background-color: white;
  top: 60px;
  left: -60px;
  height: 40px;
  overflow: hidden;
  padding: 0.5rem 0;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform: translateY(-30px);
  box-shadow: 0 2px 5px #666;
  animation: openLocation ease-in 0.2s;

  @keyframes openLocation {
    0% {
      opacity: 0;
      height: 0;
    }
    100% {
      opacity: 1;
      height: 40px;
    }
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

    ${(props) => (props.open ? `display: flex` : `display: none`)}
  }
`;

export const DropDownMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  color: black;
  position: absolute;
  top: 70px;
  width: 300px;
  overflow: hidden;
  right: -20px;
  padding: 1rem 0;
  border-radius: 10px;
  transform: translateY(-30px);
  box-shadow: 0 10px 10px #666;
  animation: open ease-in 0.3s;

  @keyframes open {
    0% {
      height: 0px;
      opacity: 0;
    }
    100% {
      height: 400px;
      opacity: 1;
    }
  }

  @media (max-width: 500px) {
    position: relative;
    width: 100%;
    height: 100%;
    top: -30px;
    right: 0;
    border-radius: 0;
    transform: none;
    background-color: var(--secundary-background);
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

  @media (max-width: 500px) {
    border-top: 1px solid var(--accent-color);
  }

  :hover {
    background-color: #eeeeee;

    @media (max-width: 500px) {
      background-color: var(--accent-color-hover);
      color: white;
    }
  }
`;

export const ProfilePicture = styled.div`
  background-image: ${(props) => `url(${props.picture})`};
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  border: 3px solid var(--mainText);
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

    a {
      color: var(--accent-color);
    }
  }
`;

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 20px;
`;

export const Menu = styled(HamburgerCollapse)`
  margin-top: 2px;
  padding: 0;
  color: var(--mainText);
`;
