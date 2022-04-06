var Email = document.getElementById('email');
let state=false;
let success = false;
let Password = document.getElementById('Password')
let PasswordStrength = document.getElementById('password-strength')
let Button = document.getElementById('Submit')
let lowerUpperCase = document.querySelector('.low-upper-case')
let number = document.querySelector('.one-number')
let specialChar = document.querySelector('.one-special-char')
let eightChar = document.querySelector('.eight-character')
let passMatch = document.querySelector('.Password-Match')
let confirmPass = document.getElementById('ConfirmPassword')

 function myfunction(show){
   show.classList.toggle('fa-eye-slash')
 }
 function toggle(){
  if(state){
    Password.setAttribute("type","password")
    state= false;
  }else{
    Password.setAttribute("type","text")
    state=true;
  }

 }
 Password.addEventListener('keyup',()=>{
   let pass = Password.value;
   checkStrength(pass);
 })

 function checkStrength(Password){
    let strength = 0;

    if(Password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){
      strength +=1;
      lowerUpperCase.classList.add('fa-check2') 
    }else{
      lowerUpperCase.classList.remove('fas') 
      lowerUpperCase.classList.remove('fa-check2') 
      lowerUpperCase.classList.add('fa-circle2') 
    }

    if(Password.match(/([0-9])/)){
      strength +=1;
      number.classList.add('fa-check2')  
    }else{
      number.classList.remove('fas')
      number.classList.remove('fa-check2')
      number.classList.add('fa-circle2') 
    }

    if(Password.match(/([!,@,#,$,%,^,&,.])/)){
      strength +=1;

      specialChar.classList.add('fa-check2')
    }else{
      specialChar.classList.remove('fas')
      specialChar.classList.remove('fa-check2')
      specialChar.classList.add('fa-circle2') 
    }
    if(Password.length>7){
      strength +=1;

      eightChar.classList.add('fa-check2')
    }else{
      eightChar.classList.remove('fas')
      eightChar.classList.remove('fa-check2')
      eightChar.classList.add('fa-circle2') 
    }

    if(strength==0){
      PasswordStrength.style= "width: 0%";
    }else if(strength==1){
      PasswordStrength.classList.remove('progress-bar-warning');
      PasswordStrength.classList.remove('progress-bar-success');
      PasswordStrength.classList.add('progress-bar-danger');
      PasswordStrength.style= "width: 15%";
    }else if(strength==2){
      PasswordStrength.classList.remove('progress-bar-warning');
      PasswordStrength.classList.remove('progress-bar-success');
      PasswordStrength.classList.add('progress-bar-warning');
      PasswordStrength.style= "width: 45%";
    }else if(strength==3){
      PasswordStrength.classList.remove('progress-bar-danger');
      PasswordStrength.classList.remove('progress-bar-success');
      PasswordStrength.classList.add('progress-bar-warning');
      PasswordStrength.style= "width: 75%";
    }else if(strength==4){
      PasswordStrength.classList.remove('progress-bar-warning');
      PasswordStrength.classList.remove('progress-bar-danger');
      PasswordStrength.classList.add('progress-bar-success');
      PasswordStrength.style= "width: 100%";
      success=true;
    }

 }

 Button.addEventListener('click',(e)=>{
  let pass = confirmPass.value;
  let pass1st = Password.value;
  success=true;

  if(pass!=pass1st){
     success=false;
     console.log(pass)
     console.log(pass1st)
     //passMatch.innerHTML= "Password does not match!";
     passMatch.classList.remove('hidden1');
    }else{
      success=true;
    }

    if(!success){
      e.preventDefault();
    }
 })

