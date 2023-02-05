export const filterFavourite = (searchArr, databaseArr) => {
  const response = [];
  searchArr.map((searchId) => {
    return databaseArr.filter((item) => {
      if (item.id === searchId) {
        response.push(item);
      }
    });
  });
  return response;
};
