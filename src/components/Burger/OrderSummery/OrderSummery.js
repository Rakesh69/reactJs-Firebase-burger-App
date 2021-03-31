import React, { Component } from 'react'
import Auxiliary from '../../../HOC/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

//this could be functional component doesn't have to be class
class OrderSummery extends Component {

    render() {
        const ingredientSummery = Object.keys(this.props.ingredient).map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform : 'capitalize'}}>{igKey}</span> : {this.props.ingredient[igKey]}
                </li>)
        })
        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>A delecious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummery}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout ?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancle}>CANCLE</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Auxiliary>
        )
    }
}

export default OrderSummery;