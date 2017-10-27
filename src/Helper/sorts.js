exports.sortObject = (object, direction) => {
  let returnObj = {};

  let sortArray = Object.keys(object).sort((a, b) => {
    return object[b] - object[a];
  });

  if (direction === "desc") {
    sortArray.slice(0, 2).map(item => {
      returnObj[item] = object[item];
      return null;
    });

    return returnObj;
  } else if (direction === "asc") {
    sortArray
      .reverse()
      .slice(0, 2)
      .map(item => {
        returnObj[item] = object[item];
        return null;
      });

    return returnObj;
  }
};
