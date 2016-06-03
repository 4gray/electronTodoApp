var app = angular.module('todoApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$mdDialog', '$mdToast', 'todoService', function($scope, $mdDialog, $mdToast, todoService){

    // Init Todo List - adding an item to localStorage in case it is empty.
    if (!localStorage.getItem("taskName")) {
        todoService.initTodoList();
        $scope.locStorTasks = todoService.getTodoList();
    }
    else {
        // Get all todo-items from local storage
       $scope.locStorTasks = todoService.getTodoList();
    }

    /* Application options
    * name - name of the application
    * show - default tab, which is active on start
    */
    $scope.options = {
        name: 'My Todo List',
        show: 'All tasks'
    };

    // Menu items description with icon-id of material icon
    $scope.navigationBarItems = [
        {'title': 'All tasks', 'icon': 'list'},
        {'title': 'Todo', 'icon': 'assignment'},
        {'title': 'Done', 'icon': 'done'}
    ];

    // Set task as done
    $scope.updateLocalStorage = function () {
        // Workaround: waiting for model update in $scope
        setTimeout(function () {
            localStorage.setItem("taskName", JSON.stringify($scope.locStorTasks));
        }, 150);
    };

    // Delete task from the list
    $scope.objectDelete = function (item) {
        // remove from view model
        delete $scope.locStorTasks[item];

        // remove from localstorage
        todoService.updateTodoList($scope.locStorTasks);
    };

    $scope.setContent = function (content) {
        $scope.options.show = content;
    };

    // Add item to the local storage
    $scope.addToLocalStorage = function (task) {
        // Prevent adding of emty tasks
        if (task === undefined) return;

        // Add item to the local storage
        todoService.addTask(task);

        // show notification
        $mdToast.showSimple('Task "' + task + '" was added!');

        // clear view model
        $scope.taskName = '';
    };

    // Show form for new task on fab-click
    $scope.showAddDialog = function(ev) {
        $mdDialog.show({
            controller: 'AddDialogCtrl',
            templateUrl: 'add-task.html',
            targetEvent: ev,
            clickOutsideToClose: true
        })
    };

}]);

app.controller('AddDialogCtrl', ['$scope', '$mdDialog', 'todoService', function($scope, $mdDialog, todoService){
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.add = function(task) {
        todoService.addTask(task);
        $mdDialog.hide();
    };
}]);