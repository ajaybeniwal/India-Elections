var App = angular.module('testdirectivemodule', []);
// Set up a controller and define a model




// Bootstrap the Application
App.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', { templateUrl: '/partials/indexpage.html', controller: indexcontroller, resolve: indexcontroller.resolve });
    $routeProvider.when('/assemblyelections', { templateUrl: '/partials/assemblyelections.html' });
    $routeProvider.when('/politicalPartyDetail', { templateUrl: '/partials/PoliticalPartyDetail.html', controller: partyCandidateList, resolve: partyCandidateList.resolve });
    $routeProvider.when('/ConstituencyByState', { templateUrl: '/partials/ConstituencyByState.html', controller: constituecyStatecontroller, resolve: constituecyStatecontroller.resolve });
    $routeProvider.when('/Constituency', { templateUrl: '/partials/Constituency.html', controller: constituecycontroller, resolve: constituecycontroller.resolve });
    $routeProvider.when('/api/ConstituencyAssembly', { templateUrl: '/partials/ConstituencyAssembly.html', controller: constituecyAssemblycontroller, resolve: constituecyAssemblycontroller.resolve });
    $routeProvider.when('/constituencyDetail/:id', { templateUrl: '/partials/ConstituencyDetail.html', controller: constituencydetailcontroller });
    $routeProvider.when('/api/HeavyWeights', { templateUrl: '/partials/HeavyWeight.html', controller: heavyweightController, resolve: heavyweightController.resolve });
    $routeProvider.when('/api/HeavyWeightsAssembly/:id', { templateUrl: '/partials/HeavyWeightAssembly.html', controller: heavyweightAssemblyController, resolve: heavyweightAssemblyController.resolve });
    $routeProvider.when('/contestingCandidate/:id', { templateUrl: '/partials/ConstestingCandidate.html', controller: contestingCandidate });
    $routeProvider.when('/contestingAssemblyCandidate/:id', { templateUrl: '/partials/ConstestingCandidate.html', controller: contestingAssemblyCandidate, resolve: contestingAssemblyCandidate.resolve });
    $routeProvider.when('/api/assemblyelections/:id', {
        templateUrl: '/partials/AssemblyDetail.html', controller: assemblyDetailController,
        resolve: {
            responseData: ['$http', '$route', function ($http, $route) {
                /*return $http.get('/Candidate/GetAssemblyConstituency?statename=' + $route.current.params.id).then(function (response) {
                 return response.data;
             });*/

                return $http({
                    method: 'GET',
                    // url: '/Candidate/GetAssemblyConstituency?statename=' + $route.current.params.id,
                    url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/AssemblyElectionConstituency?q={"State":"' + $route.current.params.id + '"}&apiKey=50920bb9e4b010d72c561d8a',
                    cache: true
                });
            }],
        }
    });
    $routeProvider.when('/politicalParties', { templateUrl: '/partials/politicalParty.html', controller: loksabhaparty, resolve: loksabhaparty.resolve });
    $routeProvider.when('/api/politicalPartyAssembly', { templateUrl: '/partials/PoliticalPartyAssembly.html', controller: assemblyParty });
    $routeProvider.when('/candidateDetail/:id', { templateUrl: '/partials/CandidateDetail.html', controller: candidateDetailcontroller });
    $routeProvider.when('/candidateAssemblyDetail/:id', { templateUrl: '/partials/CandidateDetailAssembly.html', controller: candidateAssemblyDetailcontroller });
    $routeProvider.when('/candidate', { templateUrl: '/partials/Candidate.html', controller: candidatecontroller });
    $routeProvider.when('/candidateAssembly', { templateUrl: '/partials/CandidateAssembly.html', controller: candidatecontroller });
    $routeProvider.when('/api/Schedule', { templateUrl: '/partials/Schedule.html', controller: loksabhaschedulecontroller, resolve: loksabhaschedulecontroller.resolve });
    $routeProvider.when('/api/ScheduleAssembly/:id', { templateUrl: '/partials/ScheduleAssembly.html', controller: assemblyschedulecontroller, resolve: assemblyschedulecontroller.resolve });
    $routeProvider.when('/Popular', { templateUrl: '/partials/Popular.html' });
    $routeProvider.when('/api/ExitPoll', {
        templateUrl: '/partials/ExitPoll.html', controller: exitpollController, resolve: {
            responseData: ['$http', function ($http) {
                return $http.get('https://api.mongolab.com/api/1/databases/benisoftlabs/collections/ExitPolls?apiKey=50920bb9e4b010d72c561d8a').then(function (response) {
                    return response.data;
                });
            }],

        }
    });

    $routeProvider.when('/api/ExitLokSabha', {
        templateUrl: '/partials/ExitLokSabha.html', controller: exitpollController, resolve: {
            responseData: ['$http', function ($http) {
                return $http.get('https://api.mongolab.com/api/1/databases/benisoftlabs/collections/ExitPolls?apiKey=50920bb9e4b010d72c561d8a').then(function (response) {
                    return response.data;
                });
            }],

        }
    });
    $routeProvider.when('/api/ExitAssembly/:id', {
        templateUrl: '/partials/ExitPollAssemblyDetail.html', controller: exitpollAssemblyController, resolve: {
            responseData: ['$http', '$routeParams', '$route', function ($http, $routeParams, $route) {
                return $http.get('https://api.mongolab.com/api/1/databases/benisoftlabs/collections/ExitPollAssemblyState?q={"State":"' + $route.current.params.id + '"}&apiKey=50920bb9e4b010d72c561d8a').then(function (response) {
                    return response.data;
                });
            }],
        }
    });

    $routeProvider.when('/api/ExitAssembly', {
        templateUrl: '/partials/ExitPollAssembly.html', controller: exitpollAssemblyController, resolve: {
            responseData: ['$http', function ($http) {
                return $http.get('https://api.mongolab.com/api/1/databases/benisoftlabs/collections/ExitPollAssemblyState?q={"State":"Karnataka"}&apiKey=50920bb9e4b010d72c561d8a').then(function (response) {
                    return response.data;
                });
            }],
        }
    });

    $routeProvider.when('/api/generalelections', {
        templateUrl: '/partials/GeneralElection.html', controller: generalController, resolve: {
            responseData: ['$http', function ($http) {
                /*return $http.get('https://api.mongolab.com/api/1/databases/benisoftlabs/collections/Constituency?apiKey=50920bb9e4b010d72c561d8a').
                    then(function (response)
                    {
                    return response.data;
                });*/

                return $http({
                    method: 'GET',
                    url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/Constituency?apiKey=50920bb9e4b010d72c561d8a',
                    cache: true
                });
            }],

        }
    });
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');
    
}]);


