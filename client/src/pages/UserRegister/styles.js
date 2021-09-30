import styled, { css } from "styled-components";
import InputNumber from "react-input-number";

export const Container = styled.div``;
export const RegisterWrapper = styled.div`
  width: 400px;
  background-color: white;
  border-radius: 12px;
  margin: 5% auto;
  display: flex;
  padding: 50px;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 500px) {
    width: 100%;
    height: auto;
  }

  p {
    font-size: 9pt;
    align-self: flex-start;
    margin: 10px 0 -8px 10px;
  }
`;
export const RegisterInput = styled.input`
  width: 100%;
  padding: 1rem;
  margin: 10px;
  border-radius: 12px;
  outline: none;
  background-color: transparent;
  border: 2px solid var(--accent-color);
`;

export const NumberInput = styled(InputNumber)`
  width: 100%;
  padding: 1rem;
  margin: 10px;
  border-radius: 12px;
  outline: none;
  background-color: transparent;
  border: 2px solid var(--accent-color);
`;

export const RegisterButton = styled.input`
  width: 100%;
  padding: 1rem;
  margin: 8px;
  border-radius: 12px;
  outline: none;
  font-weight: 900;
  color: white;
  background-color: var(--accent-color);
  border: none;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    background-color: var(--accent-color-hover);
  }
`;

const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: #e57878;
`;

const messageColors = {
  default: "#999",
  error: "#e57878",
  success: "#78e5d5",
};

export const UploadMessage = styled.h5`
  display: flex;
  color: ${(props) => messageColors[props.type || "default"]};
  justify-content: center;
  align-items: center;
`;

export const DropContainer = styled.div`
  padding: 20px;
  margin: 20px;
  width: 100%;
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: height 0.2s ease;
  ${(props) => props.isDragActive && dragActive};
  ${(props) => props.isDragReject && dragReject};
`;

export const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 10px;
  align-items: center;
`;

export const Preview = styled.img`
  width: 50px;
  height: 50px;
`;
