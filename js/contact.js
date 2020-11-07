
  // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBaX0FKAp8CqGptMgR1kIOSpi_tINM88sM",
    authDomain: "bangladesh-8c0b7.firebaseapp.com",
    databaseURL: "https://bangladesh-8c0b7.firebaseio.com",
    projectId: "bangladesh-8c0b7",
    storageBucket: "bangladesh-8c0b7.appspot.com",
    messagingSenderId: "684778480113",
    appId: "1:684778480113:web:fc5c1dab08214e7b0be450",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var arr = [];


var rootRef = firebase.database().ref("messages");
rootRef.on("value", snap => {
    var temp = snap.val();

    for (var i in temp) {
        arr.push(temp[i]);
    }

    console.log(arr);

    //ACCESS LIKE THIS:
    // console.log(arr[0].company);

    //put values from arr[] to HTML <DO WITH FUNCTION>
    loadFromDatabase();
})

function loadFromDatabase() {
    var myTable = document.getElementById("main_table");
    for (var i = 0; i < arr.length; i++) {
        var tableRow = document.createElement("tr");

        var tableData1 = document.createElement("td");
        var tableData2 = document.createElement("td");
        var tableData3 = document.createElement("td");
        var tableData4 = document.createElement("td");
        var tableData5 = document.createElement("td");

        tableData1.innerHTML = arr[i].name;
        tableData2.innerHTML = arr[i].company;
        tableData3.innerHTML = arr[i].phone;
        tableData4.innerHTML = arr[i].email;
        tableData5.innerHTML = arr[i].message;


        tableRow.appendChild(tableData1);
        tableRow.appendChild(tableData2);
        tableRow.appendChild(tableData3);
        tableRow.appendChild(tableData4);
        tableRow.appendChild(tableData5);


        myTable.appendChild(tableRow);
    }
}

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
    e.preventDefault();

    // Get values
    var firstname = getInputVal('firstname');
    var lastname = getInputVal('lastname');
    var email = getInputVal('email');
    var phone = getInputVal('phone');
    var message = getInputVal('message');

    // Save message
    saveMessage(firstname,lastname , email, phone, message);

    // Show alert
    document.querySelector('.alert').style.display = 'block';

    // Hide alert after 3 seconds
    setTimeout(function () {
        document.querySelector('.alert').style.display = 'none';
    }, 3000);

    // Clear form
    document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(firstname, lastname, email, phone, message) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        comment: message
    });
}