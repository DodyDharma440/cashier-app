type SetCookie = {
  name: string;
  value: string;
  days: number;
};

export const setCookie = ({ name, value, days }: SetCookie) => {
  let expires = "";

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${value || ""}${expires}; path=/`;
};

export const getCookie = (name: string) => {
  const nameEQ = `${name}=`;
  const ca: any = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return ca;
};

export const deleteCookie = (name: string) => {
  const date = new Date();

  date.setTime(date.getTime());
  document.cookie = `${name}=; expires=${date.toUTCString()}; path=/`;
};
