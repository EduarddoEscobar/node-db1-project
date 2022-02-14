const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  let {name, budget} = req.body;
  name = name.trim();
  budget = Number(budget);
  if(name.length <= 3 && name.length >= 100) {
    res.status(400).json({message: 'name of the account must be between 3 and 100'});
  }else if(typeof budget !== 'number'){
    res.status(400).json({message: 'budget of the account must be a number'});
  }else if(budget < 0 || budget > 1000000){
    res.status(400).json({message: 'budget of account is too large or too small'});
  }else{
    req.account = {name, budget};
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  let name = req.body.name.trim();
  let accounts = await Accounts.getAll();
  if(accounts.map(account => account.name).includes(name)){
    res.status(400).json({message: 'that name is taken'});
  }else{
    next();
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  let account = await Accounts.getById(req.params.id);
  if(account){
    req.account = account;
    next();
  }else{
    res.status(400).json({message: 'account not found'});
  }
}
