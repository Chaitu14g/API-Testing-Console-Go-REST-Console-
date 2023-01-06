let consoleFormEL = document.getElementById("consoleForm");

let requestUrlEl = document.getElementById("requestUrl");

let requestUrlErrMsgEl = document.getElementById("requestUrlErrMsg");

let requestMethodEL = document.getElementById("requestMethod");

let requestBodyEL = document.getElementById("requestBody");

let responseStatusEl = document.getElementById("responseStatus");

let responseBodyEL = document.getElementById("responseBody");

let sendRequestBtnEL = document.getElementById("sendRequestBtn");

requestUrlEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        requestUrlErrMsgEl.textContent = "Required*";
    } else {
        requestUrlErrMsgEl.textContent = "";
    }
});

let clicked = {
    answer: "",
    id: ""
};

requestMethodEL.addEventListener("blur", function(event) {
    clicked.answer = event.target.value;
});

let posting = function() {
    let url = "https://gorest.co.in/public-api/users";
    let details = requestBodyEL.value;
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer b7e0bfe0b42aa76df6fda28a31d38c7941c8ec1e97a05a1544848cfe95536f30"
        },
        body: details
    };
    console.log(details);
    fetch(url, options)
        .then(function(response) {
            return response.text();
        })
        .then(function(jsonData) {
            let a = JSON.parse(jsonData);
            responseStatusEl.value = a.code;
            console.log(a.code);
            responseBodyEL.value = jsonData;
            clicked.id = a.data.id;
        });
};

let putting = function() {
    let url = "https://gorest.co.in/public-api/users/" + clicked.id;
    let details = requestBodyEL.value;
    let options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer b7e0bfe0b42aa76df6fda28a31d38c7941c8ec1e97a05a1544848cfe95536f30"
        },
        body: details
    };
    fetch(url, options)
        .then(function(response) {
            return response.text();
        })
        .then(function(jsonData) {
            let a = JSON.parse(jsonData);
            responseStatusEl.value = a.code;
            responseBodyEL.value = jsonData;
            clicked.id = a.data.id;
        });
};

/*
sendRequestBtnEL.addEventListener("click", function() {
    if (clicked.answer === "POST") {
        posting();
    } else if (clicked.answer === "PUT") {
        putting();
    }
});
*/

consoleFormEL.addEventListener("submit", function(event) {
    event.preventDefault();
    if (clicked.answer === "POST") {
        posting();
    } else if (clicked.answer === "PUT") {
        putting();
    }
});


/*
{"id":60,
"name":"Anil Kumar",
"email":"anil31@ccbp.tech",
"gender":"Male",
"status":"Inactive"}
*/