import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null, 
    isAuthenticated: false,
    preferences: {
      unit: '°C'
    }
  },
  mutations: {

    SET_USER(state, userData) {
      state.user = userData;
      state.isAuthenticated = true;
    },

    LOGOUT(state) {
      state.user = null;
      state.isAuthenticated = false;
    },

    SET_UNIT(state, newUnit) {
      state.preferences.unit = newUnit;
    },

    TOGGLE_FAVORITE(state, nombreIsla) {
        if (state.user) {
            const index = state.user.favorites.indexOf(nombreIsla);
        if (index > -1) {
            state.user.favorites.splice(index, 1);} 
        else {
            state.user.favorites.push(nombreIsla);}
            localStorage.setItem('user_session', JSON.stringify(state.user));
  }
}
  },
  actions: {
    // Lógica de Login
    login({ commit }, { email, password }) {

      if (email && password) {
        const fakeUser = {
          email: email,
          username: email.split('@')[0], 
          favorites: ['Alabasta', 'Wano'] 
        };
        commit('SET_USER', fakeUser);
        return true;
      }
      return false;
    }
  }
});