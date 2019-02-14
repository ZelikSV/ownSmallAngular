(function() {
  const directives = [];
  const watchers = [];
  const scopeRoot = window;
  scopeRoot.$watch = watcher => {
    watchers.push(watcher);
  };
  scopeRoot.$apply = () => {
    watchers.forEach(watcher => watcher());
  };

  const smallAngular = {
    directive(name, cb) {
      directives.push({ name, func: cb });
    },
    compile(node) {
      directives.forEach(item => {
        for (let i = 0; i < node.attributes.length; i++) {
          if (node.attributes[i].name === item.name) {
            item.func(scopeRoot, node, null);
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
  smallAngular.directive('ng-click', function(scopeRoot, el) {
    el.addEventListener('click', function(e) {
      const data = el.getAttribute('ng-click');
      scopeRoot.eval(data);
    });
  });

  window.smallAngular = smallAngular;

  smallAngular.bootstrap();
}());

