export const getPagination = async (Model, query, { page, limit }) => {
  const curPage = parseInt(page) || 1;
  const curLimit = parseInt(limit) || process.env.PAGINATION_LIMIT;
  const totalDocuments = await Model.countDocuments(query);
  const startIndex = (curPage - 1) * curLimit;
  const pagination = {
    limit: curLimit,
    page: curPage,
    startIndex,
    totalDocuments,
  };

  return pagination;
};
