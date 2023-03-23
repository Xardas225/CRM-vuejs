import { createStore } from 'vuex'
import auth from './auth';
import info from './info';

export default createStore({
  state: {
    error: null
  },
  getters: {
    getError(state) {
      return state.error;
    }
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      const res = await fetch(`https://api.apilayer.com/fixer/latest?base=USD&symbols=EUR,USD,RUB`, {
        headers: {
          apikey: key
        }
      })
      return await res.json();
    }
  },
  modules: {
    auth, info
  }
})
