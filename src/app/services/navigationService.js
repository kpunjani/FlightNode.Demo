'use strict';

angular.module('navigationService', [])
    .factory('navigationService', 
      ['authService', '$log', '$rootScope',
       function (authService, $log, $rootScope) {
        var KEY = 'NAVIGATION_TREE';

        return {
            getTree: function(callback) {
                var tree = sessionStorage.getItem(KEY);

                if (tree === null || tree === "null") {
                    authService.get('http://localhost:50323/api/v1/nav')
                        .then(function success(response) {
                            tree = response.data;

                            sessionStorage.setItem(KEY, JSON.stringify(tree));

                            tree = tree ||  { children: [] };
                            callback(tree.children);

                        }, function error(response) {
                            $log.error(response);
                        });
                } else {
                    tree = JSON.parse(tree);
                    tree = tree ||  { children: [] };
                    callback(tree.children);
                }
            },
            resetTree: function() {
                sessionStorage[KEY] = null;
                this.buildNavigation();
            },
            buildNavigation: function() {
                var $this = this;

                var nav = '';
                var topLevel = true;

                var build = function(top) {
                    if (top) {
                        nav += '<ul class="';

                        if (topLevel) {
                          nav += 'nav navbar-nav">';
                          topLevel = false;
                        } else {
                          nav += ' dropdown-menu">';
                        }


                        top.forEach(function(child, i) {
                          var hasChildren = (_.isArray(child.children) && child.children.length > 0);

                          nav += '\r<li class="';

                          if (hasChildren) {
                            nav += 'dropdown"><a ng-href="' + child.entry.path;
                            nav += '" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">';
                            nav +=  child.entry.title + '</a>';
                          } else {
                            nav += '"><a href="' + child.entry.path + '">' +child.entry.title + '</a>';
                         }

                          if (hasChildren) {
                            build(child.children);
                          }

                          nav += '\r</li>';
                        });

                        nav += '\r</ul>';
                    }
                };

              $this.getTree(function(top) {

                build(top);

                $rootScope.navigation = nav;
              });
            }
        }
    }]);