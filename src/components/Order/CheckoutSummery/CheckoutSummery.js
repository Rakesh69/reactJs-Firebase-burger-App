import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummery.module.css';

const CheckoutSummery = props => {
    return (
        <div className={classes.CheckoutSummery}>
            <h1>We hope it's test well!!</h1>
            <div style={{width:'100%' , margin:'auto'}}>
                <Burger ingredients={props.ingredient} />
            </div>
            <Button 
                btnType="Danger" 
                clicked={props.checkoutCancle} >CANCLE</Button>
            <Button 
                btnType="Success" 
                clicked={props.checkoutContinue} >CONTINUE</Button>
        </div>
    );
}

export default CheckoutSummery;