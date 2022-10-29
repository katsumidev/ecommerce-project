import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { AiFillCamera } from "../../styles/Icons";
import { uniqueId } from "lodash";
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

function FileList({ files }) {
  return (
    <ImageContainer>
      {files.map((uploadedFile) => (
        <li>
          <Preview src={uploadedFile.preview} />
        </li>
      ))}
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
  const [pictureInfo, setPictureInfo] = useState([]);

  function registerProduct() {
    var tags_array = [];
    var imgs_array = [];

    tags.map((i) => {
      tags_array.push(i.text);
    });

    pictureInfo.map((item) => {
      const img_data = new FormData();

      img_data.append("file", item.file);

      fetch(`${process.env.REACT_APP_SERVER_URL}/product/imageupl`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: img_data,
      }).then(async (res) => {
        let data = await res.text();

        switch (res.status) {
          case 200:
            imgs_array.push({
              original: `${process.env.REACT_APP_SERVER_URL}/files/${data}`,
              thumbnail: `${process.env.REACT_APP_SERVER_URL}/files/${data}`,
            });
            break;
          case 400:
            alert("Ocorreu um erro no processamento da imagem!");
          break;
        }
      });
    });

    setTimeout(function () {
      fetch(`${process.env.REACT_APP_SERVER_URL}/product/register`, {
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
          tags: tags_array,
          countInStock: stock,
          deliveryPrice: delivery,
          price: price,
          portion: portion,
          images: imgs_array,
        }),
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
    }, 3000);
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

  function handleUpload(files) {
    files.map((item) => {
      setPictureInfo([
        ...pictureInfo,
        {
          file: item,
          id: uniqueId(),
          name: item.name,
          preview: URL.createObjectURL(item),
        },
      ]);
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
              <option value="Videogames">Videogames</option>
              <option value="Eletrodomestics">Eletrodomestics</option>
              <option value="Pets">Pets</option>
              <option value="Music">Music</option>
              <option value="Sports">Sports</option>
              <option value="Clothing and accessories">Clothing and accessories</option>
              <option value="Bikes">Bikes</option>
              <option value="Forniture">Forniture</option>
              <option value="Forniture">Books</option>
              <option value="Forniture">Study</option>
              <option value="Forniture">DIY</option>
              <option value="Other">Other</option>
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
              {!!pictureInfo.length && (
                <FileList files={pictureInfo}></FileList>
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
           {/* <FinishBtn
            type="button"
            value="Finish"
            onClick={() => alert("Essa função só está disponivel na branch de desenvolvimento")}
          />  */}
        </InformationWrapper>
      </ProductRegisterWrapper>
    </Container>
  );
}

export default ProductRegister;
