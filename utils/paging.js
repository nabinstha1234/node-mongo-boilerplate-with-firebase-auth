/**
 * @param {Object} args
 * @param {number} args.skip
 * @param {number} args.limit
 * @param {string} args.sort
 * @param {Object} args.query
 * @returns {Object} - { skip: number, limit: number, sort: { [field: string]: string }, query: any }
 */
const getPagingArgs = (args = {}) => {
  let { skip = 0, limit = 50, sort = 'createdAt:desc', ...query } = args;

  let [field, orderBy] = sort.split(':');
  sort = { [field]: orderBy };
  if (limit > 150) {
    limit = 150;
  }

  return {
    skip: +skip,
    limit: +limit,
    sort,
    query,
  };
};

/**
 * @param {Object} args
 * @param {number} args.skip
 * @param {number} args.limit
 * @param {string} args.sort
 * @param {number} args.total
 * @param {Object} args.query
 * @returns {Object} - { total: number, startIndex: number, endIndex: number, hasNextPage: boolean }
 */
const getPagingResult = (args = {}) => {
  const skip = args.skip || 0;
  const limit = args.limit || 10;
  const total = args.total;
  const endIndex = +skip + +limit - 1;

  return {
    total,
    startIndex: +skip,
    endIndex: endIndex > total - 1 ? total - 1 : endIndex,
    hasNextPage: skip + limit < total ? true : false,
  };
};

module.exports = {
  getPagingArgs,
  getPagingResult,
};
