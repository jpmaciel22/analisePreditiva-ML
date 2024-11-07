const Login = require('../models/LoginModel');

exports.index = (req,res,next) => {
    return res.render('login');
}
exports.register = async (req,res,next) => {
    try{
        const login = new Login(req.body)
        await login.register();
        if(login.errors.length > 0 ){
            req.flash("errors", login.errors);
            req.session.save(function(){
            return res.redirect('/login');
            })
            return;
        }
        req.flash("success", 'Seu usuário foi cadastrado com sucesso');
        req.session.save(function(){
        return res.redirect('/login');
        })
    }catch(error){
       return res.render('404')
    }
};
exports.login = async (req,res,next) => {
    try{
        const login = new Login(req.body)
        await login.login();
        if(login.errors.length > 0 ){
            req.flash("errors", login.errors);
            req.session.save(function(){
            return res.redirect('/login');
            })
            return;
        }
        req.flash("success", 'Login concluído com sucesso.');
        req.session.user = login.user
        req.session.save(function(){
        return res.redirect('/login');
        })
    }catch(error){
       return res.render('404')
    }
}
exports.logout = async(req,res,next) => {
    req.session.destroy();
    res.redirect('/');
}