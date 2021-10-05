import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;
export const CartContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  margin: 5px;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 12px;

  input {
    width: 100%;
    padding: 0.5rem;
    margin: 10px;
    border-radius: 12px;
    outline: none;
    font-weight: 900;
    color: white;
    background-color: var(--accent-color);
    border: none;
    cursor: pointer;
    transition: 0.2s;
  }

  @media (max-width: 900px) {
    width: 98%;
  }

  @media (max-width: 500px) {
    width: 100%;
    flex-direction: column;
    height: auto;
  }

  img {
    width: 80px;
    height: 80px;
  }

  select {
    margin: 0 10px;
    padding: 5px;
    height: 40px;
    border-radius: 5px;
    border: none;
    outline: none;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;

  p {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const BuyNowBtn = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  margin: 10px 0;
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

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StockInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  sub {
    white-space: nowrap;
  }
`;

export const FinalInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0;
  padding: 20px;
`;
