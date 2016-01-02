'use strict';

// Every endpoint below should end with a trailing slash

angular.module('flightNodeApp')
  .constant('config', {
    locations: 'http://localhost:50323/api/v1/locations/',
    users: 'http://localhost:50323/api/v1/user/',
    workLogs: 'http://localhost:50323/api/v1/worklogs/',
    exportWorkLogs: 'http://localhost:50323/api/v1/worklogs/export/',
    workTypes: 'http://localhost:50323/api/v1/worktypes/',
    token: 'http://localhost:50323/oauth/token', // should not have trailing slash
    navigation: 'http://localhost:50323/api/v1/nav',
    roles: 'http://localhost:50323/api/v1/role'
  });