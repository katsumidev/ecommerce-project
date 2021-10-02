import styled, { css } from "styled-components";
import CurrencyInput from "react-currency-input-field";
import InputNumber from "react-input-number";

export const Container = styled.div``;

export const ProductRegisterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 26px;
  border-radius: 12px;
  max-width: 1300px;
  background-color: white;
  margin: 20px auto;

  .ReactTags__tags {
    position: relative;
  }

  .ReactTags__tagInput {
    width: 100%;
    border-radius: 2px;
    display: inline-block;
    outline: none;
  }
  .ReactTags__tagInput input.ReactTags__tagInputField,
  .ReactTags__tagInput input.ReactTags__tagInputField:focus {
    width: 100%;
    padding: 1rem;
    margin: 10px 0;
    border-radius: 12px;
    outline: none;
    background-color: transparent;
    border: 2px solid var(--accent-color);
  }

  .ReactTags__selected span.ReactTags__tag {
    background: var(--accent-color);
    color: white;
    font-size: 12px;
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: fit-content;

    padding: 10px;
    margin: 5px;
    border-radius: 2px;
  }
  .ReactTags__selected a.ReactTags__remove {
    color: #aaa;
    margin-left: 5px;
    cursor: pointer;
  }

  .ReactTags__suggestions {
    position: absolute;
  }
  .ReactTags__suggestions ul {
    list-style-type: none;
    box-shadow: 0.05em 0.01em 0.5em rgba(0, 0, 0, 0.2);
    background: white;
    width: 200px;
  }
  .ReactTags__suggestions li {
    border-bottom: 1px solid #ddd;
    padding: 5px 10px;
    margin: 0;
  }
  .ReactTags__suggestions li mark {
    text-decoration: underline;
    background: none;
    font-weight: 600;
  }
  .ReactTags__suggestions ul li.ReactTags__activeSuggestion {
    background: #b7cfe0;
    cursor: pointer;
  }

  .ReactTags__remove {
    border: none;
    cursor: pointer;
    background: none;
    margin: 0 0 0 10px;
    color: white;
  }
`;

export const CustomHr = styled.div`
  height: 1px;
  background-color: #eeeeee;
  width: 100%;
  margin: 20px 0;
`;

export const ProductRegisterInput = styled.input`
  width: 100%;
  padding: 1rem;
  margin: 10px 0;
  border-radius: 12px;
  outline: none;
  background-color: transparent;
  border: 2px solid var(--accent-color);
`;

export const NumberInput = styled(InputNumber)`
  width: 100%;
  padding: 1rem;
  margin: 10px 0;
  border-radius: 12px;
  outline: none;
  background-color: transparent;
  border: 2px solid var(--accent-color);
`;

export const PriceInput = styled(CurrencyInput)`
  width: 100%;
  padding: 1rem;
  margin: 10px 0;
  border-radius: 12px;
  outline: none;
  background-color: transparent;
  border: 2px solid var(--accent-color);
`;

export const ProductRegisterSelect = styled.select`
  width: 100%;
  padding: 1rem;
  margin: 10px 0;
  border-radius: 12px;
  outline: none;
  background-color: transparent;
  border: 2px solid var(--accent-color);
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;

  @media (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: auto;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 100%;

  p {
    font-size: 9pt;
    align-self: flex-start;
    margin: 10px 0 -8px 10px;
  }
`;

export const FinishBtn = styled.input`
  width: 100px;
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
  margin: 10px 0;
  width: 300px;
  height: 150px;
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    width: 100%;
  }

  p {
    color: gray;
  }

  transition: height 0.2s ease;
  ${(props) => props.isDragActive && dragActive};
  ${(props) => props.isDragReject && dragReject};
`;

export const InformationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const ImageContainer = styled.div`
  display: flex;
  margin: 10px;
  align-items: center;
`;

export const Preview = styled.img`
  max-width: 200px;
  height: 150px;
  border-radius: 8px;
`;
