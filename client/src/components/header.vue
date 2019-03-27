<template>
  <!--Main Navigation-->
  <header>

    <!--Navbar-->
    <nav class="navbar navbar-expand-lg navbar-dark black">

      <!-- Additional container -->
      <div class="container">

        <!-- Navbar brand -->
        <button
          type="button"
          class="btn header-font"
          @click.stop="goToHome">
          Hacktivoverflow
        </button>

        <!-- Collapse button -->
        <button
          class="navbar-toggler"
          type="button" data-toggle="collapse"
          data-target="#basicExampleNav"
          aria-controls="basicExampleNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Collapsible content -->
        <div
          class="collapse navbar-collapse"
          id="basicExampleNav">

          <!-- Links -->
          <ul class="navbar-nav ml-auto">
            <!-- add class active for active page -->
            <li>
              <!-- Button trigger login modal -->
              <button type="button"
                class="btn smaller-font"
                @click.prevent.stop="$emit('toggle-tag')">
                Tags
                <i class="fa fa-hashtag" aria-hidden="true"></i>
              </button>
            </li>
            <li v-if="!isLogin">
              <!-- Button trigger login modal -->
              <button type="button"
                class="btn smaller-font"
                data-toggle="modal"
                data-target="#login-modal">
                Login
                <i class="fa fa-sign-in"></i>
              </button>
            </li>
            <li v-if="!isLogin">
              <!-- Button trigger modal -->
              <button
                type="button"
                class="btn smaller-font"
                data-toggle="modal"
                data-target="#register-modal">
                Register
                <i class="fa fa-registered" aria-hidden="true"></i>
              </button>
            </li>
            <li v-if="isLogin">
              <!-- Button trigger modal -->
              <button
                type="button"
                class="btn smaller-font"
                @click.stop="$router.push('/create')">
                Create Question
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </button>
            </li>
            <li v-if="isLogin">
              <!-- Button trigger modal -->
              <button
                type="button"
                class="btn smaller-font"
                @click.stop="CHANGE_LOGIN_STATE">
                Sign Out
                <i class="fas fa-sign-out-alt"></i>
              </button>
            </li>
            <li style="margin: auto auto">
              <form
              autocomplete="off"
              class="form-inline my-2 my-lg-0"
              @submit.prevent.stop="FILTER_QUESTIONS(findQuestion)">
              <div class="input-group-append">
                <div class="autocomplete auto-filler md-form my-0">
                  <input
                    id="search-questions"
                    class="form-control mr-sm-2"
                    type="text" placeholder="Search Questions..."
                    aria-label="Search" name="searchQuestions"
                    v-model="findQuestion">
                  <button
                    class="btn btn-outline-success my-2 my-sm-0 white-black-button"
                    type="submit"><i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
            </li>
          </ul>
          <!-- Links -->

        </div>
        <!-- Collapsible content -->

      </div>
      <!-- Additional container -->

    </nav>
    <!--/.Navbar-->

  </header>
  <!--Main Navigation-->
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      findQuestion: ''
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'clearFindQuestion',
      'filteredQuestions'
    ])
  },
  watch: {
    clearFindQuestion(val) {
      if(val) {
        this.clearFindQuestion = ''
        this.CHANGE_FIND_QUESTION_STATUS()
      }
    }
  },
  methods: {
    ...mapMutations([
      'CHANGE_LOGIN_STATE',
      'CHANGE_FIND_QUESTION_STATUS',
      'FILTER_QUESTIONS'
    ]),
    goToHome(){
      this.$router.push('/')
      this.FILTER_QUESTIONS('')
    }
  }
}
</script>

<style>

.white-black-button {
  border-color: white !important;
  color: white !important;
  padding: 0px 18px;
}

.white-black-button:hover {
  background: white !important;
  border-color: white !important;
  color: black !important;
}

</style>
