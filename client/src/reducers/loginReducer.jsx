const loginReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return { email: action.payload };
    case "LOGOUT":
      return { email: "" };
    default:
      return state;
  }
};
export default loginReducer;
