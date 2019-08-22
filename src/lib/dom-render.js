let hooks = [];
let idx = 0;

export function useState(initialValue) {
  let state = hooks[idx] || initialValue;
  let _idx = idx;

  function setState(newValue) {
    hooks[_idx] = newValue;
    render();
  }

  idx++;
  return [state, setState]
}

export function useEffect(callBack, deps){
  
  const previousDeps = hooks[idx];
  let hasChanged = true;
  const _idx = idx;

  if(previousDeps) {
    hasChanged = deps.some( (dep, idx) => !Object.is(deps, previousDeps[idx]) )
  }

  if(hasChanged) callBack();
  hooks[_idx] = deps;
  idx++
}

export function useRef(initialValue) {
  if(!hooks[idx]) {
    hooks[idx] = Object.seal({current: initialValue});
  }
  return hooks[idx]
}

function renderElement(element) {
  const {type, props, children} = element;

  if (typeof type === 'function') {
    return renderElement(type(props))
  }

  if (typeof type === 'string') {
    // create a DOM element
    const domElement = document.createElement(type);

    // loop over the children and append
    children.forEach(child => {
      if (typeof child === 'string') {
        const textNode = document.createTextNode(child);
        domElement.appendChild(textNode);
      } else {
        domElement.appendChild(renderElement(child))
      }
    });

    // loop over the props object
    Object.keys(props).forEach( key => {
        if(key.startsWith('on')) {
          const eventName = key.substring(2).toLowerCase();
          domElement.addEventListener(eventName, props[key])
        }
    });


    return domElement;
  }
}
let _currentApp = null;
let _element = null;
let _container = null;

export function render(element = _element, container = _container) {
  const app = renderElement(element);

  _element = element;
  _container = container;

  _currentApp ?
      container.replaceChild(app, _currentApp)
      : container.appendChild(app);

  _currentApp = app;
  idx = 0;
}

export default {
  render
}