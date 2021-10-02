import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { AiFillCamera } from "../../styles/Icons";
import { WithContext as ReactTags } from "react-tag-input";
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
  ImageContainer,
  PriceInput,
  CustomHr,
  Preview,
} from "./styles";

function UploadedImage(props) {
  return (
    <ImageContainer>
      <Preview src={props.preview} />
      <p>{props.name}</p>
    </ImageContainer>
  );
}

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
    var tags_array = [];

    tags.map((i) => {
      tags_array.push(i.text);
    });

    data.append("name", name);
    data.append("description", desc);
    data.append("brand", brand);
    data.append("category", category);
    data.append("tags", JSON.stringify(tags_array));
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
      return <UploadMessage>Drag a image to here...</UploadMessage>;
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

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  return (
    <Container>
      <ProductRegisterWrapper>
        <CustomHr />
        <h1>Sell your item now!</h1>
        <Row>
          <Column>
            <ProductRegisterInput
              type="textbox"
              placeholder="Product Title*"
              onChange={(e) => setName(e.target.value)}
            />
            <ProductRegisterInput
              placeholder="Product Description*"
              onChange={(e) => setDesc(e.target.value)}
            />
            <ProductRegisterInput
              placeholder="Product Brand*"
              onChange={(e) => setBrand(e.target.value)}
            />
            <p>Category</p>
            <ProductRegisterSelect
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Cars">Cars</option>
              <option value="Eletro">Eletrodomestic</option>
            </ProductRegisterSelect>
            <p>Tags</p>
            <ReactTags
              tags={tags}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              handleTagClick={handleTagClick}
              inputFieldPosition="top"
              autocomplete
            />
            <Row>
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
                    <AiFillCamera size={30} />
                    <input {...getInputProps()} />
                    {renderDragMessage(isDragActive, isDragReject)}
                  </DropContainer>
                )}
              </Dropzone>
              {pictureInfo.name != null && (
                <UploadedImage preview={pictureInfo.preview}></UploadedImage>
              )}
            </Row>
          </Column>
          <Column>
            <NumberInput
              placeholder="Initial Stock*"
              onChange={setStock}
              enableMobileNumericKeyboard
            />
            <p>Delivery Price</p>
            <PriceInput
              defaultValue={0}
              intlConfig={{ locale: "en-US", currency: "USD" }}
              onValueChange={(value, name) => setDelPrice(value)}
            />
            <p>Price</p>
            <PriceInput
              defaultValue={0}
              intlConfig={{ locale: "en-US", currency: "USD" }}
              onValueChange={(value, name) => setPrice(value)}
            />
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
