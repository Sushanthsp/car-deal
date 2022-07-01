const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");

const app = express()
const cors = require("cors");

var serviceAccount = require("./permission.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://car-deal-9915c-default-rtdb.asia-southeast1.firebasedatabase.app"
});
const db = admin.firestore();
app.use(cors({ origin: true }))
db.settings({ ignoreUndefinedProperties: true })

//Routes
app.get('/api/dummy', (req, res) => {
    return res.status(200).send("Hello world")
})

//Post
app.post('/api/car', (req, res) => {
    (async () => {
        try {
            const {
                name,
                email,
                carBrand,
                carModel,
                year,
                carRegisteredState,
                kilometersDriven,
                file,
                bid,
                imageUrl,
                dealersBid } = req.body;

            const response = await db.collection('cars').doc('/' + email + '/')
                .create({
                    name,
                    email,
                    carBrand,
                    carModel,
                    year,
                    carRegisteredState,
                    kilometersDriven,
                    file,
                    bid,
                    imageUrl,
                    dealersBid: null
                })

            return res.status(200).send(response);
        }
        catch (e) {
            console.log(e);
            return res.status(500).send(e)
        }
    })();
})

//Get
app.get('/api/dashboard', (req, res) => {
    (async () => {
        try {
            const document = db.collection('cars').doc(req.body.email)
            let car = await document.get();
            let response = car.data();

            return res.status(200).send(response);
        }
        catch (e) {
            console.log(e);
            return res.status(500).send(e)
        }
    })();
})
//Get all
app.get('/api/all', (req, res) => {
    (async () => {
        try {
            let query = db.collection('cars')
            let response = [];

            await query.get().then(
                querySnapShots => {
                    let docs = querySnapShots.docs;

                    for (let doc of docs) {
                        const selectItem = {
                            name: doc.data().name,
                            email: doc.data().email,
                            carBrand: doc.data().carBrand,
                            carModel: doc.data().carModel,
                            year: doc.data().year,
                            carRegisteredState: doc.data().carRegisteredState,
                            kilometersDriven: doc.data().kilometersDriven,
                            file: doc.data().file,
                            bid: doc.data().bid,
                            imageUrl: doc.data().imageUrl,
                            dealersBid:doc.data().dealersBid
                        }
                        response.push(selectItem)
                    }
                    return response;
                })
            return res.status(200).send(response)
        }
        catch (e) {
            console.log(e);
            return res.status(500).send(e)
        }
    })();
})
//Put
app.put('/api/update', (req, res) => {
    (async () => {
        try {
            const { email ,dealersBid, } = req.body;

            const document = await db.collection('cars').doc(email)
            
            await document.update({
                dealersBid
            })

            return res.status(200).send(document);
        }
        catch (e) {
            console.log(e);
            return res.status(500).send(e)
        }
    })();
})

//Delete
app.delete('/api/delete', (req, res) => {
    (async () => {
        try {
            const {email } = req.body;

            const document = await db.collection('cars').doc(email)
            await document.delete()

            return res.status(200).send();
        }
        catch (e) {
            console.log(e);
            return res.status(500).send(e)
        }
    })();
})

//Export the api to Firebase cloud functions

exports.convertLargeFile = functions
    .runWith({
        // Ensure the function has enough memory and time
        // to process large files
        timeoutSeconds: 300,
        memory: "1GB",
    })
    .storage.object()
    .onFinalize((object) => {
        // Do some complicated things that take a lot of memory and time
    });
exports.withTimeout = functions.runWith({
    timeoutSeconds: 30
}).https.onRequest((request, response) => {
    setTimeout(() => {
        response.send("Hello from Firebase!");
    }, 45 * 1000);
});

exports.withoutTimeout = functions.runWith({
    memory: '1GB'
}).https.onRequest((request, response) => {
    setTimeout(() => {
        response.send("Hello from Firebase!");
    }, 45 * 1000);
});
exports.afterTimeout = (req, res) => {
    setTimeout(() => {
        // May not execute if function's timeout is <2 minutes
        console.log('Function running...');
        res.end();
    }, 120000); // 2 minute delay
};


exports.app = functions.https.onRequest(app)

