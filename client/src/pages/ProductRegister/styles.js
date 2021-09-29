import styled from "styled-components";
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
`;

export const ProductRegisterInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 10px;
  border-radius: 12px;
  outline: none;
  background-color: transparent;
  border: 2px solid var(--accent-color);
`;

export const NumberInput = styled(InputNumber)`
  width: 100%;
  padding: 0.5rem;
  margin: 10px;
  border-radius: 12px;
  outline: none;
  background-color: transparent;
  border: 2px solid var(--accent-color);
`;

export const ProductRegisterSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin: 10px;
  border-radius: 12px;
  outline: none;
  background-color: transparent;
  border: 2px solid var(--accent-color);
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;

  p {
    font-size: 9pt;
    align-self: flex-start;
    margin: 10px 0 -8px 10px;
  }
`;

export const FinishBtn = styled.input`
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

export const InformationWrapper = styled.div``;
