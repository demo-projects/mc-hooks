import {createElement as e, useState, useEffect, useRef} from './lib/reakt.js';


function Counter() {
  const [value, setValue] = useState(25);
  const [title, setTitle] = useState('Nir');

  const valueRef = useRef('value from ref');

  // component did mount
  useEffect(() => {
    console.log('API');
  }, []);

  // component did update
  useEffect(() => {
    console.log('ONLY VALUE');
  }, [value]);

  // run when component unmount
  useEffect(() => {
    return () => console.log('unmount')
  }, []);


  const updateRef = () => {
    valueRef.current = 'new value'
  };

  const updateCounter = (label) => {
    if (label === '-') {
      setValue(value - 1);
    }
    if (label === '+') {
      setValue(value + 1);
    }
    if (label === 'reset') {
      setValue(0);
    }
  };

  console.log('COUNTER RENDER');
  return e('div', {},
      e('h1', {}, title),
      // e('h1', {}, valueRef.current),
      e('h2', {}, value.toString()),
      e(Button, {label: '+', handleClick: updateCounter}),
      e(Button, {label: '-', handleClick: updateCounter}),
      e(Button, {label: 'reset', handleClick: updateCounter}),
      e(Button, {label: 'change ref value', handleClick: updateRef})
  )
}

// component
function Button({label, handleClick}) {
  return e('button', {onClick: () => handleClick(label)}, label)
}

const App = e('div', {},
    e('h1', {}, 'JS Trees'),
    e(Counter, {})
);

export default App;
