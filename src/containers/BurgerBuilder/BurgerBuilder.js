import React, { Component } from 'react';
import { connect } from 'react-redux';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Modal from '../../components/UI/Model/Modal';
import Auxiliary from '../../HOC/Auxiliary/Auxiliary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import * as burgerBuilderAction from '../../Store/actions/index';



export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {
       this.props.onInitIngredinets();
    }

    updatePurchaseState =(ingredient) => {

        const sum = Object.keys(ingredient).map(keyIng => {
            return ingredient[keyIng];
        }).reduce((err , el) =>{
            return err + el 
        } ,0);

        return  sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     //update ingredient :
    //     const oldCount  =this.state.ingredient[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredient = {
    //         ...this.state.ingredient
    //     }
    //     updatedIngredient[type] = updatedCount;

    //     //update totalPrice :
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     //update state: 
    //     this.setState({
    //         totalPrice : newPrice,
    //         ingredient : updatedIngredient
    //     });

    //     this.updatePurchaseState(updatedIngredient);
    // }

    // removeIngredientHandler = (type) => {
    //     //update ingredient :
    //     const oldCount  =this.state.ingredient[type];
    //     if(oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredient = {
    //         ...this.state.ingredient
    //     }
    //     updatedIngredient[type] = updatedCount;

    //     //update totalPrice :
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;

    //     //update state: 
    //     this.setState({
    //         totalPrice : newPrice,
    //         ingredient : updatedIngredient
    //     });

    //     this.updatePurchaseState(updatedIngredient);
    // }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing : true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseRemoveHandler = () => {
        this.setState({purchasing : false});
    }

    purchaseContinueHandler = () => {
        // alert('Order is continued!!');


        // const queryParams =[];
        // for(let i in this.props.ings) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredient[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });

        this.props.onPurchaseInit();
        this.props.history.push('/checkout');

    }

    render() {

        const disableInfo = {
            ...this.props.ings
        }

        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummery = null;

        
        let burger = this.props.error ? <p>ingredients can't be loaded!!</p> : <Spinner />

        if(this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemove}
                        disabled={disableInfo}
                        price={this.props.price}
                        orderd={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        purchasable={!this.updatePurchaseState(this.props.ings)} />
                </Auxiliary>
            );

            orderSummery = <OrderSummery 
            ingredient={this.props.ings}
            purchaseCancle={this.purchaseRemoveHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.props.price} />
        }

        // if(this.state.loading) {
        //     orderSummery = <Spinner />
        // }
        



        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseRemoveHandler}>
                    {orderSummery}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredient,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch(burgerBuilderAction.addIngredient(ingName)),
        onIngredientRemove : (ingName) => dispatch(burgerBuilderAction.removeIngredient(ingName)),
        onInitIngredinets: () => dispatch(burgerBuilderAction.initIngredient()),
        onPurchaseInit : () => dispatch(burgerBuilderAction.purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(burgerBuilderAction.setAuthRedirect(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder , axios));