function constituencydetailcontroller($scope, $http, $routeParams) {
    $scope.currvalue = $routeParams.id;
}


function assemblyschedulecontroller($scope, $http, $routeParams,$rootScope, schedulelist) {
    $scope.schedulelist = schedulelist.data;
    $scope.selectedState = $routeParams.id;
    $rootScope.status = 'ready';
}

assemblyschedulecontroller.resolve = {
    schedulelist: function ($http, $route) {
        return $http({
            method: 'GET',
            url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/AssemblySchedule?q={"State":"' + $route.current.params.id + '"}&apiKey=50920bb9e4b010d72c561d8a'
        });
    }
}




function indexcontroller($scope, $http,$rootScope,tweetilist) {
    $scope.twitterdata = tweetilist.data;
    $rootScope.status = 'ready';
}

indexcontroller.resolve = {
    tweetilist: function ($http, $route) {
        var url = "https://api.twitter.com/1/statuses/user_timeline/narendramodi.json?callback=JSON_CALLBACK&count=5"
        return $http.jsonp(url);
    }
}



function loksabhaparty($scope, $http, $routeParams, partylist, $rootScope) {
    $scope.state = [{ name: 'Delhi', shade: 'Delhi' }, { name: 'Madhya Pradesh', shade: 'Madhya Pradesh' }, { name: 'Rajasthan', shade: 'Rajasthan' }, { name: 'Jharkand', shade: 'Jharkand' }, { name: 'Chattisgarh', shade: 'Chattisgarh' }];
    $scope.partylist = partylist.data;
    $scope.showflag = false;
    $scope.showcandidate = function (partyname) {
        $scope.selectedparty = partyname;
        $scope.selectedstate = '';
        $http({ method: 'GET', url: '/Candidate/getLokSabhaPartyCandidates?partyname=' + $scope.selectedparty }).
          success(function (data, status, headers, config) {
              $scope.candidatedata = data;
              $rootScope.visible = false;
              $scope.showflag = true;
          }).error(function (data, status, headers, config) {
              $rootScope.visible = false;
          });
    }
    $scope.change = function () {
        $rootScope.visible = true;
        if ($scope.selectedstate) {
            $http({ method: 'GET', url: '/Candidate/getLokSabhaPartyCandidates?partyname=' + $scope.selectedparty + '&' + 'statename=' + $scope.selectedstate.name }).
               success(function (data, status, headers, config) {
                   $scope.candidatedata = data;
                   $rootScope.visible = false;
                   $scope.showflag = true;
               }).error(function (data, status, headers, config) {
                   $rootScope.visible = false;
               });
        }
        else {
            $http({ method: 'GET', url: '/Candidate/getLokSabhaPartyCandidates?partyname=' + $scope.selectedparty }).
         success(function (data, status, headers, config) {
             $scope.candidatedata = data;
             $rootScope.visible = false;
             $scope.showflag = true;
         }).error(function (data, status, headers, config) {
             $rootScope.visible = false;
         });
        }
    }
}

