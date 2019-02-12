(function() {
  const directives = [{
    name: 'ng_click',
    function(e, cb) {
      e.addEventListener('click', function() {
        const fn = new Function(cb);
        fn();
      });
    }
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
            item.function(node, node.attributes[i].value);
          }
        }
      });
    },
    bootstrap(node) {
      if (!node) {
        const appWrapper = document.querySelector('[ng-app]');
        const child = appWrapper.children;

        [...child].forEach(item => this.compile(item));
      }
      [...node.children].forEach(item => this.compile(item));
    }
  };

  window.smallAngular = smallAngular;
}());