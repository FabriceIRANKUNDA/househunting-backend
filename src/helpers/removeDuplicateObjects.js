const removeDuplicateObjects = (data, key) => {
  return [...new Map(data.map((obj) => [key(obj), obj])).values()];
};

export default removeDuplicateObjects;
