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
        async fetchRecordById({commit,dispatch}, id) {
            try {
                const uid = await dispatch('getUid');
                const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {};
                return {...record, id: id};
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