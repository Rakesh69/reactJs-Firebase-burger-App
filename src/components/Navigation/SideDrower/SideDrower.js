import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrower.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../HOC/Auxiliary/Auxiliary';

const SideDrower = (props) => {

    let attechedClass = [classes.SideDrower , classes.Close];

    if (props.open) {
        attechedClass = [classes.SideDrower , classes.Open];
    }

    return (
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attechedClass.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Auxiliary>
    );
}

export default SideDrower;