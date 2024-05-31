let globalValue = false;

export const getGlobalValue = () => globalValue;

export const setGlobalValue = (newValue) => {
  globalValue = newValue;
};