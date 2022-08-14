import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav className = "App-nav">
            <Link class="home" to='/'>Home</Link>
            <Link to='/create'>Add</Link>
           
        </nav>
    );
}

export default Navigation;