loksabhaparty.resolve = {
    partylist: function ($http) {
        return $http({
            method: 'GET',
            url: '/Candidate/getLokSabhaParty'
        });
    }
}


function assemblyParty($scope, $http, $routeParams, $rootScope) {
    $scope.state = [{ name: 'Karnataka', shade: 'Karnataka' }];
    $scope.showflag = false;
    $scope.selectedparty = null;
    $scope.selectedstate = null;
    $rootScope.status = 'ready';
    $scope.showcandidate = function () {
        $rootScope.visible = true;
        $http({
            method: 'GET',
            //            url: '/Candidate/getAssemblyPartyCandidates?partyname=' + $scope.selectedparty.Name + '&' + 'statename=' + $scope.selectedstate.name
            url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/AssemblyPartyCandidates?q={"State":"' + $scope.selectedstate.name + '","PartyName":"' + $scope.selectedparty.Name + '"}&apiKey=50920bb9e4b010d72c561d8a'
        }).
          success(function (data, status, headers, config) {
              $scope.candidatedata = data;
              $rootScope.visible = false;
              $scope.showflag = true;
          }).error(function (data, status, headers, config) {
              $rootScope.visible = false;
          });
    }
    $scope.change = function () {
        if ($scope.selectedstate) {
            $rootScope.visible = true;
            $http({
                method: 'GET',
                url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/AssemblyParty?q={"State":"' + $scope.selectedstate.name + '"}&apiKey=50920bb9e4b010d72c561d8a'
            }).
               success(function (data, status, headers, config) {
                   $scope.partylist = data;
                   $rootScope.visible = false;
               }).error(function (data, status, headers, config) {
                   $rootScope.visible = false;
               });
        }

    }
}




function loksabhaschedulecontroller($scope, $http,$rootScope,schedulelist) {
    $scope.schedulelist = schedulelist.data;
    $rootScope.status = 'ready';
}

loksabhaschedulecontroller.resolve = {
    schedulelist: function ($http) {
        return $http({
            method: 'GET',
            //url: '/Candidate/getLokSabhaSchedule'
            url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/LokSabhaSchedule?apiKey=50920bb9e4b010d72c561d8a'

        });
    }
}


