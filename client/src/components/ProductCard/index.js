import React from "react";

import { Container, ProductInfo, PriceInfo, AboutInfo } from "./styles";

function ProductCard(props) {
  return (
    <Container onClick={() => props.redirect()}>
      <img src={props.imgsrc} />
      <ProductInfo>
        <PriceInfo>
          <h3>{props.price}</h3>
          <sub>
            <p>{props.portion}</p>
          </sub>
        </PriceInfo>
        <AboutInfo>
          <div>
            <a>{props.title}</a>
          </div>
          <sub>
            <p>{props.brand}</p>
          </sub>
        </AboutInfo>
      </ProductInfo>
    </Container>
  );
}

export default ProductCard;
