import dispatcher from "./dispatcher.js";

export function createElement(type, props, ...children) {
  const element = {type, props, children};

  Object.freeze(element.props);
  Object.freeze(element);

  return element;
}

export function useState(initialValue) {
  return dispatcher.useState(initialValue);
}

export function useEffect(cb, deps) {
  return dispatcher.useEffect(cb, deps);
}

export function useRef(initialValue) {
  return dispatcher.useRef(initialValue);
}

