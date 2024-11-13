

// middlewareGlobal é um middleware que é responsável por passar as mensagens de erro e sucesso para as views. 

exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;  
  next();
};
