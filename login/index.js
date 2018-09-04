window.onload = function (e) {
    document.getElementById("login").onclick = function (e) {
        if (getUsers()) {
            window.open("./welcome");
        }

    }
}
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

function getUsers() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
        }
    };
    xhttp.open("GET", "http://localhost:5000/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}