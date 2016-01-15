var app = angular.module('todoApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$mdDialog', '$mdToast', function($scope, $mdDialog, $mdToast){


    if (!localStorage.getItem("taskName")) {
        localStorage.setItem("taskName", JSON.stringify({
            1452435614966: {
                name: "Hello",
                done: false,
                id: 1452435614966
            }
        }))
    }

    $scope.options = {
        name: 'My Todo List',
        show: 'All tasks'
    };

    $scope.navigationBarItems = [
        {'title': 'All tasks', 'icon': 'list'},
        {'title': 'Todo', 'icon': 'assignment'},
        {'title': 'Done', 'icon': 'done'}
    ];

    $scope.objectDone = function () {
        var t = $scope.locStorTasks;
        localStorage.setItem("taskName", JSON.stringify(t));
    };

    $scope.objectDelete = function (item) {
        var t = $scope.locStorTasks;
        delete t[item];
        localStorage.setItem("taskName", JSON.stringify(t));
    };

    $scope.setContent = function (content) {
        $scope.options.show = content;
    };

    $scope.addToLocalStorage = function (name) {

        var existingTasks = JSON.parse(localStorage.getItem("taskName"));
        var newTaskDate = new Date().getTime();

        existingTasks[newTaskDate] = {
            'name': name,
            'done': false,
            'id': newTaskDate
        };

        localStorage.setItem("taskName", JSON.stringify(existingTasks));

    };

    $scope.showAdd = function(ev) {
        $mdDialog.show({
            controller: AddDialogCtrl,
            template: '<md-dialog aria-label="User Form"> <md-content class="md-padding"> <form name="userForm"> <md-input-container> <label>New Task</label> <input ng-model="newTask" placeholder="Placeholder text"> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="cancel()"> Cancel </md-button> <md-button ng-click="add(newTask)" class="md-primary"> Add task </md-button> </div></md-dialog>',
            targetEvent: ev
        })
            .then(function(task) {
                $scope.addToLocalStorage(task);
                $mdToast.showSimple('Task "' + task + '" was added!');
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