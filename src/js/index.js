(function() {
  const directives = [{
    name: 'ng-click',
    functions: []
  },
  {
    name: 'ng-module',
    functions: []
  }
  ];
  const smallAngular = {
    directive(name, cb) {
      directives.push({ name, functions: cb });
    },
    compile(node) {
      // code
    },
    bootstrap(node) {
      // code
    }
  };
}());