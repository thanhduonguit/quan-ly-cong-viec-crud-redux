import * as types from './../constants/ActionTypes';

var generateString = () => {
    return Math.floor( (1+Math.random() ) * 0x10000).toString(16).substring(1);
}	

var generateID = () => {
    return generateString() + '-' + generateString() + '-' + generateString() + generateString() 
    + '-' + generateString() + generateString() + '-' + generateString();
}

var findIndex = (tasks, id) => {
    var result = -1;
    tasks.forEach((task, index) => {
        if(task.id === id){
            result = index;
        }
    });
    return result;
}

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
	var id = '';
	var index = -1;
	switch (action.type){
		case types.LIST_ALL:
			return state;

		case types.SAVE_TASK:
			var task = {
				id: action.task.id,
				name: action.task.name,
				status: (action.task.status === 'true' || action.task.status === true) ? true : false
			}

		    if (!task.id){
		    	task.id = generateID();
				state.push(task);
		    } else {
		    	index = findIndex(state, task.id);
		    	state[index] = task;
		    }

			localStorage.setItem('tasks', JSON.stringify(state));
			return [...state];         // cú pháp es6, tránh tham chiếu vùng nhớ

		case types.UPDATE_STATUS_TASK:
			id = action.id;
	        index = findIndex(state, id);
	        // clone task mới = task cũ && status = !status
	        //xóa task cũ => push task mới
	        var cloneTask = {...state[index]};
	        cloneTask.status = !cloneTask.status;
	        // state.splice(index, 1);
	        // state.push(cloneTask);      // ham xoas phan tu trong mang
	        state[index] = cloneTask;
            localStorage.setItem('tasks',JSON.stringify(state));
			return [...state];

		case types.DELETE_TASK:
			id = action.id;
	        index = findIndex(state, id);
	        state.splice(index, 1);
	        localStorage.setItem('tasks',JSON.stringify(state));
			return [...state];

		default: 
			return state;
	}
};

export default myReducer;