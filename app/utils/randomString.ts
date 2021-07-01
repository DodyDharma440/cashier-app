export const getRandomStr = () => {
  const length = 6;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomStr = "";

  for (let i = 0, n = charset.length; i < length; ++i) {
    randomStr += charset.charAt(Math.floor(Math.random() * n));
  }

  return randomStr;
};
