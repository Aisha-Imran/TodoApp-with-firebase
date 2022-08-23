import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
import { getDatabase, ref, set, get, push, onValue, child,remove } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";



const firebaseConfig = {
  apiKey: "AIzaSyD35Szda8gK8CsT-AzvW7Ahx_ajby_2QBo",
  authDomain: "todo-app-9de09.firebaseapp.com",
  projectId: "todo-app-9de09",
  storageBucket: "todo-app-9de09.appspot.com",
  messagingSenderId: "500766449989",
  appId: "1:500766449989:web:41982b8cf9409fd5cf5e2c",
  measurementId: "G-T62YHMD7BF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();


var loginBox = document.getElementById('loginBox')
loginBox.addEventListener('click', function () {
  var main = document.getElementById("main")
  var main1 = document.getElementById("main1")
  main.style.display = "none"
  main1.style.display = "block"

})

//create new user

var btn = document.getElementById("btn")
btn.addEventListener("click", function () {
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value
  var main = document.getElementById("main")
  var main1 = document.getElementById("main1")
  console.log(email)
  console.log(password)

  //from firebase
  createUserWithEmailAndPassword(auth, email, password)
    .then(function (userCredential) {
      // Signed in 
      const user = userCredential.user;
      alert('user created')
      main.style.display = "none"
      main1.style.display = "block"
      // ...
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
})



//signin existing user


var btn1 = document.getElementById("btn1")
btn1.addEventListener("click", function () {
  var email1 = document.getElementById('email1').value
  var password1 = document.getElementById('password1').value
  var main1 = document.getElementById("main1")
  var todopage = document.getElementById("todopage")
  var nav = document.getElementById("nav")
  console.log(email1)
  console.log(password1)

  //from firebase
  signInWithEmailAndPassword(auth, email1, password1)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      main1.style.display = "none"
      todopage.style.display = "block"
      nav.style.display = "block"

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
})


//state observer

var username = document.getElementById("username")

//from firebase
onAuthStateChanged(auth, (user) => {
  if (user) {

    const uid = user.uid;
    // set(ref(db, 'users/' + uid), {
    //   userId: uid,
    //   email: user.email,

    // });
    username.innerText = user.email

    // ...
  } else {
    // User is signed out
    // ...
  }
});


//signout

var signout = document.getElementById("signout")
signout.addEventListener("click", function () {
  signOut(auth).then(() => {
    // Sign-out successful.
    main1.style.display = "block"
    todopage.style.display = "none"
    nav.style.display = "none"
  }).catch((error) => {
    // An error happened.
  });
})




//create Todo's in firebase 



var btn2 = document.getElementById("btn2")
btn2.addEventListener("click", function () {
  var todo_item = document.getElementById('todo-item').value
  var userId = auth.currentUser.uid
  var key1 = Math.random() * 3216548
  var key = key1.toFixed()

  set(ref(db, 'users/'+ key), {
    todo: todo_item,
    key:key
  });
  var list= document.getElementById('list');

  const dbRef = ref(getDatabase());
  get(child(dbRef, 'users/'+ key)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      var li = document.createElement('li');
      var liText = document.createTextNode(snapshot.val().todo)
      li.setAttribute("class", "list-group-item")
      li.appendChild(liText)


      //create delete button
      var delBtn = document.createElement("button")
      var delText = document.createTextNode("DELETE")
      delBtn.setAttribute("class", "btn4")
      delBtn.setAttribute('id',snapshot.val().key)
      delBtn.setAttribute("onclick", "deleteItem(this)")
      delBtn.appendChild(delText)

      //create edit button
      var editBtn = document.createElement("button");
      var editText = document.createTextNode("EDIT")
      editBtn.setAttribute("class", "btn3")
      editBtn.appendChild(editText)
      editBtn.setAttribute("onclick", "editItem(this)")


      li.appendChild(delBtn)
      li.appendChild(editBtn)


      list.appendChild(li)

      todo_item.value = ""

    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  alert("data saved")

})

function deleteItem(e){
 remove((ref(db, 'users/'+ e.id)))
  e.parentNode.remove()
  
  console.log(e.parentNode)

}





