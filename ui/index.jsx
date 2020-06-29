import { h, render } from 'preact';
import { App } from './App.jsx';
import 'antd/dist/antd.css';

if (process.env.NODE_ENV === 'development') {
    require('preact/devtools');
}

render(<App />, document.getElementById('root'));
