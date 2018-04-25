const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.addCharacter = functions.https.onRequest((req, res) => {
    const name = Object.keys(req.body)[0];
    const info = req.body[name]
    console.log(info);
    return admin.database().ref('/characters/' + name).set(info).then((snapshot) => {
        return res.redirect(303, snapshot.ref);
    });
});

exports.OnSetTeamOfCharacter = functions.database.ref('/characters/{characterId}/teams/{teamId}').onCreate((e) => {
    return admin.database().ref(`/teams/${e.params.teamId}/members/${e.params.characterId}`).set(true);
});

exports.OnDeleteTeamOfCharacter = functions.database.ref('/characters/{characterId}/teams/{teamId}').onDelete((e) => {
    return admin.database().ref(`/teams/${e.params.teamId}/members/${e.params.characterId}`).set(null);
});

exports.OnSetCharacterOfTeam = functions.database.ref('/teams/{teamId}/members/{characterId}').onCreate((e) => {
    return admin.database().ref(`/characters/${e.params.characterId}/teams/${e.params.teamId}`).set(true);
});

exports.OnDeleteCharacterOfTeam = functions.database.ref('/teams/{teamId}/members/{characterId}').onDelete((e) => {
    return admin.database().ref(`/characters/${e.params.characterId}/teams/${e.params.teamId}`).set(null);
});