const formatSelectedKeys = (keysSet: any) => {
  return Array.from(keysSet).join(", ").replaceAll(" ", " ");
};

export default formatSelectedKeys;
