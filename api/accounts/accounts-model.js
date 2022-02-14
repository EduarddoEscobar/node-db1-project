const db = require("../../data/db-config");

const getAll = async () => {
  // DO YOUR MAGIC
  return db('accounts')
}

const getById = async (id) => {
  // DO YOUR MAGIC
  return db('accounts').where({ id });
}

const create = async (account) => {
  // DO YOUR MAGIC
  let [id] = await db('accounts').insert(account);  
  return{
    ...account,
    id
  }
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db('accounts').where({ id }).update(account);
  return{
    ...account,
    id
  }
}

const deleteById = async (id) => {
  // DO YOUR MAGIC
  let result = await getById(id);
  await db('accounts').where({ id }).del();
  return result;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
