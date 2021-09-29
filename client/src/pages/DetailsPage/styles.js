import styled from "styled-components";
import ReactImageMagnify from "react-image-magnify";

export const Container = styled.div`
  display: grid;
  padding: 26px;
  border-radius: 12px;
  max-width: 1300px;
  background-color: white;
  margin: 20px auto;
  grid-template-columns: 500px auto 320px;
  grid-template-rows: 470px auto auto;
  grid-template-areas:
    "picture productinfo sellerinfo"
    "productdescription productdescription sellerinfo"
    "recommended recommended .";

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const PictureWrapper = styled.div`
  display: flex;
  align-items: center;
  grid-area: picture;

  .large-image {
    z-index: 998;
  }
`;
export const ProductInfo = styled.div`
  grid-area: productinfo;
  padding: 0 15px 0 0;

  @media (max-width: 1000px) {
    margin: 20px 0;
  }

  h2 {
    margin-bottom: 10px;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  h1 {
    margin-top: 40px;
  }

  hr {
    margin: 20px 0;
  }

  ul {
    list-style: none;

    li {
      margin: 20px 0;
    }
  }
`;
export const SellerInfoWrapper = styled.div`
  background-color: white;
  grid-area: sellerinfo;

  @media (max-width: 1000px) {
    display: flex;
    width: 100%;
  }
`;

export const SellerInfo = styled.div`
  width: 98%;
  padding: 16px;
  height: 100%;
  border: 1.5px solid #eeeeee;
  border-radius: 12px;
  font-size: 11pt;

  ul {
    list-style: none;
  }

  ul li {
    display: flex;
    align-items: center;
    margin: 20px 10px;

    select {
      margin: 0 10px;
      padding: 5px;
      border-radius: 5px;
      border: none;
      outline: none;
    }
  }

  p a {
    font-weight: 900;
    color: var(--accent-color);
  }
`;

export const Description = styled.div`
  grid-area: productdescription;
  width: 90%;
  margin: 60px 0 40px 0;

  @media (max-width: 1000px) {
    width: 98%;
  }
`;

export const Picture = styled(ReactImageMagnify)`
  height: 450px;
  width: 450px;
`;

export const MobilePicture = styled.img`
  width: 100%;
`;

export const DeliveryInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  word-break: break-all;

  p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  svg {
    margin-right: 10px;
  }
`;

export const Delivery = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BuyNowBtn = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  outline: none;
  font-weight: 900;
  color: white;
  background-color: var(--accent-color);
  border: none;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    background-color: var(--accent-color-hover);
  }
`;

export const AddToCartBtn = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  outline: none;
  font-weight: 900;
  border: none;
  background-color: rgba(128, 93, 147, 0.5);
  cursor: pointer;
  transition: 0.2s;

  margin: 10px 0;

  :hover {
    background-color: rgba(128, 93, 147, 0.7);
  }
`;

export const BuyBtns = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SimilarProducts = styled.div`
  width: 98%;

  @media (min-width: 1000px) {
    grid-area: recommended;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
`;

export const ProductsList = styled.ul`
  display: flex;
  list-style: none;
  flex-direction: row;
  margin: 20px 0;
  background-color: #eeeeee;
  padding: 16px;
  max-width: 900px;
  border-radius: 12px;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;

  li {
    margin: 0 10px;
  }
`;
