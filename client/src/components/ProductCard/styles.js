import styled from "styled-components";

export const Container = styled.div`
  min-width: 200px;
  max-width: 200px;
  height: 350px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  align-items: flex-start;
  word-break: break-all;
  cursor: pointer;

  img {
    width: 100%;
    height: 200px;
    margin: 0 auto;
    border-radius: 7px;
    border-bottom: 1px solid rgb(0, 0, 0, 0.1);
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 10px;
  width: 100%;

  sub p {
    font-weight: 500;
  }
`;

export const PriceInfo = styled.div`
  margin-top: 10px;
`;

export const AboutInfo = styled.div`
  margin-top: 15px;

  div {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  div a {
    font-size: 11pt;
    cursor: pointer;

    :hover {
      color: var(--accent-color-hover);
      text-decoration: underline;
    }
  }

  sub p {
    font-size: 9pt;
    color: gray;
    margin: 5px 0;
    text-transform: uppercase;
  }
`;
