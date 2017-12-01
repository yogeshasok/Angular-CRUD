

function A($scope,$http){


    console.log("hi from controller1");

  var refresh=function() {
        $http.get("/list").success(function (response) {
            $scope.meetingList = response;
            $scope.chkd=false;
            //$scope.meet1=response;
            $scope.meet = "";
        });
    };
  refresh();


    $scope.addMeet=function(){
        console.log($scope.meet);
        $http.post("/list",$scope.meet).success(function(response){
            console.log("hi i am in post ");
            refresh();
        });
    };

    $scope.delete = function(id){
        console.log(id);
        $http.delete("/list/"+id).success(function(response){
            refresh();
        });
    };

    $scope.edit=function(id){
        console.log(id);
        $http.get("/list/"+id).success(function (response) {
            $scope.meet=response;
            $scope.meet1=response;
            $scope.chkd=false;

        });

    };

    $scope.update=function(){
        console.log($scope.meet._id);
        $http.put("/list/"+$scope.meet._id,$scope.meet).success(function(response){
            refresh();
        });
    };
    $scope.clear=function(){
          $scope.meet="";
        $scope.chkd=false;
    };
    $scope.show=function (id) {
        console.log(id);
        $http.get("/list/"+id).success(function(response){
           // templateUrl:'details.html'
            $scope.chkd=true;
            $scope.meet1=response;
            $scope.meet="";
        });

    };


}
