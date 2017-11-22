var checkSignin = function(req,res,next){
  if(req.session.username){
    console.log('berhasi');
    next();

  }else{
    res.redirect('/users');
  }
}

module.exports = checkSignin;
