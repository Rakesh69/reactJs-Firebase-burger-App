import React, { Component } from 'react';
import { Redirect, Route } from 'react-router';
import { connect } from 'react-redux';

import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import ContectData from './Contect-data/Contect-data';

class Checkout extends Component {
    
    // state = {
    //     ingredient : null,
    //     totalPrice: 0
    // }

    // componentWillMount = () => {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredient = {};
    //     let price= 0;
    //     for (let param of query.entries()) {
    //         // ['salad' , '1']
    //         if(param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredient[param[0]] = +param[1];
    //         }
    //         this.setState({ingredient: ingredient , totalPrice: price});
    //     }
    // }

    checkoutCancleHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace(this.props.match.path + '/contect-data');
    }

    render() {
        let summery = <Redirect to="/" />
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null; 
            summery = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummery 
                        ingredient={this.props.ings}
                        checkoutCancle={this.checkoutCancleHandler}
                        checkoutContinue={this.checkoutContinueHandler} />
                    <Route 
                        path={this.props.match.path + '/contect-data'} 
                        component={ContectData}/>
                </div>
                
            )
        }
        return (
            <div>
                {summery}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredient,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);