function candidatecontroller($scope, $http, $rootScope) {
    $scope.candidatedata = null;
    $scope.visibilityflag = false;
    $scope.search = function () {
        $rootScope.visible = true;
        $http({ method: 'GET', url: '/Candidate/GetCandidateLittleDetails?candidateName=' + $scope.query }).
              success(function (data, status, headers, config) {
                  $rootScope.visible = false;
                  data = data[0];
                  $scope.ContenstingAssembly = data.ContenstingAssembly;
                  $scope.Name = data.Name;
                  $scope.LittleSummary = data.LittleSummary;
                  $scope.ImgLocation = data.ImgLocation;
                  $scope.PartyLogo = data.PartyLogo;
                  $scope.visibilityflag = true;
                  $scope.VoteCount = data.VoteCount;
                  $scope.HomeNo = data.HomeNo;
                  $scope.OfficeNo = data.OfficeNo;
                  $scope.facebookLink = data.facebookLink;
                  $scope.twitterLink = data.twitterLink;
                  $scope.websiteLink = data.websiteLink;
                  $scope.totalAsset = data.totalAsset;
                  $scope.Summary = data.Summary;
                  $scope.OfficeHeld = data.OfficeHeld;

              }).error(function (data, status, headers, config) {
                  alert("error while retreiving candidate data please try later");
                  $rootScope.visible = false;
              });
    }
}



function candidateDetailcontroller($scope, $http, $rootScope, $routeParams) {
    $rootScope.visible = true;
    $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/GeneralCandidate?q={"Name":"' + $routeParams.id + '"}&apiKey=50920bb9e4b010d72c561d8a'
    }).
              success(function (data, status, headers, config) {
                  $rootScope.visible = false;
                  data = data[0];
                  $scope.ContenstingAssembly = data.ContenstingAssembly;
                  $scope.Name = data.Name;
                  $scope.LittleSummary = data.LittleSummary;
                  $scope.ImgLocation = data.ImgLocation;
                  $scope.PartyLogo = data.PartyLogo;
                  $scope.visibilityflag = true;
                  $scope.VoteCount = data.VoteCount;
                  $scope.HomeNo = data.HomeNo;
                  $scope.OfficeNo = data.OfficeNo;
                  $scope.facebookLink = data.facebookLink;
                  $scope.twitterLink = data.twitterLink;
                  $scope.websiteLink = data.websiteLink;
                  $scope.totalAsset = data.totalAsset;
                  $scope.Summary = data.Summary;
                  $scope.OfficeHeld = data.OfficeHeld;
                  $scope.Biography = data.Biography;

              }).error(function (data, status, headers, config) {
                  alert("error while retreiving candidate data please try later");
                  $rootScope.visible = false;
              });

}


function candidateAssemblyDetailcontroller($scope, $http, $rootScope, $routeParams) {
    $rootScope.visible = true;
    $http({
        method: 'GET',
        url: '/Candidate/GetAssemblyCandidateLittleDetails?candidateName=' + $routeParams.id,
        url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/AssemblyCandidate?q={"Name":"' + $routeParams.id + '"}&f={IsHeavyWeight%22:0,%22State%22:0,%22Biography%22:0,%22OfficeNo%22:0,%22facebookLink%22:0,%22totalAsset%22:0,%22twitterLink%22:0}&apiKey=50920bb9e4b010d72c561d8a'
    }).
              success(function (data, status, headers, config) {
                  $rootScope.visible = false;
                  data = data[0];
                  $scope.ContenstingAssembly = data.ContenstingAssembly;
                  $scope.Name = data.Name;
                  $scope.LittleSummary = data.LittleSummary;
                  $scope.ImgLocation = data.ImgLocation;
                  $scope.PartyLogo = data.PartyLogo;
                  $scope.CandidateId = data.CandidateId;
                  $scope.visibilityflag = true;
                  $scope.VoteCount = data.VoteCount;
                  $scope.HomeNo = data.HomeNo;
                  $scope.OfficeNo = data.OfficeNo;
                  $scope.facebookLink = data.facebookLink;
                  $scope.twitterLink = data.twitterLink;
                  $scope.websiteLink = data.websiteLink;
                  $scope.totalAsset = data.totalAsset;
                  $scope.Summary = data.Summary;
                  $scope.OfficeHeld = data.OfficeHeld;
                  $scope.Biography = data.Biography;

              }).error(function (data, status, headers, config) {
                  alert("error while retreiving candidate data please try later");
                  $rootScope.visible = false;
              });

    $scope.upvote = function (candidateid) {
        $http({
            method: 'PUT',
            //url: '/Candidate/UpVoteAssembly/' + candidateid
            url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/AssemblyCandidate?q={CandidateId:' + candidateid + '}&apiKey=50920bb9e4b010d72c561d8a',
            //     data: JSON.stringify({ "$inc": { "VoteCount": 1 } }),
            data: JSON.stringify({ "$inc": { "VoteCount": 1 } }),
            contentType: "application/json"

        }).
           success(function (data, status, headers, config) {
               $scope.VoteCount = $scope.VoteCount + 1;
           }).error(function (data, status, headers, config) {
           });
    }

}

