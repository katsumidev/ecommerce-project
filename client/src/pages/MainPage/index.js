import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { Container, ProductList } from "./styles";
import { Redirect } from "react-router";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const [products, setProducts] = useState({ data: [] });
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/product/consult", {
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
          setProducts({ data: data });
          setLogged(!logged);
          break;
      }
    });
  }, []);

  return (
    <Container>
      <ProductList>
        {logged ? (
          <ul>
            {products.data.map((p) => {
              return (
                <li>
                  <ProductCard
                    key={p._id}
                    redirect={() => navigate(`/product/${p._id}`)}
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
          </ul>
        ) : (
          <>
            <h1>Não logado</h1>
          </>
        )}
      </ProductList>
    </Container>
  );
}

export default MainPage;
