<style>

</style>

<template>
	<div>
    <div class="header">
            <h1 style="display: inline-block">Vue.js Sample</h1>
            <div style="display: inline-block" class="text-right">
                <a onclick="auth();" class="square_btn">ログイン</a>
                <a onclick="signout();" class="square_btn">サインアウト</a>
                <span id="auth_info"></span>
            </div>
        <!-- .header --></div>

        <div class="contents">
            <form class="form-horizontal" v-on:submit="update">

                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h2 class="panel-title">追加:{{ edit.type }}</h2>
                    </div>
                    <div class="panel-body">
                        <div class="form-group" v-if="isActiveElements['key']">
                            <label class="col-md-2 control-label">key</label>
                            <div class="col-md-10">
                                <p><input name="key" class="form-control input-lg" type="text" v-model="edit.key" placeholder="key" v-validate="'required|min:4'"></p>
                                <span v-show="errors.has('key')" class="text-danger v-fade" >{{errors.first('key')}}</span>
                            </div>
                        </div>
                        <div class="form-group" v-if="isActiveElements['name']">
                            <label class="col-md-2 control-label">name</label>
                            <div class="col-md-10">
                                <p><input name="name" class="form-control input-lg" type="text" v-model="edit.name" placeholder="Your name" v-validate="'required|min:4'"></p>
                                <span v-show="errors.has('name')" class="text-danger v-fade" >{{errors.first('name')}}</span>
                            </div>
                        </div>
                        <div class="form-group" v-if="isActiveElements['teams']">
                            <label class="col-md-2 control-label">teams</label>
                            <div class="col-md-10">
                                <v-select v-model="edit.teams" :options="teamsOptions" multiple></v-select>
                            </div>
                        </div>
                        <div class="form-group" v-if="isActiveElements['lives']">
                            <label class="col-md-2 control-label">lives</label>
                            <div class="col-md-10">
                                <v-select v-model="edit.lives" :options="livesOptions" multiple></v-select>
                            </div>
                        </div>
                        <div class="form-group" v-if="isActiveElements['characters']">
                            <label class="col-md-2 control-label">characters</label>
                            <div class="col-md-10">
                                <v-select v-model="edit.characters" :options="charactersOptions" multiple></v-select>
                            </div>
                        </div>
                        <div class="form-group" v-if="isActiveElements['songs']">
                            <label class="col-md-2 control-label">songs</label>
                            <div class="col-md-10">
                                <v-select v-model="edit.songs" :options="songsOptions" multiple></v-select>
                            </div>
                        </div>
                        <div class="form-group" v-if="isActiveElements['mds']">
                            <label class="col-md-2 control-label">mds</label>
                            <div class="col-md-10">
                                <v-select v-model="edit.mds" :options="mdsOptions" multiple></v-select>
                            </div>
                        </div>

                    </div>
                    <div class="panel-footer text-right">
                        <button class="btn btn-danger v-fade" type="submit" v-on:click="deleteUserById(editUserId)" v-if="editUserId > -1">削除</button>
                        <button class="btn btn-primary v-fade" type="submit" v-if="true">{{editUserId > -1 ? "更新" : "追加"}}</button>
                    </div>
                </div>

            </form>
        <!-- .contents --></div>
        <div class="sidebar">
            <div :class="'list-header v-fade'">
                <h2>Characters</h2>
            </div>
            <div v-for="character in characters" v-on:click="selectCharacter(character)" :class="'list-item v-fade ' + (isActive('character',character) ? 'active' : '')">
                <dl>
                    <dt>{{character.name}}</dt>
                    <dd>{{character['.key']}}</dd>
                </dl>
            </div>
            <div :class="'list-header v-fade'">
                <h2>Teams</h2>
            </div>
            <div v-for="team in teams" v-on:click="selectTeam(team)" :class="'list-item v-fade ' + (isActive('team',team) ? 'active' : '')">
                <dl>
                    <dt>{{team.name}}</dt>
                    <dd>{{team['.key']}}</dd>
                </dl>
            </div>
        <!-- .sidebar --></div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  
  props:{
    firebaseApp : true
  },

  data: () => ({
    
    teams: [],
    lives: [],
    characters: [],
    songs: [],
    mds: [],
    coordinates: [],
    series: [],
    episodes: [],
    brand: [],

    edit: {
      type: "character",
      key: "",
      name: "",
      teams: [],
      lives: [],
      characters: [],
      songs: [],
      mds: [],
      episodes: []
    },

    editUserId: -1,

    selected: []
  }),
