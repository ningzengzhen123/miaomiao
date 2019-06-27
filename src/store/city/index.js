import Storage from '@/model/storage'

const state = {
	nm:Storage.get('nowNm') ? Storage.get('nowNm') : "重庆",
	id:Storage.get('nowId') ? Storage.get('nowId') : 45
};


const actions = {
	
};

const mutations = {
	CITY_INFO(state,payload){
		state.nm = payload.nm;
		state.id = payload.id;
	}
};

export default {
	namespaced:true,
	state,
	actions,
	mutations
}