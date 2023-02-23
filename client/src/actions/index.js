export const loginAction = (userEmail) => {
  return { type: "LOGIN", payload: { email: userEmail } };
};