function partyCandidateList($scope, $http, candidatelist) {
    $scope.partycandidatelist = candidatelist.data;
}

partyCandidateList.resolve = {
    candidatelist: function ($http) {
        return $http({
            method: 'GET',
            url: '/Candidate/GetPartyCandidate'
        });
    }
}



function heavyweightAssemblyController($scope, $http, $rootScope, $routeParams, getcandidate) {
    $scope.searchData = getcandidate.data;
    $scope.selectedState = $routeParams.id;
    $rootScope.status = 'ready';
    $scope.upvote = function (candidateid, index) {
        $http({
            method: 'PUT',
            //url: '/Candidate/UpVoteAssembly/' + candidateid
            url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/AssemblyCandidate?q={CandidateId:' + candidateid + '}&apiKey=50920bb9e4b010d72c561d8a',
            data: JSON.stringify({ "$inc": { "VoteCount": 1 } }),
            contentType: "application/json"

        }).
            success(function (data, status, headers, config) {
                $scope.searchData[index].VoteCount = $scope.searchData[index].VoteCount + 1;
            }).error(function (data, status, headers, config) {
            });
    }

}

heavyweightAssemblyController.resolve = {
    getcandidate: function ($http, $route) {
        return $http({
            method: 'GET',
            url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/AssemblyCandidate?q={"IsHeavyWeight":1,"State":"' + $route.current.params.id + '"}&f={IsHeavyWeight%22:0,%22State%22:0,%22Biography%22:0,%22OfficeHeld%22:0,%22OfficeNo%22:0,%22facebookLink%22:0,%22totalAsset%22:0,%22twitterLink%22:0}&apiKey=50920bb9e4b010d72c561d8a'
        });
    }
}
function heavyweightController($scope, $http, $rootScope, getcandidate) {
    $scope.searchData = getcandidate.data;
    $rootScope.status = 'ready';
}

heavyweightController.resolve = {
    getcandidate: function ($http) {
        return $http({
            method: 'GET',
            //url: '/Candidate/GetHeavyWeight'
            url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/GenHeavyWeight?&apiKey=50920bb9e4b010d72c561d8a'

        });
    }
}


function contestingCandidate($scope, $http, $rootScope, $routeParams) {
    $rootScope.visible = true;
    $scope.currvalue = $routeParams.id;
    $http({ method: 'GET', url: '/Candidate/GetCandidateList/' + $routeParams.id }).
     success(function (data, status, headers, config) {
         $scope.searchData = data;
         $rootScope.visible = false;
     }).error(function (data, status, headers, config) {
         $rootScope.visible = false;
     });

    $scope.upvote = function (candidateid, index) {
        $http({ method: 'GET', url: '/Candidate/UpVote/' + candidateid }).
            success(function (data, status, headers, config) {
                $scope.searchData[index].VoteCount = $scope.searchData[index].VoteCount + 1;
            }).error(function (data, status, headers, config) {
            });
    }
}

function contestingAssemblyCandidate($scope, $http, $rootScope, $routeParams, getcandidate) {
    $scope.currvalue = $routeParams.id;
    $scope.searchData = getcandidate.data;
    $scope.upvote = function (candidateid, index) {
        $http({
            method: 'PUT',
            //url: '/Candidate/UpVoteAssembly/' + candidateid
            url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/AssemblyCandidate?q={CandidateId:' + candidateid + '}&apiKey=50920bb9e4b010d72c561d8a',
            data: JSON.stringify({ "$inc": { "VoteCount": 1 } }),
            contentType: "application/json"

        }).
            success(function (data, status, headers, config) {
                $scope.searchData[index].VoteCount = $scope.searchData[index].VoteCount + 1;
            }).error(function (data, status, headers, config) {
            });
    }
}


