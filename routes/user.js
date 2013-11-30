var fs=require('fs');
var peoplesInfo=JSON.parse(fs.readFileSync('PeopleInfo.txt','utf-8'));
var credentialsMatch=function(email,password){
    return peoplesInfo.some(function(obj){
        return(obj.emailid == email && obj.pswd == password )
    })
}


exports.login = function(req, res){
	req.cookies.remember 
	&&	res.redirect('/Profile') 
	||	res.render('login',{message:req.query.message});
}

exports.profile = function(req, res){
	req.cookies.login && res.render('Profile') || res.redirect('/login?message="Need+to+Login+First"');
}

exports.signOut = function(req, res){
	res.clearCookie('remember');
	res.redirect('/login');
}

exports.authenticate = function(req, res){
	var email=req.body.email;
	var password=req.body.password;
	if(credentialsMatch(email,password)){
		res.cookie('login','1');
		req.body.remember && res.cookie('remember','1');
		res.redirect('/Profile');
	}
	else
		res.redirect('/login?message=Login+Failed')
}
