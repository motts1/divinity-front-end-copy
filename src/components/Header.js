import React from 'react'
import PropTypes from 'prop-types'

const Header = (props) => (
    <header id="header" style={props.timeout ? {display: 'none'} : {}}>
        <div className="content">
            <div className="inner">
                <h1>Divinity</h1>
            </div>
        </div>
        <nav>
            <ul>
                <li><a href="javascript:;" style={{color:'white'}} onClick={() => {props.onOpenArticle('Shop')}}>Shop</a></li>
                <li><a href="javascript:;" style={{color:'white'}} onClick={() => {props.onOpenArticle('Cart')}}>Cart</a></li>
                <li><a href="javascript:;" style={{color:'white'}} onClick={() => {props.onOpenArticle('Account')}}>Account</a></li>
            </ul>
        </nav>
    </header>
)

Header.propTypes = {
    onOpenArticle: PropTypes.func,
    timeout: PropTypes.bool
}

export default Header
