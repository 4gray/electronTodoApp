var app = angular.module('todoApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$mdDialog', '$mdToast', function($scope, $mdDialog, $mdToast){

	$scope.options = {
		name: 'My Todo List',
		show: 'All tasks'
	};

	$scope.navigationBarItems = [
		{'title': 'All tasks', 'icon': 'list'},
		{'title': 'Todo', 'icon': 'assignment'},
		{'title': 'Done', 'icon': 'done'}
	];

	$scope.myTasks = [
		{'title': 'Learn AngularJs', 'done': false},
		{'title': 'Create first app with Electron', 'done': true}
	];

	$scope.setContent = function (content) {
		$scope.options.show = content;
	};

	$scope.addTask = function (task) {
		$scope.myTasks.unshift({
			'title': task,
			'done': false
		});
	};

	$scope.showAdd = function(ev) {
		$mdDialog.show({
			controller: AddDialogCtrl,
			template: '<md-dialog aria-label="User Form"> <md-content class="md-padding"> <form name="userForm"> <md-input-container> <label>New Task</label> <input ng-model="newTask" placeholder="Placeholder text"> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="cancel()"> Cancel </md-button> <md-button ng-click="add(newTask)" class="md-primary"> Add task </md-button> </div></md-dialog>',
			targetEvent: ev,
		})
		.then(function(task) {
			$scope.addTask(task);
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
};