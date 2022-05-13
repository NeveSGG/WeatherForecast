import memoize from "lodash.memoize";

const getData = (api) =>
  new Promise((resolve) => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => resolve(data));
  });

export default memoize(getData);