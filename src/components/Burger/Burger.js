import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const Burger = (props) => {
    let transformedIngredient = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,index) => {
            return <BurgerIngredients type={igKey} key={igKey+index}/>
        })
    }).reduce((arr , el) => {
        return arr.concat(el);
    },[]);

    if(transformedIngredient.length === 0 ) {
        transformedIngredient = <p>Please start adding ingredient!</p>
    }
 
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {transformedIngredient}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
}

export default withRouter(Burger);