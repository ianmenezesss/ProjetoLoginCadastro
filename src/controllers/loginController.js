const Login = require('../models/LoginModel');

// rota para renderizar a página de login

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado');
    return res.render('login');
}

// rota para registrar o usuário

exports.register = async (req, res) => {
    try{
    const login = new Login(req.body);
    await login.register();

    // se houver erros

    if(login.errors.length > 0){
        req.flash('errors', login.errors)
        req.session.save(function() {
            return res.redirect('back');
          });
        return
    }


    // se não houver erros

    req.flash('success', 'Usuário criado com sucesso.');
    req.session.user = login.user;
    req.session.save(function() {
        return res.redirect('back');
      });

    }catch(e){
        console.log(e);
        return res.render('404');
    }
}

exports.login = async function(req, res) {
    try {
      const login = new Login(req.body);
      await login.login();
  
      if(login.errors.length > 0) {
        req.flash('errors', login.errors);
        req.session.save(function() {
          return res.redirect('back');
        });
        return;
      }
  
      req.flash('success', 'Você entrou no sistema.');
      req.session.user = login.user;
      req.session.save(function() {
        return res.redirect('back');
      });
    } catch(e) {
      console.log(e);
      return res.render('404');
    }
  };
  
  exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/');
  };