contestingAssemblyCandidate.resolve = {
    getcandidate: function ($http, $route) {
        return $http({
            method: 'GET',
            url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/AssemblyCandidate?q={"AssemblyName":"' + $route.current.params.id + '"}&apiKey=50920bb9e4b010d72c561d8a'
        });
    }
}

function constituecyStatecontroller($scope, $http, getcandidate) {
    $scope.constituencydata = getcandidate.data;

}
constituecyStatecontroller.resolve = {
    getcandidate: function ($http) {
        return $http({
            method: 'GET',
            url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/ConstituencyByState?apiKey=50920bb9e4b010d72c561d8a'
        });
    }
}


function constituecycontroller($scope, $http, $rootScope, getConstituency) {
    $scope.alphabeticalData = alphabeticalData;
    $scope.selectedGroup = 'A';
    $rootScope.visible = true;
    $scope.constituencydata = getConstituency.data;
    $scope.showGroup = function (groupvalue) {
        $scope.selectedGroup = groupvalue;
        $rootScope.visible = true;
        $http({
            method: 'GET',
            //      url: '/Candidate/getAlphabeticalConstituency?group=' + groupvalue
            url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/Constituency?q={"name" : "/' + groupvalue + '/"}&apiKey=50920bb9e4b010d72c561d8a'
        }).
         success(function (data, status, headers, config) {
             $scope.constituencydata = data;
             $rootScope.visible = false;
         }).error(function (data, status, headers, config) {
             $rootScope.visible = false;
         });
    }
}

constituecycontroller.resolve = {
    getConstituency: function ($http) {
        return $http({
            method: 'GET',
            //  url: '/Candidate/getAlphabeticalConstituency?group=A'
            url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/Constituency?q={"name" : "/A/"}&apiKey=50920bb9e4b010d72c561d8a'
        });
    }
}

function constituecyAssemblycontroller($scope, $http, $rootScope, getConstituency) {
    $scope.state = [{ name: 'Karnataka', shade: 'Karnataka' }];
    $scope.selectedstate = $scope.state[0];
    $scope.constituencydata = getConstituency.data;
    $rootScope.status = 'ready';
    $scope.change = function () {
        $rootScope.visible = true;
        $http({
            method: 'GET',
            url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/AssemblyElectionConstituency?q={"State":"' + $scope.selectedstate.name + '"}&apiKey=50920bb9e4b010d72c561d8a'
        }).
            success(function (data, status, headers, config) {
                $rootScope.visible = false;
                $scope.constituencydata = data;
            }).error(function (data, status, headers, config) {
                $rootScope.visible = false;
            });
    }
}


constituecyAssemblycontroller.resolve = {
    getConstituency: function ($http) {
        return $http({
            method: 'GET',
            url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/AssemblyElectionConstituency?q={"State":"Karnataka"}&apiKey=50920bb9e4b010d72c561d8a'
        });
    }
}

var alphabeticalData = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']


function exitpollAssemblyController($scope, $http, responseData, $rootScope, $routeParams) {
    $scope.selectedState = $routeParams.id;
    $scope.exitpolldata = responseData;
    $scope.state = [{ name: 'Karnataka', shade: 'Karnataka' }];
    $scope.selectedstate = $scope.state[0];
    $rootScope.status = 'ready';
    $scope.change = function () {
        if ($scope.selectedstate) {
            $rootScope.visible = true;
            $http({ method: 'GET', url: '/Candidate/GetAssemblyExitPoll?selectedstate=' + $scope.selectedstate.name }).
                success(function (data, status, headers, config) {
                    $rootScope.visible = false;
                    $scope.exitpolldata = data;
                }).error(function (data, status, headers, config) {
                    $rootScope.visible = false;
                });
        }
        else {
            $rootScope.visible = true;
            $http({ method: 'GET', url: '/Candidate/GetAssemblyExitPoll?selectedstate=' }).
                success(function (data, status, headers, config) {
                    $rootScope.visible = false;
                    $scope.exitpolldata = data;
                }).error(function (data, status, headers, config) {
                    $rootScope.visible = false;
                });
        }
    }
}

