app.service('todoService', [function(){

    var todoStore;

    return {
    	initTodoList: initTodoList,
        getTodoList: getTodoList,
        addTask: addTask,
        updateTodoList: updateTodoList
    };

    function initTodoList() {
    	localStorage.setItem("taskName", JSON.stringify({
            1452435614966: {
                name: "Hello",
                done: false,
                id: 1452435614966
            }
        }));
    }

    function getTodoList() {
        todoStore = JSON.parse(localStorage.getItem("taskName"));
        return todoStore;
    }

    function addTask(task) {
 		// Prevent adding of emty tasks
        if (task === undefined) return;

        // Generate random task id
        var date = new Date().getTime();

        todoStore[date] = {
            'name': task,
            'done': false,
            'id': date
        };

        // Add item to the view model and local storage
        localStorage.setItem("taskName", JSON.stringify(todoStore));
    }

    function updateTodoList(list) {
    	localStorage.setItem("taskName", JSON.stringify(list));
    }

}]);