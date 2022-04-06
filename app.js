//Imports
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const users = require('./users');
const nodemailer = require('nodemailer');

//Session 

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'system.adm927@gmail.com',
      pass: 'Admin.927'
    }
  });

let Emails =[];
let Passwords=[];
var U_Id=-2;
var attempt=0;
var er=-1;
let authorized=false;
let emailExist=false;

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//Static files
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/imgages',express.static(__dirname + 'public/images'))


//Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('',(req, res) => {
    //res.sendFile(__dirname + '/views/index.html')
    if(!authorized){
        res.render('login', {Error:"Please Provide Correct Details!!",UserId:U_Id,attempt:attempt})
    }else if(authorized==true){
        res.redirect('allusers')
    }
})

app.get('/register',(req, res) => {
    //res.sendFile(__dirname + '/views/index.html')
    
    res.render('register',{EmailError:"Email already Exist!!",EmailExist:emailExist})
})

app.get('/logout',(req, res) => {
    //res.sendFile(__dirname + '/views/index.html')
    authorized =false
        U_Id=-2;
        er=-1;
        attempt=0;
        res.render('login', {Error:"Please Provide Correct Details!!",UserId:U_Id,attempt:attempt})

})
app.get('/login',(req, res) => {
    //res.sendFile(__dirname + '/views/index.html')
    if(!authorized){
    res.render('login',{Error:"Please Provide Correct Details!!",UserId:U_Id,attempt:attempt})
    }else if(authorized==true){
        res.redirect('allusers')
    }
})
var nam=""
app.get('/allusers',(req, res) => {
    //res.sendFile(__dirname + '/views/index.html')
    if(U_Id!=-2){
    
    res.render('allusers', {Titlle:"List of Users",UserId:U_Id,Users:users,Click:er})
    }else{
        res.render('login',{Error:"Please Provide Correct Details!!",UserId:U_Id,attempt:attempt})
    }
})

app.get('/:id?',(req, res) => {
    //res.sendFile(__dirname + '/views/index.html')
    if(U_Id!=-2){
    var id = req.params.id;
    console.log("The Id is : "+id)
    res.render('allusers', {Titlle:"List of Users",UserId:U_Id,Users:users,Click:id})
    }else{
        res.render('login',{Error:"Please Provide Correct Details!!",UserId:U_Id,attempt:attempt})
    }
})

app.post('/loginMe',urlencodedParser,(req,res)=>{
    var email = req.body.email
    var pass = req.body.Password
    console.log("Email\t\t: "+email)
    console.log("Password\t: "+pass)
    getUsers();
    
     U_Id=Authonticate(email,pass)
     console.log(U_Id)
    if(U_Id>=0){
        nam=users[U_Id].Name
        console.log("User "+U_Id+" is connected...") 
        authorized=true
        res.redirect('allusers')
        attempt=0;
    }else if(U_Id<0){
        attempt+=1;
        res.render('login',{Error:"Please Provide Correct Details!!",UserId:U_Id,attempt:attempt})
    }
})

app.post('/register',urlencodedParser,(req,res)=>{
    var name = req.body.Name
    var surname = req.body.Surname
    var email = req.body.email
    var pass = req.body.Password
    var country = req.body.Country
    if(!country){
        country = "South Africa"
    }
    var color = req.body.Color;
    if(!color){
        color = "None"
    }
    var cellNumber = req.body.CellNumber;
    var comment = req.body.Comment;
    var birthday = req.body.Birthday;
    
    console.log("Name\t\t: "+name)
    console.log("Surname\t\t: "+surname)
    console.log("Email\t\t: "+email)
    console.log("Password\t: "+pass)
    console.log("Country\t\t: "+country)
    console.log("Color\t\t: "+color)
    console.log("Conact No\t: "+cellNumber)
    console.log("Comments\t: "+comment)
    
    if(findEmail(email)==false){
        
        users.push({
            Name:name,
            Surname:surname,
            Email:email,
            Password:pass,
            Country:country,
            Color:color,
            Contact:cellNumber,
            Comments:comment,
            Date: getDate(),
            Birthday:birthday
        })
        console.log(users)
        authorized=true
        res.render('allusers', {Titlle:"List of Users",UserId:users.length-1,Users:users})
        //res.redirect('allusers')

        //Send Email To Admin
        var EmailString="Hello,\n\nA new User has been Register in to the System\n\nName\t\t: "+name+"\nSurname\t\t: "+surname+"\nEmail\t\t: "+email+"\nDate & Time\t: "+getDate()+"\n\nLink : http://localhost:3000/allusers ";
        var mailOptions = {
            from: 'system.adm927@gmail.com',
            to: 'system.adm927@gmail.com',
            subject: 'New User Added',
            text: EmailString,
          };
        
          transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
          });
    }else{
        emailExist=true
        res.redirect('register')
    }
})

function Authonticate(email,pass){
    var j=Emails.length
    var user;
    
    console.log(j)
    for(var j in Emails){
     if(JSON.stringify(email)==Emails[j]&&JSON.stringify(pass)==Passwords[j]){   
         return j;
         } 
    } 
    return -1; 
 }

 function getUsers(){
    users.forEach((user)=>{
        Emails.push(JSON.stringify(user.Email))
        Passwords.push(JSON.stringify(user.Password))
   })
   for(var i=0;i<Emails.length;i++){
    console.log(" Email : ",Emails[i])
    console.log(" Password : ",Passwords[i])
   }
 }

 function findEmail(email){
    for(var j in Emails){
     if(JSON.stringify(email)==Emails[j]){   
         return true;
    } 
    } 
    return false; 
 }

 function getDate(){
    var today = new Date();
    var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
    var time = today.getHours()+':'+today.getMinutes();
    return date+' '+time
 }

//Listen 
app.listen(port,()=>console.info('Listening on port ',port)
    
)