var exitpollController = ['$scope', '$http', 'responseData', '$rootScope',
function ($scope, $http, responseData, $rootScope) {
    $scope.exitpolldata = responseData;
    $rootScope.status = 'ready';
    /* $scope.state = [
     { name: 'Haryana', shade: 'Haryana' },
     { name: 'Punjab', shade: 'Punjab' },
     { name: 'Rajasthan', shade: 'Rajasthan' }
     ];*/

    $scope.change = function () {
        if ($scope.selectedstate) {
            $rootScope.visible = true;
            $http({ method: 'GET', url: '/Candidate/GetLokSabhaExitState?selectedstate=' + $scope.selectedstate.name }).
                success(function (data, status, headers, config) {
                    $rootScope.visible = false;
                    $scope.exitpolldata = data;
                }).error(function (data, status, headers, config) {
                    $rootScope.visible = false;
                });
        }
        else {
            $rootScope.visible = true;
            $http({
                method: 'GET',
                // url: '/Candidate/GetLokSabhaExitState?selectedstate='
                url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/ExitPolls?apiKey=50920bb9e4b010d72c561d8a'

            }).
                success(function (data, status, headers, config) {
                    $rootScope.visible = false;
                    $scope.exitpolldata = data;
                }).error(function (data, status, headers, config) {
                    $rootScope.visible = false;
                });
        }
    }

}];

var generalController = ['$scope', '$http', 'responseData', '$rootScope', function ($scope, $http, responseData, $rootScope) {
    $scope.constituency = responseData.data;
    $scope.query = '';
    $rootScope.visible = false;
    $rootScope.status = 'ready';
    $scope.search = function () {
        $rootScope.visible = true;
        $http({
            method: 'GET',
            url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/LokSabhaData?q={"AssemblyName":"' + $scope.query + '"}&apiKey=50920bb9e4b010d72c561d8a'
        }).
            success(function (data, status, headers, config) {
                $scope.searchData = data;
                $rootScope.visible = false;
            }).error(function (data, status, headers, config) {
            });
    }

    $scope.upvote = function (candidateid, index) {
        $http({
            method: 'PUT',
            url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/LokSabhaData?q={CandidateId:' + candidateid + '}&apiKey=50920bb9e4b010d72c561d8a',
            data: JSON.stringify({ "$inc": { "VoteCount": 1 } }),
            contentType: "application/json"
        }).
            success(function (data, status, headers, config) {
                $scope.searchData[index].VoteCount = $scope.searchData[index].VoteCount + 1;
            }).error(function (data, status, headers, config) {
            });
    }


}];


var assemblyDetailController = ['$scope', '$http', '$routeParams', 'responseData', '$rootScope', function ($scope, $http, $routeParams, responseData, $rootScope) {
    $scope.selectedState = $routeParams.id;
    $scope.constituency = responseData.data;
    $rootScope.status = 'ready';
   /* $scope.$on('searchComplete', function (event,args) {
        alert(event.targetScope);
    })*/
    $scope.query = '';
    $scope.search = function () {
        $rootScope.visible = true;
        $http({
            method: 'GET',
            // url: '/Candidate/GetAssemblyCandidateList/' + $scope.query,
            url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/AssemblyCandidate?q={"AssemblyName":"' + $scope.query + '"}&f={IsHeavyWeight%22:0,%22State%22:0,%22Biography%22:0,%22OfficeHeld%22:0,%22OfficeNo%22:0,%22facebookLink%22:0,%22totalAsset%22:0,%22twitterLink%22:0}&apiKey=50920bb9e4b010d72c561d8a'
        }).
            success(function (data, status, headers, config) {
                $scope.searchData = data;
                $rootScope.visible = false;
              /*  $scope.$emit('searchComplete');*/
            }).error(function (data, status, headers, config) {
                $rootScope.visible = false;
            });
            
    }

    $scope.upvote = function (candidateid, index) {
        $http({
            method: 'PUT',
            //url: '/Candidate/UpVoteAssembly/' + candidateid
            url: 'https://api.mongolab.com/api/1/databases/benisoftlabs/collections/AssemblyCandidate?q={CandidateId:' + candidateid + '}&apiKey=50920bb9e4b010d72c561d8a',
            data: JSON.stringify({ "$inc": { "VoteCount": 1 } }),
            contentType: "application/json"

        }).
            success(function (data, status, headers, config) {
                $scope.searchData[index].VoteCount = $scope.searchData[index].VoteCount + 1;
            }).error(function (data, status, headers, config) {
            });
    }

}];


