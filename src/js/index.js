(function() {
  const directives = [];
  const watchers = [];
  const scopeRoot = window;

  scopeRoot.$watch = (name, watcher) => {
    watchers.push({ name, watcher });
  };
  scopeRoot.$apply = () => {
    watchers.forEach(({ watcher }) => watcher());
  };

  const smallAngular = {
    directive(name, func) {
      directives.push({ name, func });
    },
    compile(node) {
      directives.forEach(item => {
        for (let i = 0; i < node.attributes.length; i++) {
          const { name } = node.attributes[i];

          if (name === item.name) {
            item.func(scopeRoot, node, null);
          }
        }
      });
    },
    bootstrap(node) {
      const appWrapper = node || document.querySelector('[ng-app]');
      const child = appWrapper.querySelectorAll('*');
      this.compile(appWrapper);
      child.forEach(this.compile);
    }
  };

  smallAngular.directive('ng-init', function(scopeRoot, el) {
    const data = el.getAttribute('ng-init');
    scopeRoot.eval(data);
  });

  smallAngular.directive('ng-click', function(scopeRoot, el) {
    el.addEventListener('click', function(e) {
      const data = el.getAttribute('ng-click');

      scopeRoot.eval(data);

      scopeRoot.$apply();
    });
  });

  smallAngular.directive('ng-show', function(scopeRoot, el) {
    const data = el.getAttribute('ng-show');

    el.style.display = scopeRoot.eval(data) ? 'block' : 'none';
    scopeRoot.$watch(data, () => {
      el.style.display = scopeRoot.eval(data) ? 'block' : 'none';
    });
  });

  window.smallAngular = smallAngular;

  smallAngular.bootstrap();
}());

