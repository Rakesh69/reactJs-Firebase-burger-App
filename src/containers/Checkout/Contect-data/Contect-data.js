import axios from '../../../axios-orders';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './Contect-data.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../HOC/withErrorHandler/withErrorHandler';
import * as actions from  '../../../Store/actions/index';
import { checkValidity } from '../../../shared/utility';

class ContectData extends Component {
    state = {
        orderForm: {
            name: {
                elememtType: 'input',
                elememtConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    requred: true
                },
                valid: false,
                toached: false
            },
            street : {
                elememtType: 'input',
                elememtConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    requred: true
                },
                valid: false,
                toached: false
            },
            zipCode: {
                elememtType: 'input',
                elememtConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    requred: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                toached: false
            },
            contry: {
                elememtType: 'input',
                elememtConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    requred: true
                },
                valid: false,
                toached: false
            },
            email : {
                elememtType: 'input',
                elememtConfig: {
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                value: '',
                validation: {
                    requred: true
                },
                valid: false,
                toached: false
            },
            deliveryMethod : {
                elememtType: 'select',
                elememtConfig: {
                    options: [
                        {value: 'fastest', displayValue:'Fastest'},
                        {value: 'cheapest', displayValue:'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    

    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props.ingredients)

        const formData ={}
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredient : this.props.ings,
            price : this.props.price,
            orderData: formData,
            userId : this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);

    }

    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier] 
        }

        updatedFormElement.value = event.target.value;

        //check validity :
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.toached = true;
        

        updatedOrderForm[inputIdentifier] = updatedFormElement;
        // console.log(updatedFormElement);

        let formIsvalid = true;

        for (let inputIdentifer in updatedOrderForm ) {
            formIsvalid = updatedOrderForm[inputIdentifer].valid && formIsvalid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsvalid});
        
    }

    render() {
        let formElemetArray = [];

        for(let key in this.state.orderForm) {
            formElemetArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElemetArray.map(formElement => {
                    return <Input 
                                elemetType={formElement.config.elememtType}
                                key={formElement.id}
                                elementConfig={formElement.config.elememtConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                toached={formElement.config.toached}
                                shouldValidate={formElement.config.validation}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}  />
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
            </form>
        );

        if(this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContectData}>
                <h4>Enter your contect data</h4>
                {form}
            </div>  
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredient,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }  
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger : (order,token) =>  dispatch(actions.purchaseBurger(order,token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContectData, axios));