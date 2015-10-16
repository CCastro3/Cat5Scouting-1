/*
  Much of the code in this file and services.js that has to do with SQLite is
  derived from the gist created by Borris Sondagh, here: 
  https://gist.github.com/borissondagh/29d1ed19d0df6051c56f
*/
angular.module('cat5scouting.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('HomeCtrl', function($scope, $stateParams) {
  
})

.controller('MatchCtrl', function($scope, Team) {
  $scope.teams = [];
  $scope.teams = null;
  
  $scope.updateTeam = function() {
    Team.all().then(function(teams) {
      $scope.teams = teams;
    })
  }
  
  $scope.updateTeam();
})

.controller('PitCtrl', function($scope, Team) {
  $scope.teams = [];
  $scope.teams = null;
  
  $scope.updateTeam = function() {
    Team.all().then(function(teams) {
      $scope.teams = teams;
    })
  }
  
  $scope.updateTeam();
})

.controller('SyncCtrl', function($scope, $stateParams) {
  
})

.controller('SettingsCtrl', function($scope, $stateParams) {
  
})

.controller('PitScoutingController', function($scope, $stateParams, Robot) {
  ///TODO Convert these to SQLite database calls
  /*
    teamName: the name of the team; values provided via PitCtrl controller
    robotName: the name of the robot that a team has
    driveMode: the type of wheels/locomotion that the robot uses
    driveSpeed: how fast the robot can move about the field
    driveOverPlatform: whether the robot is capable of driving over the platform
    autonomousCapability: what the robot can accomplish during autonomous play
    coopStep: how many totes the robot can load onto the cooperative step
    pickupLoc: where the robot can retrieve totes from on the field
    maxToteHeight: the maximum # of totes the robot can stack
    maxContHeight: the maximum # of totes the robot can top with a container
    stackContInd: can the robot stack containers independently?
    collectContStep: can the robot collect a container from the step?
    note: free-form field for providing additional observations
  */
  
  $scope.data = {
    yesNo: [
      {id: '0', name: '[Unknown]'},
      {id: '1', name: 'Yes'},
      {id: '2', name: 'No'}
    ],
    team: null,
    robot: null,
    driveMode: null,
    driveModes: [
      {id: '0', name: '[Unknown]'},
      {id: '1', name: 'KOP'},
      {id: '2', name: 'Mecanum'},
      {id: '3', name: 'Omni'},
      {id: '4', name: 'Omni'}
    ],
    driveSpeed: null,
    driveSpeeds: [
      {id: '0', name: '[Unknown]'},
      {id: '1', name: 'Slow'},
      {id: '2', name: 'Medium'},
      {id: '3', name: 'Fast'}
    ],
    driveOverPlatform: null,
    autonomousCapability: null,
    autonomousCapabilities: [
      {id: '0', name: '[Unknown]'},
      {id: '1', name: 'Bot set'},
      {id: '2', name: 'Tote set'},
      {id: '3', name: 'Container set'},
      {id: '4', name: 'Stacked Tote set'},
      {id: '5', name: 'None'}
    ],
    coopStep: null,
    coopStepOptions: [
      {id: '0', name: '[Unknown]'},
      {id: '1', name: '0'},
      {id: '2', name: '1'},
      {id: '3', name: '2'},
      {id: '4', name: '3'},
      {id: '5', name: 'None'}
    ],
    pickupLoc: null,
    pickupLocs: [
      {id: '0', name: '[Unknown]'},
      {id: '1', name: 'Feed station'},
      {id: '2', name: 'Landfill'},
      {id: '3', name: 'Neither'},
      {id: '4', name: 'Both'}
    ],
    maxToteHeight: null,
    maxToteHeights: [
      {id: '0', name: '[Unknown]'},
      {id: '1', name: '0'},
      {id: '2', name: '1-2'},
      {id: '3', name: '3-4'},
      {id: '4', name: '5-6'}
    ],
    maxContHeight: null,
    maxContHeights: [
      {id: '0', name: '[Unknown]'},
      {id: '1', name: '0'},
      {id: '2', name: '1-2'},
      {id: '3', name: '3-4'},
      {id: '4', name: '5-6'}
    ],
    stackContInd: null,
    collectContStep: null,
    note: null
  }
  
  /*
    This function is called when the user changes the team. It loads values for
    the fields from the SQLite database or, if there is no record for the 
    selected team, it sets all of the fields to [Unknown]. 
  */
  $scope.selectTeam = function() {
    //retrieve the robot(s) for the selected team
    Robot.get($scope.team.id).then(function(robots) {
      $scope.robots = robots;
    })
    
    //TODO: replace the following with values retrieved from SQLite
    $scope.data.driveMode = $scope.data.driveModes[0];
    $scope.data.driveSpeed = $scope.data.driveSpeeds[0];
    $scope.data.driveOverPlatform = $scope.data.yesNo[0];
    $scope.data.autonomousCapability = $scope.data.autonomousCapabilities[0];
    $scope.data.coopStep = $scope.data.coopStepOptions[0];
    $scope.data.pickupLoc = $scope.data.pickupLocs[0];
    $scope.data.maxToteHeight = $scope.data.maxToteHeights[0];
    $scope.data.maxContHeight = $scope.data.maxContHeights[0];
    $scope.data.stackContInd = $scope.data.yesNo[0];
    $scope.data.collectContStep = $scope.data.yesNo[0];
  }
  
  
  /*
    This function is called each time entry pauses for more than 0.5 seconds
    in the form on the Pit Scouting page.
  */
  $scope.writeData = function() {
    //TODO: Fill in once the SQLite database is configured
  }
})

