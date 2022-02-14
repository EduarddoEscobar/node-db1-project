const router = require('express').Router();
const Accounts = require('./accounts-model');
const middleware = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    let accounts = await Accounts.getAll();
    res.status(200).json(accounts);
  }catch(e){
    next(e);
  }
})

router.get('/:id', middleware.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.status(200).json(req.account);
  }catch(e){
    next(e);
  }
})

router.post('/', [middleware.checkAccountPayload, middleware.checkAccountNameUnique], async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    let account = await Accounts.create(req.body);
    res.status(201).json(account);
  }catch(e){
    next(e);
  }
})

router.put('/:id', [middleware.checkAccountId, middleware.checkAccountPayload], async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    let account = await Accounts.updateById(req.params.id, req.body);
    res.status(200).json(account);
  }catch(e){
    next(e);
  }
});

router.delete('/:id', [middleware.checkAccountId],async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    await Accounts.deleteById(req.params.id);
    res.status(200).json(req.account);
  }catch(e){
    next(e);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    custom: 'There was error with the database',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;
