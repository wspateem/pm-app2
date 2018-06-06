
import {firebaseConfig} from "./src/environments/firebase.config";
import {initializeApp, auth,database} from 'firebase';
var Queue = require('firebase-queue');


console.log('Running batch server ...');

initializeApp(firebaseConfig);

auth()
    .signInWithEmailAndPassword('osekltd@gmail.com', 'osekltd')
    .then(runConsumer)
    .catch(onError);

function onError(err) {
    console.error("Could not login", err);
    process.exit();
}


function runConsumer() {

    console.log("Running consumer ...");

    const personRef = database().ref("persons");
    
    const queueRef = database().ref('queue');


    const queue = new Queue(queueRef, function(data, progress, resolve, reject) {

        console.log('received delete request ...',data);

        const deletePersonPromise = personRef.child(data.personId).remove();

        
        Promise.all([deletePersonPromise])
            .then(
                () => {
                    console.log("person deleted");
                    resolve();
                }
            )
            .catch(() => {
            console.log("person deletion in error");
            reject();
        });


    });


}














