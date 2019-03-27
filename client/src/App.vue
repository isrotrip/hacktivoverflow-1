<template>
  <div id="app">

    <!-- Button trigger modal -->
    <navigation
      @toggle-tag="toggleTag = !toggleTag"/>
    <tagbar
      :toggle-tag="toggleTag"/>
    
    <!-- Modal -->
    <register/>
    <login/>
    
    <router-view class="mt-4"/>

  </div>
</template>

<script>

import Navigation from '@/components/header.vue'
import Login from '@/components/modal/login.vue'
import Register from '@/components/modal/register.vue'
import Tagbar from '@/components/tagbar.vue'

import { mapActions } from 'vuex'

export default {
  components: {
    Navigation,
    Login,
    Register,
    Tagbar
  },
  data() {
    return {
      toggleTag: false
    }
  },
  created() {
    if(localStorage.getItem('token')) {
      this.verify()
    }
  },
  methods: {
    ...mapActions([
      'verify'
    ])
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.hover-skyblue:hover {
  background-color: rgb(177, 228, 248) !important;
}

.social-media-login {
  background: white !important;
  margin-right: 10px;
}

.social-media-login:hover {
  background-color: skyblue !important;
  margin-right: 10px !important;
}

.transparent-background {
  background-color: grey !important;
  color: black;
  width: auto;
  padding: 5px;
  height: auto;
  font-size: 10px;
}

.header-font {
  font-size: 18px;
  line-height: 20px;
  font-weight: bold;
}

.header-font:hover {
  color: lightblue;
}

.smaller-font {
  font-size: 14px;
  line-height: 20px;
}

.smaller-font:hover {
  color: lightblue;
}

.show-detail {
  cursor: pointer;
}

.show-detail:hover {
  background-color: skyblue;
}

.black-white-button-success:hover {
  background-color: black !important;
  color: white !important;
  border-color: green !important;
}

.black-white-button-danger:hover {
  background-color: black !important;
  color: white !important;
  border-color: red !important;
}

</style>