App.directive('loader', function ($rootScope) {
    return {
        link: function (scope, element, attrs, ctrl) {
            $rootScope.$on("$routeChangeStart", function () {
                $rootScope.visible = true;
            });
            $rootScope.$on("$routeChangeSuccess", function () {
                $rootScope.visible = false;
            });
        }
    }
});

App.directive('test', function () {
    return {
        replace: true,
        template: "<div  class='dropdown span7 ' ng-class='{open:query.length>2}'  style='margin:0px auto;float:none;'><input id='querytext' type='text' class='input-xlarge search-query' placeholder='Enter Constituency to serch' ng-model='query'>\
         <button class='btn' ng-click='search()'><i class='icon-search'></i></button><ul id='one' class='dropdown-menu' style='min-width:285px;'>\
        <li ng-repeat='consti in constituency|filter:query'><a>{{consti.name}}</a></li></ul></div>",
        //        scope: { localprop: '=ngText'},
        scope: false,
        link: function (scope, element, attrs) {
            jQuery("#one").on("click", "li a", function (event) {
                scope.query = jQuery(this).html();
                scope.$apply();
                if (jQuery(element).hasClass('open')) {
                    jQuery(element).removeClass('open');
                }
                event.stopPropagation();
            })
            jQuery("html").bind("click", function () {
                if (jQuery(element).hasClass('open')) {
                    jQuery(element).removeClass('open');
                }
            });
            jQuery("#querytext").on("keydown", function () {
                if (!jQuery(element).hasClass('open') && scope.query.length > 2) {
                    jQuery(element).addClass('open');
                }
            });

        }
    }
});


App.directive('searchbox', function ($http) {
    return {
        replace: true,
        template: "<div class='dropdown' ng-class='{open:query.length>2}'><input id='querytext' type='text' class='input-xlarge search-query' placeholder='Enter Candidate Name to search' ng-model='query'>\
         <button class='btn ' ng-click='search($event)'><i class='icon-search'></i></button><ul id='one' class='dropdown-menu' style='min-width:285px;'>\
        <li ng-repeat='data in candidatedata'><a>{{data.Name}}</a></li></ul></div>",
        scope: false,
        link: function (scope, element, attrs) {
            jQuery("#one").on("click", "li a", function (event) {
                scope.query = jQuery(this).html();
                scope.$apply();
                if (jQuery(element).hasClass('open')) {
                    jQuery(element).removeClass('open');
                }
                event.stopPropagation();
            })
            jQuery("html").bind("click", function () {
                if (jQuery(element).hasClass('open')) {
                    jQuery(element).removeClass('open');
                }
            });
            jQuery("#querytext").on("keydown", function () {
                if (!jQuery(element).hasClass('open') && scope.query.length > 2) {
                    jQuery(element).addClass('open');
                }
            });
            scope.$watch('query.length', function (newvalue, oldvalue) {
                if (newvalue) {
                    if (parseInt(newvalue) > 2) {
                        $http({ method: 'GET', url: '/Candidate/GetCandidate?candidatename=' + scope.query }).
                            success(function (data, status, headers, config) {
                                scope.candidatedata = data;
                            }).error(function (data, status, headers, config) {
                                alert("error while processing the request");
                            });
                    }
                }
            });

        }
    }
});


