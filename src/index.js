import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import App from './App';
import ComponentTest from './component-test'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ComponentTest />, document.getElementById('root'));
registerServiceWorker();
