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

const createCompatibleFunction = (parent, child, mode) => {
    switch(mode){
        case "create":
            return functions.database.ref(`/${parent}/{id1}/${child}/{id2}`).onCreate((e) => {
                return admin.database().ref(`/${child}/${e.params.id2}/${parent}/${e.params.id1}`).set(true);
            });
        case "delete":
            return functions.database.ref(`/${parent}/{id1}/${child}/{id2}`).onCreate((e) => {
                return admin.database().ref(`/${child}/${e.params.id2}/${parent}/${e.params.id1}`).set(true);
            });
        default:
            return functions.database.ref(`/${parent}/{id1}/${child}/{id2}`).onCreate((e) => {
                return admin.database().ref(`/${child}/${e.params.id2}/${parent}/${e.params.id1}`).set(true);
            });
    }
}


//キャラクターとチーム
exports.OnCreateTeamOfCharacter = functions.database.ref('/characters/{characterId}/teams/{teamId}').onCreate((e) => {
    return admin.database().ref(`/teams/${e.params.teamId}/members/${e.params.characterId}`).set(true);
});

exports.OnDeleteTeamOfCharacter = functions.database.ref('/characters/{characterId}/teams/{teamId}').onDelete((e) => {
    return admin.database().ref(`/teams/${e.params.teamId}/members/${e.params.characterId}`).set(null);
});

exports.OnCreateCharacterOfTeam = functions.database.ref('/teams/{teamId}/members/{characterId}').onCreate((e) => {
    return admin.database().ref(`/characters/${e.params.characterId}/teams/${e.params.teamId}`).set(true);
});

exports.OnDeleteCharacterOfTeam = functions.database.ref('/teams/{teamId}/members/{characterId}').onDelete((e) => {
    return admin.database().ref(`/characters/${e.params.characterId}/teams/${e.params.teamId}`).set(null);
});

//チームとソング
exports.OnCreateTeamOfSong = createCompatibleFunction( "songs", "teams", "create" )
exports.OnDeleteTeamOfSong = createCompatibleFunction( "songs", "teams", "delete" )
exports.OnCreateSongOfTeam = createCompatibleFunction( "teams", "songs", "create" )
exports.OnDeleteSOngOfTeam = createCompatibleFunction( "teams", "songs", "delete" )
