export const removePrivateFields = (object) => Object.keys(object)
  .filter(key => !key.startsWith('_'))
  .reduce((result, k) => {
    result[k] = object[k];
    return result;
  }, {});
