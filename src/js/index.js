/* eslint-disable no-eval*/

import '../scss/style.scss';

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
            item.func(scopeRoot, node, node.attributes);
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

    window.eval(data);
  });

  smallAngular.directive('ng-click', function(scopeRoot, el) {
    el.addEventListener('click', function() {
      const data = el.getAttribute('ng-click');

      eval(data);
      scopeRoot.$apply();
    });
  });

  smallAngular.directive('ng-show', function(scopeRoot, el) {
    const data = el.getAttribute('ng-show');

    el.style.display = eval(data) ? 'block' : 'none';
    scopeRoot.$watch(() => eval(el.getAttribute('ng-show')), () => {
      el.style.display = eval(data) ? 'block' : 'none';
    });
  });

  smallAngular.directive('ng-hide', function(scopeRoot, el) {
    const data = el.getAttribute('ng-hide');

    el.style.display = eval(data) ? 'none' : 'block';
    scopeRoot.$watch(() => eval(data), () => {
      el.style.display = eval(data) ? 'none' : 'block';
    });
  });

  smallAngular.directive('ng-bind', function(scopeRoot, el) {
    const data = el.getAttribute('ng-bind');

    el.innerHTML = scopeRoot[data];
    scopeRoot.$watch(() => data, () => {
      el.innerHTML = scopeRoot[data];
    });
  });

  smallAngular.directive('ng-model', function(scopeRoot, el) {
    const data = el.getAttribute('ng-model');

    el.addEventListener('input', function() {
      scopeRoot[data] = el.value;
      scopeRoot.$apply();
    });
    scopeRoot.$watch(() => data, () => {
      el.value = eval(data);
    });
  });

  smallAngular.directive('ng-repeat', function(scopeRoot, el) {
    const data = el.getAttribute('ng-repeat');
    const [, , items] = data.split(' ');
    const parentEl = el.parentNode;
    const repeatMethod = () => {
      const collection = scopeRoot[items];
      const similarEls = parentEl.querySelectorAll('[ng-repeat]');

      for (const item of collection) {
        const clonedEl = el.cloneNode(false);

        clonedEl.innerHTML = item;
        parentEl.appendChild(clonedEl);
      }

      for (const el of similarEls) {
        el.remove();
      }
    };
    repeatMethod();
    scopeRoot.$watch(() => ({}), () => {
      repeatMethod();
    });
  });

  smallAngular.directive('ng-make-short', function(scopeRoot, el, attr) {
    const lengthString = el.getAttribute('length') || 4;
    const shortString = el.innerHTML.slice(0, lengthString);

    el.innerHTML = `${shortString} ...`;
    scopeRoot.$watch(() => el.getAttribute('length'), () => {
      el.innerHTML = `${shortString} ...`;
    });
  });

  smallAngular.directive('ng-uppercase', function(scopeRoot, el) {
    el.style.textTransform = 'uppercase';
  });

  smallAngular.directive('ng-random-color', function(scopeRoot, el) {
    const colorMaker = () => Math.floor(Math.random() * 255);

    el.addEventListener('click', function() {
      const bgColor = `rgb(${colorMaker()}, ${colorMaker()}, ${colorMaker()})`;

      el.style.background = bgColor;
    });
  });

  window.smallAngular = smallAngular;

  smallAngular.bootstrap();
}());
