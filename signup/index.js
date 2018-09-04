window.onload = function (e) {
    document.getElementById("signup").onclick = function (e) {
        if (validate()) {
            insertUser();
        }
    }

}

function validate() {
    // check full name not empty
    // Check email valid
    // Check username not empty
    // check password eq confirm password
    let f_name = document.getElementById("fullname").value
    let u_email = document.getElementById("email").value
    let u_name = document.getElementById("u_name").value
    let password = document.getElementById("password").value
    let c_password = document.getElementById("cpassword").value
    let checkbox1 = document.getElementById("ckb1").checked
    if (f_name == "") {
        alert("Enter Fullname !!")
        return false
    }

    if (u_email == "") {
        alert("Enter Email !!")
        return false
    }
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(u_email) == false) {
        alert('Invalid Email Address !!');
        return false;
    }

    if (u_name == "") {
        alert("Enter Username !!")
        return false
    }

    if (password == "") {
        alert("Enter Password !!")
        return false
    }

    if (c_password == "") {
        alert("Enter Confirm Password !!")
        return false
    }

    if (password !== c_password) {
        alert("Passwords and Confirm password should be same")
        return false
    }

    if (checkbox1 == false) {
        alert("Agree to terms and conditions !!")
        return false
    }
    return true
}
function insertUser() {
    var xhttp = new XMLHttpRequest();
    var params = 'name=' + document.getElementById("fullname").value + '&email=' + document.getElementById("email").value + '&u_name=' + document.getElementById("u_name").value + '&password=' + document.getElementById("password").value + '&cpassword=' + document.getElementById("cpassword").value;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(JSON.parse(this.responseText).message)
            window.location.reload();
        }
    };
    xhttp.open("POST", "http://localhost:5000/newUser", true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(params);
}