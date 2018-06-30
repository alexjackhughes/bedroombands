module.exports = (req, res, next) => {
  if(req.user.credits < 1) {
    return res.status(403).send({error: "You need at least one credit!"});
  }

  next();
};
