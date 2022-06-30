import React from 'react'
import  ReactDOM  from 'react-dom/client'
import Route from './router';
import './comcss/base.css'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
    <Route/>
    </React.StrictMode>
);