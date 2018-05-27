const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createCompatibleFunction = (parent, child, mode) => {
    switch(mode){
        case "create":
            return functions.database.ref(`/${parent}/{id1}/${child}/{id2}`).onCreate((e) => {
                return admin.database().ref(`/${child}/${e.params.id2}/${parent}/${e.params.id1}`).set(true);
            });
        case "delete":
            return functions.database.ref(`/${parent}/{id1}/${child}/{id2}`).onCreate((e) => {
                return admin.database().ref(`/${child}/${e.params.id2}/${parent}/${e.params.id1}`).set(null);
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
//exports.OnCreateLiveOfSong = createCompatibleFunction( "songs", "lives", "create" )
//exports.OnDeleteLiveOfSong = createCompatibleFunction( "songs", "lives", "delete" )
//exports.OnCreateSongOfLive = createCompatibleFunction( "lives", "songs", "create" )
//exports.OnDeleteSOngOfLive = createCompatibleFunction( "lives", "songs", "delete" )

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

//シリーズとエピソード
/*
exports.OnCreateSeriesOfEpisode = createCompatibleFunction( "episodes", "series", "create" )
exports.OnDeleteSeriesOfEpisode = createCompatibleFunction( "episodes", "series", "delete" )
exports.OnCreateEpisodeOfSeries = createCompatibleFunction( "series", "episodes", "create" )
exports.OnDeleteEpisodeOfSeries = createCompatibleFunction( "series", "episodes", "delete" )
*/
