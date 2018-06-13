
import {firebaseConfig} from "./src/environments/firebase.config";
import {initializeApp, auth,database} from 'firebase';
var Queue = require('firebase-queue');


console.log('Running batch server ...');

initializeApp(firebaseConfig);

auth()
    .signInWithEmailAndPassword('admin@angular-university.io', 'test123')
    .then(runConsumer)
    .catch(onError);

function onError(err) {
    console.error("Could not login", err);
    process.exit();
}


function runConsumer() {

    console.log("Running consumer ...");

    const familiesRef = database().ref("families");

    const queueRef = database().ref('queue');


    const queue = new Queue(queueRef, function(data, progress, resolve, reject) {

        console.log('received delete request ...',data);





}