.controller('MatchScoutingController', function($scope, $stateParams, Robot, Match) {
  /*
    teamName: the name of the team
    robotName: the name of the robot that a team has
    matchNum: the match during which data was retrieved
    driveSpeed: how fast the robot can move about the field
    driveOverPlatform: whether the robot is capable of driving over the platform
    botSet: was the robot able to create a Robot Set?
    toteSet: was the robot able to create a Tote Set?
    containerSet: was the robot able to create a Container Set?
    stackedToteSet: was the robot able to create a Stacked Tote Set?
    coopScoreStep: how many points did the robot score on the cooperative step?
    feedstation: did the robot collect from the human player station?
    landfill: did the robot pick up from the landfill?
    scoredToteHeight: what is the highest number of totes the robot stacked?
    containerStep: did the robot pick up a container from the step?
    scoredIndContainerHeight: [TODO: Consult with Brandon on this field]
    scoredContainerHeight: [TODO: Consult with Brandon on this field]
  */
  $scope.data = null;
  $scope.resetData = function() {
    $scope.data = {
      yesNo: [
        {id: '0', name: '[Unknown]'},
        {id: '1', name: 'Yes'},
        {id: '2', name: 'No'}
      ],
      team: null,
      robot: null,
      match: null,
      driveSpeed: null,
      driveSpeeds: [
        {id: '0', name: '[Unknown]'},
        {id: '1', name: 'Slow'},
        {id: '2', name: 'Medium'},
        {id: '3', name: 'Fast'}
      ],    
      driveOverPlatform: null,
      botSet: null,
      toteSet: null,
      containerSet: null,
      stackedToteSet: null,
      coopScoreStep: null,
      feedstation: null,
      landfill: null,
      scoredToteHeight: null,
      containerStep: null,
      scoredIndContainerHeight: null,
      scoredContainerHeight: null
    }
  }
  
  $scope.selectTeam = function(team) {
    //retrieve the robot(s) for the selected team
    //TODO: Push this to a service, as it is copied from the Pit controller and
    //we want DRY code
    Robot.get($scope.team.id).then(function(robots) {
      $scope.robots = robots;
    })
  }
  
  //Pull matches out of the database. They are not dependent on other values,
  //so there is no need to wrap them in a function
  Match.all().then(function(matches) {
    $scope.matches = matches;
  })

  /*
    This function is called when the user changes the team or the match. It loads values for
    the fields from the SQLite database or, if there is no record for the 
    selected team, it sets all of the fields to [Unknown]. 
  */
  $scope.selectRobotMatch = function(match) {
    //TODO: populate the model with values retrieved from SQLite

  }  
  
  /*
    This function is called each time entry pauses for more than 0.5 seconds
    in the form on the Match Scouting page.
  */
  $scope.writeData = function() {
    //TODO: Fill in once the SQLite database is configured
  }  
});
