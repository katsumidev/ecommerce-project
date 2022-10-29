import React from "react";

import {
  Container,
  ProductInfo,
  PriceInfo,
  AboutInfo,
  ImageContainer,
} from "./styles";

function ProductCard(props) {
  return (
    <Container onClick={() => props.redirect()}>
      <ImageContainer>
        <img src={props.imgsrc} />
      </ImageContainer>
      <ProductInfo>
        <AboutInfo>
          <div>
            <a>{props.title}</a>
          </div>
          <sub>
            <p>{props.brand}</p>
          </sub>
        </AboutInfo>
        <PriceInfo>
          <h3>{props.price}</h3>
          <sub>
            <p>{props.portion}</p>
          </sub>
        </PriceInfo>
      </ProductInfo>
    </Container>
  );
}

export default ProductCard;
