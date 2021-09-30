import React, { useState } from "react";
import {
  Container,
  RegisterWrapper,
  RegisterInput,
  RegisterButton,
  NumberInput,
  DropContainer,
  UploadMessage,
  ImageContainer,
  Preview,
} from "./styles";
import Dropzone from "react-dropzone";

function UploadedImage(props) {
  return (
    <ImageContainer>
      <Preview src={props.preview} />
      <p>{props.name}</p>
    </ImageContainer>
  );
}

function UserRegister() {
  const [name, setName] = useState("");
  const [pictureInfo, setPictureInfo] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cep, setCEP] = useState(0);

  function createUserAccount() {
    const data = new FormData();

    data.append("file", pictureInfo.file);
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("cep", cep);

    if (
      cep != null &&
      name != null &&
      email != null &&
      pictureInfo.file != null &&
      password != null
    ) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/auth/register`, {
        method: "post",
        headers: {
          Accept: "application/json",
        },
        body: data,
      }).then(async (res) => {
        let data = await res.json();

        switch (res.status) {
          case 200:
            if (data.token) {
              alert("conta criada com sucesso!");
              localStorage.setItem("access_token", data.token);
              window.location.href = "/";
            }
            break;
        }
      });
    } else {
      alert("campo faltando");
    }
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
      <RegisterWrapper>
        <p>Seu nome</p>
        <RegisterInput type="text" onChange={(e) => setName(e.target.value)} />
        <p>Seu email</p>
        <RegisterInput type="text" onChange={(e) => setEmail(e.target.value)} />
        <p>Sua senha</p>
        <RegisterInput
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>Seu CEP</p>
        <NumberInput onChange={setCEP} enableMobileNumericKeyboard />
        <Dropzone accept="image/*" onDropAccepted={handleUpload}>
          {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
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
        {pictureInfo.name != null && (
          <UploadedImage
            preview={pictureInfo.preview}
            name={pictureInfo.name}
          ></UploadedImage>
        )}
        <RegisterButton
          type="button"
          value="Criar conta"
          onClick={() => createUserAccount()}
        />
      </RegisterWrapper>
    </Container>
  );
}

export default UserRegister;
