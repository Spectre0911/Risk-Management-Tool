const loginReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("IN HERE");
      return { ...state, email: action.payload };
    case "LOGOUT":
      return { email: "" };
    default:
      return state;
  }
};
export default loginReducer;
