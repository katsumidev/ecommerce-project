import styled from "styled-components";

export const Container = styled.div`
  max-width: 300px;
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  align-items: flex-start;
  word-break: break-all;
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  max-width: 300px;
  max-height: 300px;
  height: auto;
  width: auto;

  img {
    width: 100%;
    height: 100%;
    border-radius: 2px;
    border-bottom: 1px solid rgb(0, 0, 0, 0.1);
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-top: 7px;
  width: 100%;

  sub p {
    font-weight: 500;
  }
`;

export const PriceInfo = styled.div`
  margin-top: 10px;
`;

export const AboutInfo = styled.div`
  width: 70%;

  div {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  div a {
    font-size: 0.9rem;
    font-weight: 900;
    text-transform: capitalize;
    cursor: pointer;
  }

  sub p {
    font-size: 9pt;
    color: gray;
    margin: 5px 0;
    text-transform: uppercase;
  }
`;
