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
      directives.forEach(item => {
        for (let i = 0; i < node.attributes.length; i++) {
          if (node.attributes[i].name === item.name) {
            item.functions.forEach(fun => {
              fun(node, node.attributes[i].value);
            });
          }
        }
      });
    },
    bootstrap(node) {
      // code
    }
  };
}());