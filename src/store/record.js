import firebase from "firebase/app";

export default {
    actions: {
        async fetchRecords({commit,dispatch}) {
            try {
                const uid = await dispatch('getUid');
                const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {};
                return Object.keys(records).map(key=>({...records[key], id: key}));
            } catch (error) {
                commit('setError', error);
                throw error;
            }
        },
        async createRecord({commit, dispatch}, record) {
            try {
                const uid = await dispatch('getUid');
                return await firebase.database().ref(`/users/${uid}/records`).push(record);
            } catch (error) {
                commit('setError', error);
                throw error;
            }
        }
    }
}