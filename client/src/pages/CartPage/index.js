import React, { useEffect, useState } from "react";
import Rating from "@material-ui/lab/Rating";
import { Container, CartContainer, Info, Row, StockInfo } from "./styles";

function CartCard(props) {
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [valid, setValid] = useState(true);

  function undoRemove() {
    setValid(!valid);
    fetch(`${process.env.REACT_APP_SERVER_URL}/cart/addToCart`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        productId: props.id,
        quantity: props.quantity,
      }),
    }).then(async (res) => {
      switch (res.status) {
        case 200:
          alert("Item adicionado novamente ao carrinho!", res);
          break;
      }
    });
  }

  function removeFromCart() {
    setValid(!valid);
    fetch(`${process.env.REACT_APP_SERVER_URL}/cart/removeFromCart?id=${props.id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then(async (res) => {
      let data = await res.json();
    });
  }

  return (
    <CartContainer>
      {valid ? (
        <>
          <Row>
            <img src={props.image[0].original}></img>
            <Info>
              <p>{props.title}</p>
              <sub>
                $ {props.price} {props.portion}x of {"$"}
                {(props.price / props.portion).toFixed(2)}
              </sub>
              <Rating
                name="half-rating"
                defaultValue={props.rating}
                size="small"
                precision={0.5}
                readOnly
              />
              <b>
                $ {props.deliveryPrice} to {props.cep}
              </b>
            </Info>
          </Row>
          <StockInfo>
            <input
              type="button"
              value="Remove"
              onClick={() => removeFromCart()}
            />
            <select
              defaultValue={
                props.quantity < props.countInStock
                  ? props.quantity
                  : props.countInStock
              }
            >
              {Array.from(Array(props.countInStock + 1).keys()).map((i) => {
                return <option value={i}>{i}</option>;
              })}
            </select>
            <sub>{props.countInStock} In Stock</sub>
          </StockInfo>
        </>
      ) : (
        <input onClick={() => undoRemove()} value="Undo" type="button" />
      )}
    </CartContainer>
  );
}

function CartPage() {
  const [logged, setLogged] = useState(false);
  const [cartData, setCartData] = useState({ data: [] });
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/cart/consultTheCart`, {
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
          setCartData({ data: data.product, data2: data.cart });
          setLogged(true);
          break;
      }
    });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/consult`, {
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
          setUserData(data);
          break;
      }
    });
  }, []);

  function getQuantity(id) {
    for (var i = 0; i < cartData.data2.length; i++) {
      var cartItem = cartData.data2[i];

      if (id === cartItem.id) {
        return cartItem.quantity;
      }
    }
  }

  return (
    <Container>
      {logged ? (
        <>
          {cartData.data.map((p) => {
            return (
              <CartCard
                image={p.image}
                title={p.name}
                price={p.price}
                portion={p.portion}
                rating={p.rating}
                deliveryPrice={p.deliveryPrice}
                quantity={getQuantity(p._id)}
                countInStock={p.countInStock}
                id={p._id}
                cep={userData.cep}
              />
            );
          })}
        </>
      ) : (
        <h1>You must be logged to use the cart</h1>
      )}
    </Container>
  );
}

export default CartPage;
