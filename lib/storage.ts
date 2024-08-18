export const setItem = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, value);
  }
};

export const getItem = (key: string) => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(key);
  }
};

export const removeItem = (key: string) => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(key);
  }
};

export const clear = () => {
  if (typeof window !== "undefined") {
    window.localStorage.clear();
  }
};
