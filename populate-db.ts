import {database, initializeApp} from "firebase";
import {firebaseConfig} from "./src/environments/firebase.config";
import {dbData} from "./db-data";


console.log('Initizalizing Firebase database ... ');

initializeApp(firebaseConfig);


const personsRef = database().ref('persons');



dbData.persons.forEach( person => {

  console.log('adding person');

  const personRef = personsRef.push({
      lname: person.lname,
      fname: person.fname,
      sname: person.sname,
      sex: person.sex,
      birthdate: person.birthdate,
      alive: person.alive
  });

  
 
 


});









