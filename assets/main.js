
var config = {
    apiKey: "AIzaSyCtPNZ_d28Uk5c_fYoUbPDIW73NI70I0PM",
    authDomain: "requiredata-fd2a1.firebaseapp.com",
    databaseURL: "https://requiredata-fd2a1.firebaseio.com",
    projectId: "requiredata-fd2a1",
    storageBucket: "requiredata-fd2a1.appspot.com",
    messagingSenderId: "368616433831"
  };
  firebase.initializeApp(config);
  var rIndex,table = document.getElementById('table');
 
  var rIndex,
  table = document.getElementById('table');
//si input vide 

const clientsRef = firebase.database().ref().child('clients');

// on vise les valeurs et on les transcript 
clientsRef.on('value', snap => {
  table.innerHTML = ""
// on boucle sur les donnees
    snap.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        var newRow = table.insertRow(table.length),
        newRow = table.insertRow(table.length),
        cell1 = newRow.insertCell(0),
        cell2 = newRow.insertCell(1),
        cell3 = newRow.insertCell(2),
        cell4 = newRow.insertCell(3),
        name = childSnapshot.val().name,
        tel = childSnapshot.val().tel,
        age = childSnapshot.val().age;

        cell1.innerHTML = name;
        cell2.innerHTML = tel;
        cell3.innerHTML = age;
        cell4.innerHTML = childKey;

   newRow.onclick = function()
    {
      document.getElementById('name').value = name;
      document.getElementById('tel').value = tel;
      document.getElementById('age').value = age;
      document.getElementById('key').value = childKey ;

    };

    })
  });  
        
function checkEmptyInput(){

  var isEmpty = false,
  name = document.getElementById('name').value,
  tel = document.getElementById('tel').value,
  age = document.getElementById('age').value;

  if(name === ""){
    alert('name is empty');
    isEmpty = true;
  } 
  else if(tel === ""){
    alert('tel is empty');
    isEmpty = true;
  } 
  else if(age === ""){
    alert('age is empty');
    isEmpty = true;
  } 
  return isEmpty;
}

//Add row
function addHTMLTableRow(){

  //get the table by id
  //create a new row and cells 
  //get value from input text 
  //set the values into row cell's 

  if(!checkEmptyInput()){

    var addName = document.getElementById('name');
    var addTel = document.getElementById('tel');
    var addAge = document.getElementById('age');

    const client = {
    name: addName.value,
    age: addAge.value,
    tel: addTel.value,
  };
console.log(client);
// on passe la donne a l'index l fire base nous creer une clef
  clientsRef.push(client).then((res) => {
      console.log(res);
      addAge.value = "";
      addName.value = "";
      addTel.value = "";
  }).catch((err) => {
      console.log(err);
  })

  }
}

// row selected enter on input
function selectedRowToInput(){
  for(var i = 1; i < table.rows.length; i++)
  {
    table.rows[i].onclick = function()
    {
      //get  the selected row index
      rIndex = this.rowIndex;
      console.log(rIndex);
      document.getElementById('name').value =this.cells[0].innerHTML;
      document.getElementById('tel').value =this.cells[1].innerHTML;
      document.getElementById('age').value =this.cells[2].innerHTML;
      document.getElementById('key').value =this.cells[3].innerHTML;

    };
  }
}

function editHtmlSelectedRow(){

    if(!checkEmptyInput()){

      var addKey = document.getElementById('key');
      var addName = document.getElementById('name');
      var addTel = document.getElementById('tel');
      var addAge = document.getElementById('age');
   
      const key = addKey.value;

      const client = {
       name: addName.value,
       age: addAge.value,
       tel: addTel.value,
     };
     const clientRef = firebase.database().ref().child('clients').child(key);
     // https://requiredata-fd2a1.firebaseio.com/clients/-LWkZ1gj-tTfqXGJgVKm

      clientRef.update(client)
    }
  console.log('Data is updated successfully!');
}
  
  
   var  name = document.getElementById('name').value, 
        age  = document.getElementById('age').value,
        tel =  document.getElementById('tel').value; 
        
 if(!checkEmptyInput()){
        table.rows[rIndex].cells[0].innerHTML = name;
        table.rows[rIndex].cells[1].innerHTML = age;
        table.rows[rIndex].cells[2].innerHTML = tel;
}

function removeSelectedRow(){

  let removeKey =  document.getElementById('key').value;
        clientsRef.child(removeKey).remove().then((res) => {
  console.log(res);
        }).catch((error) => {
        console.log(error);
})

  table.deleteRow(rIndex);

  //nettoye l'input
  document.getElementById('name').value ="";
  document.getElementById('age').value  ="";
  document.getElementById('tel').value  ="";
  document.getElementById('key').value  ="";
  
}
   
