
var storage = {
	//存储数据
	set(key,value){
		localStorage.setItem(key,JSON.stringify(value));
	},

	//获取数据
	get(key){
		return JSON.parse(localStorage.getItem(key));
	},

	//删除数据
	remove(key){
		localStorage.removeItem(key);
	}

}

export default storage;