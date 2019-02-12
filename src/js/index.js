
(function() {
  const directives = [{
    name: 'ng-click',
    func(e, cb) {
      e.addEventListener('click', function() {
        const fn = new Function(cb);
        fn();
      });
    }
  }
  ];
  const smallAngular = {
    directive(name, cb) {
      directives.push({ name, func: cb });
    },
    compile(node) {
      directives.forEach(item => {
        for (let i = 0; i < node.attributes.length; i++) {
          if (node.attributes[i].name === item.name) {
            item.func(node, node.attributes[i].value);
          }
        }
      });
    },
    bootstrap(node = '[ng-app]') {
      const appWrapper = document.querySelector(node);
      const child = appWrapper.children;

      [...child].forEach(item => this.compile(item));
    }
  };

  window.smallAngular = smallAngular;
}());

smallAngular.directive('ng-show', function(el) {
  console.log('called directive ng-show on element', el);
});
smallAngular.directive('ng-module', function(el) {
  console.log('called directive ng-show on element', el);
});
smallAngular.directive('ng-make-short', function(el) {
  console.log('called directive ng-show on element', el);
});
smallAngular.directive('ng-bind', function(el) {
  console.log('called directive ng-show on element', el);
});

smallAngular.bootstrap();
