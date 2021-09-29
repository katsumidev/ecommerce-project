import styled from "styled-components";

export const Container = styled.div``;
export const ProductList = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    li {
      margin: 10px;
    }
  }
`;
