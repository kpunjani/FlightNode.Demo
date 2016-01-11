'use strict';

// Every *generic* endpoint below should end with a trailing slash

angular.module('flightNodeApp')
  .constant('config', {
    locations: 'http://localhost:50323/api/v1/locations/',
    locationsSimpleList: 'http://localhost:50323/api/v1/locations/simple',
    users: 'http://localhost:50323/api/v1/users/',
    usersSimpleList: 'http://localhost:50323/api/v1/users/simplelist',
    workLogs: 'http://localhost:50323/api/v1/worklogs/',
    workLogsForUser: 'http://localhost:50323/api/v1/worklogs/my',
    exportWorkLogs: 'http://localhost:50323/api/v1/worklogs/export/',
    workTypes: 'http://localhost:50323/api/v1/worktypes/',
    workTypesSimpleList: 'http://localhost:50323/api/v1/worktypes/simple',
    token: 'http://localhost:50323/oauth/token', // should not have trailing slash
    navigation: 'http://localhost:50323/api/v1/nav',
    roles: 'http://localhost:50323/api/v1/roles/', 
    birdspecies: 'http://localhost:50323/api/v1/birdspecies/'
  });