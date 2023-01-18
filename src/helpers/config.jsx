/** header untuk public api */
export const publicHeader = () => {
  return {
    // "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };
};

/** header untuk api dengan autentikasi token */
export const tokenHeader = () => {
  return {
    // "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
};
export const url = {
  app: "http://localhost:3006",
  api: 'http://localhost:5000',
};