/*
  firebase: ()=> {
    return{
      teams: this.firebaseApp.database().ref("teams"),
      lives: this.firebaseApp.database().ref("lives"),
      characters: this.firebaseApp.database().ref("characters"),
      songs: this.firebaseApp.database().ref("songs"),
      mds: this.firebaseApp.database().ref("mds"),
      coordinates: this.firebaseApp.database().ref("coordinates"),
      series: this.firebaseApp.database().ref("series"),
      episodes: this.firebaseApp.database().ref("episodes"),
      brand: this.firebaseApp.database().ref("brand")
    }
  },
*/
  computed: {
    isActiveElements: function() {
      var elements = [
        "key",
        "name",
        "song",
        "songs",
        "mds",
        "cordinates",
        "episode",
        "team",
        "brand",
        "characters",
        "teams",
        "lives",
        "teams",
        "start_at",
        "end_at",
        "episodes",
        "number",
        "series",
        "title"
      ];
      var types = {
        team: ["name", "characters", "songs", "mds"],
        live: ["md", "coordinates", "episode", "song", "team"],
        coordinate: ["name", "brand", "characters"],
        songs: ["name", "teams", "lives"],
        character: ["key", "name", "teams"],
        md: ["name", "team", "lives"],
        series: ["name", "start_at", "end_at", "episodes"],
        episode: ["number", "series", "title"],
        brand: ["name", "coordinates"]
      };
      var ret = {};
      elements.map(element_name => {
        ret[element_name] = types[this.edit.type].includes(element_name);
      });
      return ret;
    },
    teamsOptions: function() {
      var val = this.teams;
      return val.map(function(item) {
        return { label: item.name, value: item[".key"] };
      });
    },
    livesOptions: function(val) {
      var val = this.lives;
      return val.map(function(item) {
        return { label: item[".key"], value: item[".key"] };
      });
    },
    charactersOptions: function(val) {
      var val = this.characters;
      return val.map(function(item) {
        return { label: item.name, value: item[".key"] };
      });
    },
    songsOptions: function(val) {
      var val = this.songs;
      return val.map(function(item) {
        return { label: item.name, value: item[".key"] };
      });
    },
    mdsOptions: function(val) {
      var val = this.mds;
      return val.map(function(item) {
        return { label: item.name, value: item[".key"] };
      });
    }
  },

  created: function() {

    const ref_names = [
      'teams',
      'lives',
      'characters',
      'songs',
      'mds',
      'coordinates',
      'series',
      'episodes',
      'brand'
    ]

    ref_names.forEach((val)=>{
      this.bind(val)
    })

  },

  methods: {
    bind: function(path){
      this.firebaseApp.database().ref(path).on("value",(snapShot)=>{
        const keys = Object.keys(snapShot.val());
        this.$data[path] = keys.map((key)=>Object.assign(snapShot.val()[key],{".key":key}))
      })
    },
    update: function(e) {
      e.preventDefault();
      switch (this.edit.type) {
        case "character":
          var teams = {};
          for (team of this.edit.teams) {
            teams[team.value] = true;
          }
          var val = {
            name: this.edit.name,
            teams: teams
          };
          this.firebaseApp.database()
            .ref("characters")
            .child(this.edit.key)
            .update(val);
          break;

        case "team":
          var characters = {};
          for (character of this.edit.characters) {
            characters[character.value] = true;
          }
          var songs = {};
          for (song of this.edit.songs) {
            songs[song.value] = true;
          }
          var mds = {};
          for (md of this.edit.mds) {
            mds[md.value] = true;
          }
          var val = {
            name: this.edit.name,
            characters: characters,
            songs: songs,
            mds: mds
          };
          this.firebaseApp.database()
            .ref("teams")
            .child(this.edit.key)
            .update(val);
      }

      this.releaseEditState();
      this.errors.clear();
    },

    selectCharacter: function(character) {
      var data = {};
      data.key = character[".key"];
      data.name = character.name;
      data.teams = this.teamsOptions.filter(val => {
        return Object.keys(character.teams).includes(val.value);
      });
      this.setEditer(data);
      this.edit.type = "character";
    },

    updateTeam: function(e) {
      e.preventDefault();
      var teams = {};
      for (team of this.edit.teams) {
        teams[team.value] = true;
      }
      var val = {
        name: this.edit.name,
        teams: teams
      };
      this.firebaseApp.database()
        .ref("characters")
        .child(this.edit.key)
        .update(val);
      this.releaseEditState();
      this.errors.clear();
      this.edit.type = "character";
    },

    selectTeam: function(team) {
      var data = {};
      data.key = team[".key"];
      data.name = team.name;
      data.characters = this.charactersOptions.filter(val => {
        return Object.keys(team.characters).includes(val.value);
      });
      data.songs = this.songsOptions.filter(val => {
        return Object.keys(team.songs).includes(val.value);
      });
      data.mds = this.mdsOptions.filter(val => {
        return Object.keys(team.mds).includes(val.value);
      });
      this.setEditer(data);
      this.edit.type = "team";
    },

    setEditer: function(data) {
      this.releaseEditState();
      this.edit = Object.assign(this.edit, data);
    },

    releaseEditState: function() {
      this.editUserId = -1;
      this.edit = {
        type: this.edit.type,
        key: "",
        name: "",
        teams: [],
        lives: [],
        characters: [],
        songs: [],
        mds: [],
        episodes: []
      };
    },

    isActive: function(type, value) {
      return type == this.edit.type && value[".key"] == this.edit.key;
    }
  }
};
</script>