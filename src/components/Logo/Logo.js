import React from 'react';
import classes from './Logo.module.css';

import BurgerLogo from '../../assets/Images/burger-logo.png';

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={BurgerLogo} alt="MYBURGER" />
    </div>
)

export default Logo;