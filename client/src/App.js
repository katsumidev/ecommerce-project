import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./store";
import GlobalStyles from "./styles/GlobalStyles";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import DetailsPage from "./pages/DetailsPage";
import CartPage from "./pages/CartPage";
import ProductRegister from "./pages/ProductRegister";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route exact path="/product/:productId" element={<DetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/register" element={<ProductRegister />} />
        </Routes>
      </BrowserRouter>
      <GlobalStyles />
    </Provider>
  );
}

export default App;
