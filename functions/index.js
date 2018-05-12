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

//ソングとチーム
exports.OnCreateTeamOfSong = createCompatibleFunction( "songs", "teams", "create" )
exports.OnDeleteTeamOfSong = createCompatibleFunction( "songs", "teams", "delete" )
exports.OnCreateSongOfTeam = createCompatibleFunction( "teams", "songs", "create" )
exports.OnDeleteSOngOfTeam = createCompatibleFunction( "teams", "songs", "delete" )

//ソングとライブ
exports.OnCreateLiveOfSong = createCompatibleFunction( "songs", "lives", "create" )
exports.OnDeleteLiveOfSong = createCompatibleFunction( "songs", "lives", "delete" )
exports.OnCreateSongOfLive = createCompatibleFunction( "lives", "songs", "create" )
exports.OnDeleteSOngOfLive = createCompatibleFunction( "lives", "songs", "delete" )

//キャラクターとチーム
exports.OnCreateTeamOfCharacter = createCompatibleFunction( "characters", "teams", "create" )
exports.OnDeleteTeamOfCharacter = createCompatibleFunction( "characters", "teams", "delete" )
exports.OnCreateCharacterOfTeam = createCompatibleFunction( "teams", "characters", "create" )
exports.OnDeleteCharacterOfTeam = createCompatibleFunction( "teams", "characters", "delete" )

//MDとチーム
exports.OnCreateTeamOfMd = createCompatibleFunction( "mds", "teams", "create" )
exports.OnDeleteTeamOfMd = createCompatibleFunction( "mds", "teams", "delete" )
exports.OnCreateMdOfTeam = createCompatibleFunction( "teams", "mds", "create" )
exports.OnDeleteMdOfTeam = createCompatibleFunction( "teams", "mds", "delete" )


