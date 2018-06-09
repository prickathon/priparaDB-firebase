<style>

</style>

<template>
	<div>
    <div class="header">
            <h1 style="display: inline-block">Vue.js Sample</h1>
            <login></login>
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
                                <fire-select v-model="edit.teams" :options="teams" :label-key="'name'"></fire-select>
                            </div>
                        </div>
                        <div class="form-group" v-if="isActiveElements['lives']">
                            <label class="col-md-2 control-label">lives</label>
                            <div class="col-md-10">
                                <fire-select v-model="edit.lives" :options="lives" :label-key="'name'"></fire-select>
                            </div>
                        </div>
                        <div class="form-group" v-if="isActiveElements['characters']">
                            <label class="col-md-2 control-label">characters</label>
                            <div class="col-md-10">
                                <fire-select v-model="edit.characters" :options="characters" :label-key="'name'"></fire-select>
                            </div>
                        </div>
                        <div class="form-group" v-if="isActiveElements['songs']">
                            <label class="col-md-2 control-label">songs</label>
                            <div class="col-md-10">
                                <fire-select v-model="edit.songs" :options="songs" :label-key="'name'"></fire-select>
                            </div>
                        </div>
                        <div class="form-group" v-if="isActiveElements['mds']">
                            <label class="col-md-2 control-label">mds</label>
                            <div class="col-md-10">
                                <fire-select v-model="edit.mds" :options="mds" :label-key="'name'"></fire-select>
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
            <div v-for="character in characters" :key="character['.key']" v-on:click="selectCharacter(character)" :class="'list-item v-fade ' + (isActive('character',character) ? 'active' : '')">
                <dl>
                    <dt>{{character.name}}</dt>
                    <dd>{{character['.key']}}</dd>
                </dl>
            </div>
            <div :class="'list-header v-fade'">
                <h2>Teams</h2>
            </div>
            <div v-for="team in teams" :key="team['.key']" v-on:click="selectTeam(team)" :class="'list-item v-fade ' + (isActive('team',team) ? 'active' : '')">
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
import FireSelect from "./fire-select.vue"
import Login from "./login.vue"

import { firebaseApp } from './firebaseApp.js';

export default {

  components: {
    'fire-select' : FireSelect,
    'login' : Login
  },

  data: () => ({

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

  firebase: ()=> {
    return{
      teams: firebaseApp.database().ref("teams"),
      lives: firebaseApp.database().ref("lives"),
      characters: firebaseApp.database().ref("characters"),
      songs: firebaseApp.database().ref("songs"),
      mds: firebaseApp.database().ref("mds"),
      coordinates: firebaseApp.database().ref("coordinates"),
      series: firebaseApp.database().ref("series"),
      episodes: firebaseApp.database().ref("episodes"),
      brand: firebaseApp.database().ref("brand")
    }
  },

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

    /*ref_names.forEach((val)=>{
      this.bind(val)
    })*/
  },

  methods: {
    bind: function(path){
      firebaseApp.database().ref(path).on("value",(snapShot)=>{
        const keys = Object.keys(snapShot.val());
        this.$data[path] = keys.map((key)=>Object.assign(snapShot.val()[key],{".key":key}))
        console.log(this.$data)
      })
    },
    update: function(e) {
      e.preventDefault();
      console.log(this.edit);
      switch (this.edit.type) {
        case "character":
          var val = {
            name: this.edit.name,
            teams: this.edit.teams
          };
          firebaseApp.database()
            .ref("characters")
            .child(this.edit.key)
            .update(val);
          break;

        case "team":
          var val = {
            name: this.edit.name,
            characters: this.edit.characters,
            songs: this.edit.songs,
            mds: this.edit.mds
          };
          firebaseApp.database()
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
      data.teams = character.teams || [];
      this.setEditer(data);
      this.edit.type = "character";
    },

    selectTeam: function(team) {
      var data = {};
      data.key = team[".key"];
      data.name = team.name;
      data.characters = team.characters || [];
      data.songs = team.songs || [];
      data.mds = team.mds || [];
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
        teams2: [],
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