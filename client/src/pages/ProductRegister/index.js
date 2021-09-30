import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import UploadedImage from "../UserRegister/index";
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
  DropContainer,
  UploadMessage,
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
  const [pictureInfo, setPictureInfo] = useState({});

  function registerProduct() {
    const data = new FormData();

    data.append("name", name);
    data.append("description", desc);
    data.append("brand", brand);
    data.append("category", category);
    data.append("tags", ["test"]);
    data.append("countInStock", stock);
    data.append("deliveryPrice", delivery);
    data.append("price", price);
    data.append("quantity", 1);
    data.append("portion", portion);
    data.append("file", pictureInfo.file);

    fetch(`${process.env.REACT_APP_SERVER_URL}/product/register`, {
      method: "post",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: data,
    }).then(async (res) => {
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

  function renderDragMessage(isDragActive, isDragReject) {
    if (!isDragActive) {
      return <UploadMessage>Drag images here...</UploadMessage>;
    }

    if (isDragReject) {
      return <UploadMessage type="error">Invalid file type</UploadMessage>;
    }

    return <UploadMessage type="success">Drop it here</UploadMessage>;
  }

  function handleUpload(file) {
    file.map((item) => {
      setPictureInfo({
        file: item,
        name: item.name,
        preview: URL.createObjectURL(item),
      });
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
            <Dropzone accept="image/*" onDropAccepted={handleUpload}>
              {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragReject,
              }) => (
                <DropContainer
                  {...getRootProps()}
                  isDragActive={isDragActive}
                  isDragReject={isDragReject}
                >
                  <input {...getInputProps()} />
                  {renderDragMessage(isDragActive, isDragReject)}
                </DropContainer>
              )}
            </Dropzone>
            {/* {pictureInfo.name != null && (
              <UploadedImage
                preview={pictureInfo.preview}
                name={pictureInfo.name}
              ></UploadedImage>
            )} */}
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
