var config = {
	apiKey: "AIzaSyDY30PPVzuDZYx92ONHKdqL0zXopHizDxw",
	authDomain: "prickathon.firebaseapp.com",
	databaseURL: "https://prickathon.firebaseio.com",
	projectId: "prickathon",
	storageBucket: "prickathon.appspot.com",
	messagingSenderId: "854301723180"
};
firebase.initializeApp(config);

var provider = new firebase.auth.TwitterAuthProvider();

firebase.auth().onAuthStateChanged(function(user) {
	authInfo(user);
});

authInfo();

function authInfo(user){
	if (user) {
		document.getElementById("auth_info").innerHTML = "ログイン中"
	} else {
		document.getElementById("auth_info").innerHTML = "ログインしていません"
	}
}

function auth(){
	firebase.auth().signInWithPopup(provider);
}

function signout(){
	firebase.auth().signOut();
}

;(function(){

	Vue.use(VeeValidate);
	Vue.use(VueFire)
	Vue.component('v-select', VueSelect.VueSelect);

	var app = new Vue({
		el: "#app",

		data: {
			edit: {
				type: "character",
				key: "",
				name: "",
				teams: [],
				lives:[],
				characters:[],
				songs:[],
				mds:[],
				episodes: [],
			},

			editUserId: -1,

			selected:[],
		},

		firebase: {
			teams: firebase.database().ref('teams'),
			lives: firebase.database().ref('lives'),
			characters: firebase.database().ref('characters'),
			songs: firebase.database().ref('songs'),
			mds: firebase.database().ref('mds'),
			coordinates: firebase.database().ref('coordinates'),
			series: firebase.database().ref('series'),
			episodes: firebase.database().ref('episodes'),
			brand: firebase.database().ref('brand'),
		},

		computed: {
			isActiveElements: function(){
				var elements = ['key', 'name', 'song', 'md',
								'cordinates', 'episode', 'team', 'brand', 'character',
								'teams', 'lives', 'teams', 'start_at', 'end_at', 'episodes',
								'number', 'series', 'title'];
				var types = {
					team: ['name', 'characters', 'song', 'md'],
					live: ['md', 'coordinates', 'episode', 'song', 'team'],
					coordinate: ['name', 'brand', 'characters'],
					songs: ['name', 'teams', 'lives'],
					character: ['key', 'name', 'teams'],
					md: ['name', 'team', 'lives'],
					series: ['name', 'start_at', 'end_at', 'episodes'],
					episode: ['number', 'series', 'title'],
					brand: ['name', 'coordinates']
				}
				var ret = {};
				elements.map((element_name)=>{
					console.log(this.edit.type,"hoge");
					ret[element_name] = types[this.edit.type].includes(element_name)
				})
				return ret;
			},
			teamsOptions: function(){
				var val = this.teams;
				return val.map(function(item){
					return { label: item.name, value: item['.key'] }
				});
			},
			livesOptions: function(val){
				var val = this.lives;
				return val.map(function(item){
					return { label: item['.key'], value: item['.key'] }
				});
			},
			charactersOptions: function(val){
				var val = this.characters;
				return val.map(function(item){
					return { label: item.name , value: item['.key'] }
				});
			},
			songsOptions: function(val){
				var val = this.songs;
				return val.map(function(item){
					return { label: item.name , value: item['.key'] }
				});
			},
			mdsOptions: function(val){
				var val = this.mds;
				return val.map(function(item){
					return { label: item.name , value: item['.key'] }
				});
			},
		},

		created: function(){
		},

		methods: {

			updateCharacter: function(e){
				e.preventDefault();
				var teams = {};
				for(team of this.edit.teams){
					teams[team.value] = true;
				}
				var val = {
					name: this.edit.name,
					teams: teams
				}
				firebase.database().ref('characters').child(this.edit.key).update(val);
				this.releaseEditState();
				this.errors.clear();
				this.edit.type = "character";
			},

			selectCharacter: function(character){
				var data = {};
				data.key = character[".key"];
				data.name = character.name;
				data.teams = this.teamsOptions.filter(val => {
					return Object.keys(character.teams).includes(val.value)
				});
				this.setEditer(data);
				this.edit.type = "character";
			},

			setEditer: function(data){
				this.releaseEditState();
				this.edit =  Object.assign(this.edit, data);
			},

			releaseEditState: function(){
				this.editUserId = -1;
				this.edit = {
					type: "",
					key: "",
					name: "",
					teams: [],
					lives:[],
					characters:[],
					songs:[],
					mds:[],
					episodes: [],
				}
			},

			isActive: function(type, value){
				return type==this.edit.type && value['.key']==this.edit.key
			}

		}
	});

}());


