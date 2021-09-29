import React, { useEffect, useState } from "react";

import {
  Container,
  ProductRegisterInput,
  ProductRegisterSelect,
  ProductRegisterWrapper,
  Row,
  Column,
  NumberInput,
  InformationWrapper,
  FinishBtn,
} from "./styles";

function ProductRegister() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [stock, setStock] = useState(0);
  const [delivery, setDelPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [portion, setPortion] = useState(0);

  function registerProduct() {
    fetch("http://localhost:3001/product/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        name: name,
        description: desc,
        brand: brand,
        category: category,
        tags: ["fl"],
        countInStock: stock,
        deliveryPrice: delivery,
        price: price,
        portion: portion,
      }),
    }).then(async (res) => {
      let data = await res.json();

      switch (res.status) {
        case 404:
          console.log("Usuário não encontrado");
          break;
        case 403:
          console.log("Senha inválida");
          break;
        case 200:
          alert("Produto cadastrado!");
          window.location.href = "/";
          break;
      }
    });
  }

  return (
    <Container>
      <ProductRegisterWrapper>
        <h1>Register your product</h1>

        <Row>
          <Column>
            <p>Name</p>
            <ProductRegisterInput onChange={(e) => setName(e.target.value)} />
            <p>Description</p>
            <ProductRegisterInput onChange={(e) => setDesc(e.target.value)} />
            <p>Brand</p>
            <ProductRegisterInput onChange={(e) => setBrand(e.target.value)} />
            <p>Category</p>
            <ProductRegisterSelect
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Cars">Cars</option>
              <option value="Eletro">Eletrodomestic</option>
            </ProductRegisterSelect>
            <p>Tags</p>
            <ProductRegisterInput />
          </Column>
          <Column>
            <p>Initial Stock</p>
            <NumberInput onChange={setStock} enableMobileNumericKeyboard />
            <p>Delivery Price</p>
            <NumberInput onChange={setDelPrice} enableMobileNumericKeyboard />
            <p>Price</p>
            <NumberInput onChange={setPrice} enableMobileNumericKeyboard />
            <p>Portion</p>
            <ProductRegisterSelect
              onChange={(e) => setPortion(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((data) => (
                <option value={data}>{data}</option>
              ))}
            </ProductRegisterSelect>
          </Column>
        </Row>
        <InformationWrapper>
          <FinishBtn
            type="button"
            value="Finish"
            onClick={() => registerProduct()}
          />
        </InformationWrapper>
      </ProductRegisterWrapper>
    </Container>
  );
}

export default ProductRegister;
