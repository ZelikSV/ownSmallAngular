
(function() {
  const directives = [];
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
    bootstrap(node) {
      const appWrapper = node || document.querySelector('[ng-app]');
      const child = appWrapper.querySelectorAll('*');
      this.compile(appWrapper);
      child.forEach(item => this.compile(item));
    }
  };

  smallAngular.directive('ng-show', function(el) {
    return null;
   });
   smallAngular.directive('ng-model', function(el) {
     return null;
   });
   smallAngular.directive('ng-click', function(el) {
     return null;
   });

  window.smallAngular = smallAngular;
}());

smallAngular.bootstrap();
