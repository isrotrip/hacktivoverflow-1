<template>
  <div> 

    <!-- Modal -->
    <div
      class="modal fade"
      id="login-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div
        class="modal-dialog"
        role="document">
        <!-- Material form login -->
        <div
          class="modal-content"
          style="border-radius: 10px">

          <h5 class="card-header info-color white-text text-center py-4">
            <strong>Log In</strong>
          </h5>

          <!--modal content-->
          <div
            class="cart-header px-lg-5 pt-0"
            style="margin: 30px">

            <!-- Form -->
            <form
              class="text-center"
              style="color: #757575;"
              @submit.prevent="loginWebsite">

              <!-- Email -->
              <div class="form">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email.."
                  v-model="email">
              </div>

              <!-- Password -->
              <div class="form">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password.."
                  v-model="password">
              </div>

              <!-- Sign in button -->
              <button
                class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0 hover-skyblue" 
                type="submit">
                Log in
              </button>

              <!-- Register -->
              <p>Not a member?
                <button
                  type="button"
                  class="btn btn-primary transparent-background"
                  @click="showRegister()">
                  Register
                </button>
              </p>

              <!-- Social login -->
              <p>or log in with:</p>
              
              <a type="button"
                class="btn-floating btn-fb btn-sm social-media-login">
                <i class="fab fa-google"></i>
              </a>
              
              <a type="button"
                class="btn-floating btn-fb btn-sm social-media-login">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a type="button"
                class="btn-floating btn-tw btn-sm social-media-login">
                <i class="fab fa-twitter"></i>
              </a>
              <a type="button"
                class="btn-floating btn-li btn-sm social-media-login">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a type="button"
                class="btn-floating btn-git btn-sm social-media-login">
                <i class="fab fa-github"></i>
              </a>

            </form>
            <!-- Form -->

          </div>

        </div>
        <!-- Material form login -->
      </div>
    </div>
  </div>
</template>

<script>

import serverAPI from '@/api/serverAPI'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapMutations([
        'CHANGE_LOGIN_STATE'
      ]),
    showRegister() {
      $('#login-modal').modal('toggle')
      $('#register-modal').modal('toggle')
    },
    clearForm() {
      this.email = ''
      this.password = ''
    },
    loginWebsite() {
      serverAPI
        .post('/users/login', {
          email: this.email,
          password: this.password,
          loginVia: 'website'
        })
        .then(({ data }) => {
          $('#login-modal').modal('toggle')
          this.clearForm()
          this.successSWAL(data.message)
          this.setLocalStorage(data)
          this.CHANGE_LOGIN_STATE()
        })
        .catch(({ response }) => {
          this.failSWAL(response.data.message)
        })
    },
    setLocalStorage(loginPayload) {
      localStorage.setItem('token', loginPayload.token)
      localStorage.setItem('name', loginPayload.userLogin.name)
      localStorage.setItem('id', loginPayload.userLogin._id)
      if(loginPayload.userLogin.watchTag) {
        localStorage.setItem('watchTag', loginPayload.userLogin.watchTag.join(','))
      } else {
        localStorage.setItem('watchTag', '')
      }
    }
  }
}
</script>

<style>

</style>
