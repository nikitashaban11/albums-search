const fetchData = (url) => fetch(url).then((response) => response.json());

const uniqueArrayOfObject = (array, keyToBeUnique) =>
  array.filter(
    (item, i) =>
      !array
        .slice(i + 1)
        .some(
          (comparedItem) => comparedItem[keyToBeUnique] === item[keyToBeUnique]
        )
  );

export { fetchData, uniqueArrayOfObject };
