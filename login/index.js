window.onload = function (e) {
    var loginButton = document.getElementById("login");
    loginButton.addEventListener('click', function () {
        loginNow();
    });
};

function loginNow() {
    var xhttp = new XMLHttpRequest();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var url = "http://localhost:5000/login?email=" + email + "&password=" + password;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(JSON.parse(this.responseText).message)
        }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}