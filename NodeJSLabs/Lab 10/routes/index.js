var express = require('express');
var router = express.Router();
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.redirect('/private');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/login');
	}
}

router.get('/private', ensureAuthenticated, function(req, res){
	res.render('index');
});

// Login
router.get('/login', function(req, res){
	res.render('login');
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUser(username).then((user)=>{
   	//if(err) throw err;
   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
			//	 console.log("Password Match");
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   },(err)=>{
		 //console.log("No user");
		 return done(null, false, {message: 'Unknown User'});
	 });
  }));


passport.serializeUser(function(user, done) {
	//console.log("Serialize");
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
	//	console.log("Deserialize");
				//console.log(username);

  User.getUser(username).then((user)=> {
			//	console.log(user.bio);
    done(null, user);
  });
});


router.post('/login',
  passport.authenticate('local', {successRedirect:'/private', failureRedirect:'/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/login');
});


module.exports = router;