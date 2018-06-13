import {database, initializeApp} from "firebase";
import {firebaseConfig} from "./src/environments/firebase.config";
import {dbData} from "./db-data";


console.log('Initizalizing Firebase database ... ');

initializeApp(firebaseConfig);


const familiesRef = database().ref('families');
const personssRef = database().ref('persons');

dbData.families.forEach( family => {

  console.log('adding family');

  const familieRef = familiesRef.push({
      lname: family.lname
  });
  let personKeysPerFamily = [];
  family.persons.forEach((person:any) =>  {

    console.log('adding lesson ');

    personKeysPerFamily.push(personssRef.push({
      alive : person.alive,
      baptismdate :person.baptismdate,
      birthdate : person.birthdate,
      city : person.city,
      communiondate : person.communiondate,
      confirmationdate : person.confirmationdate,
      deathdate : person.deathdate,
      fname : person.fname,
      lname : person.lname,
      postalcode : person.postalcode,
      sex : person.sex,
      sname : person.sname,
      street : person.street,
      weddingdate :person.weddingdate,
      familyId: familieRef.key
      }).key);

  });
  const association = database().ref('personsPerFamily');
  const personsPerFamily = association.child(familieRef.key);
  personKeysPerFamily.forEach(personKey => {
    console.log('adding person to family ');

    const personFamilyAssociation = personsPerFamily.child(personKey);

    personFamilyAssociation.set(true);
  });
});









