import firebase from "firebase/app";

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        console.log(dispatch, commit);
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async logout() {
        await firebase.auth().signOut();
    },
    async register({dispatch}, {email, password, name}) {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/users/${uid}/info`).set({
            bill: 10000,
            name
        })
    },
    getUid() {
        const user = firebase.auth().currentUser;
        return user ? user.uid : null;
    }
  },
};
