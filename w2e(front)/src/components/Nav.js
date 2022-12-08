import React from 'react'
import { Preview } from '../image'
import "../css/Nav.css"
import { Link } from 'react-router-dom'
const Nav = () => {
    return (
        <div className='main-nav'>
            <Link><div className='nav-logo'>logo</div></Link>
            <div className='nav-right-side'>
                <Link><div className='nav-right-side-child'>White-Paper</div></Link>
                <Link><div className='nav-right-side-child'>Market-place</div></Link>
            </div>
        </div>
    )
}

export default Nav