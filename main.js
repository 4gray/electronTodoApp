var app = angular.module('todoApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$mdDialog', '$mdToast', function($scope, $mdDialog, $mdToast){

    var _existingTasks = JSON.parse(localStorage.getItem("taskName"));

    // Init Todo List - adding an item to localStorage in case it is empty.
    if (!localStorage.getItem("taskName")) {
        localStorage.setItem("taskName", JSON.stringify({
            1452435614966: {
                name: "Hello",
                done: false,
                id: 1452435614966
            }
        }));
    }
    else {
        // Get all todo-items from local storage
        $scope.locStorTasks = _existingTasks;
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
        var t = $scope.locStorTasks;
        delete t[item];
        localStorage.setItem("taskName", JSON.stringify(t));
    };

    $scope.setContent = function (content) {
        $scope.options.show = content;
    };

    // Add item to the local storage
    $scope.addToLocalStorage = function (name) {
        // Prevent adding of emty tasks
        if (name === undefined) return;

        // Generate random task id
        var newTaskDate = new Date().getTime();

        _existingTasks[newTaskDate] = {
            'name': name,
            'done': false,
            'id': newTaskDate
        };

        // Add item to the view model and local storage
        $scope.locStorTasks[newTaskDate] = _existingTasks[newTaskDate];
        localStorage.setItem("taskName", JSON.stringify(_existingTasks));
        $mdToast.showSimple('Task "' + name + '" was added!');
    };

    // Show form for new task on fab-click
    $scope.showAdd = function(ev) {
        $mdDialog.show({
            controller: AddDialogCtrl,
            templateUrl: 'add-task.html',
            targetEvent: ev
        })
            .then(function(task) {
                $scope.addToLocalStorage(task);
            });
    };

}]);

function AddDialogCtrl($scope, $mdDialog) {
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.add = function(task) {
        $mdDialog.hide(task);
    };
}