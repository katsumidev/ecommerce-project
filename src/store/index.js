import { createStore } from "redux";

const INITIAL_STATE = {
  user_data: {
    logged_in: false,
    username: "",
    email: "",
    picture:
      "https://i.pinimg.com/736x/6e/9c/03/6e9c03cad3121536889d9baff0b4c99b.jpg",
  },
};

function user_reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user_data: {
          logged_in: true,
          username: action.username,
          email: action.email,
        },
      };
    default:
      return state;
  }
}

const store = createStore(user_reducer);

export default store;
