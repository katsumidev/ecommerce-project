import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsGeoAlt, RiTruckLine } from "../../styles/Icons";
import Rating from "@material-ui/lab/Rating";
import cep from "cep-promise";
import ProductCard from "../../components/ProductCard";
import {
  Container,
  PictureWrapper,
  ProductInfo,
  SellerInfoWrapper,
  SellerInfo,
  Picture,
  DeliveryInfo,
  BuyNowBtn,
  AddToCartBtn,
  Delivery,
  Description,
  BuyBtns,
  SimilarProducts,
  ProductsList,
  MobilePicture,
} from "./styles";

function DetailsPage() {
  const [productData, setProductData] = useState({});
  const [similarProducts, setSimilarProducts] = useState({ data: [] });
  const [logged, setLogged] = useState(false);
  const [userData, setUserData] = useState({});
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1000);
  const [locationInfo, setLocationInfo] = useState({});
  const [buyQuantity, setBuyQuantity] = useState(1);
  const { productId } = useParams();

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1000);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  useEffect(() => {
    fetch(`http://localhost:3001/product/consult?id=${productId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(async (res) => {
      let data = await res.json();

      switch (res.status) {
        case 404:
          alert("Produto não encontrado");
          break;
        case 200:
          setProductData(data);
          break;
      }
    });
  }, []);

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
    fetch(
      `http://localhost:3001/product/consult_similar_products?category=${productData.category}&id=${productId}`,
      {
        method: "get",
      }
    ).then(async (res) => {
      let data = await res.json();

      switch (res.status) {
        case 200:
          setSimilarProducts({ data: data });
          break;
      }
    });
  }, [productData]);

  function addToCart() {
    if (logged) {
      fetch("http://localhost:3001/cart/addToCart", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          productId: productId,
          quantity: buyQuantity,
        }),
      }).then(async (res) => {
        switch (res.status) {
          case 200:
            alert("Item adicionado ao carrinho!", res);
            break;
        }
      });
    } else {
      alert("Logue para usar o carrinho!");
    }
  }

  useEffect(() => {
    cep(userData.cep).then((res) => {
      setLocationInfo(res);
    });
  }, [userData]);

  return (
    <Container>
      <PictureWrapper>
        {isDesktop ? (
          <Picture
            enlargedImageContainerClassName="large-image"
            hoverDelayInMs={0}
            {...{
              smallImage: {
                src: productData.image,
                width: 480,
                height: 480,
              },
              largeImage: {
                src: productData.image,
                width: 1200,
                height: 1800,
              },
            }}
          />
        ) : (
          <MobilePicture src={productData.image} />
        )}
      </PictureWrapper>
      <ProductInfo>
        <h2>{productData.name}</h2>
        <Rating
          name="half-rating"
          defaultValue={productData}
          size="medium"
          precision={0.5}
          readOnly
        />
        <h1>$ {productData.price}</h1>
        <h4>{`+ ${productData.portion}x $${(
          productData.price / productData.portion
        ).toFixed(2)}`}</h4>
        <hr />
        <ul>
          <li>
            <strong>Brand: </strong>
            <span>{productData.brand}</span>
          </li>
          <li>
            <strong>Category: </strong>
            <span>{productData.category}</span>
          </li>
          <li>
            <strong>Tags: </strong>
            {productData.tags != undefined ? (
              productData.tags.map((t, index) => {
                return <span key={`${index}`}>{(index ? ", " : "") + t}</span>;
              })
            ) : (
              <></>
            )}
          </li>
        </ul>
      </ProductInfo>
      <SellerInfoWrapper>
        <SellerInfo>
          <ul>
            <li>
              <h2>$ {productData.price}</h2>
            </li>
            <li>
              {productData.deliveryPrice > 0 ? (
                <DeliveryInfo>
                  <RiTruckLine size={25} />
                  <p>Shipping price: $ {productData.deliveryPrice}</p>
                </DeliveryInfo>
              ) : (
                <DeliveryInfo>
                  <RiTruckLine size={25} fill="#d7263d" />
                  <p>
                    Shipping <a>FREE</a>
                  </p>
                </DeliveryInfo>
              )}
            </li>
            <li>
              <DeliveryInfo>
                <BsGeoAlt size={20} />
                {logged ? (
                  <Delivery>
                    {userData.cep ? (
                      <>
                        <p>Deliver to {userData.name},</p>
                        <p>
                          <b>{locationInfo.city}</b> {locationInfo.cep}
                        </p>
                      </>
                    ) : (
                      <p>You need to register an address!</p>
                    )}
                  </Delivery>
                ) : (
                  <p>
                    <Link to="/login">Login or register!</Link>
                  </p>
                )}
              </DeliveryInfo>
            </li>
            <li>
              {productData.countInStock > 0 ? (
                <h2>In Stock!</h2>
              ) : (
                <h2>Out of Stock.</h2>
              )}
            </li>
            <li>
              {productData.countInStock > 0 ? (
                <>
                  <strong>Quantity:</strong>
                  <select
                    onChange={(e) => setBuyQuantity(parseInt(e.target.value))}
                    className="quantity"
                  >
                    {Array.from(Array(productData.countInStock).keys()).map(
                      (i) => {
                        return i > 0 && i < 6 && <option value={i}>{i}</option>;
                      }
                    )}
                  </select>
                  <sub>({productData.countInStock} in stock!)</sub>
                </>
              ) : (
                <></>
              )}
            </li>
            <li>
              <BuyBtns>
                <BuyNowBtn type="button" value="Buy Now" />
                <AddToCartBtn
                  type="button"
                  value="Add to Cart"
                  onClick={() => addToCart()}
                />
              </BuyBtns>
            </li>
          </ul>
        </SellerInfo>
      </SellerInfoWrapper>
      <Description>{productData.description}</Description>
      <SimilarProducts>
        <h3>Similar products you may like:</h3>
        <ProductsList>
          {similarProducts.data.slice(0, 4).map((p) => {
            return (
              <li>
                <ProductCard
                  key={p._id}
                  redirect={() => (window.location.href = p._id)}
                  imgsrc={p.image}
                  title={p.name}
                  brand={p.brand}
                  price={`R$ ${p.price}`}
                  portion={`${p.portion}x R$${(p.price / p.portion).toFixed(
                    2
                  )} sem juros`}
                />
              </li>
            );
          })}
        </ProductsList>
      </SimilarProducts>
    </Container>
  );
}

export default DetailsPage;
