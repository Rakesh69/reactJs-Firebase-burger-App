import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as action from '../../Store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';
import {checkValidity} from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elememtType: 'input',
                elememtConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    requred: true
                },
                valid: false,
                toached: false
            },
            password: {
                elememtType: 'input',
                elememtConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    requred: true,
                    minLength: 6
                },
                valid: false,
                toached: false
            }
        },
        isSignup: true
    }


    componentDidMount = () => {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                toached: true
            }
        }

        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthHandler = () => {
        this.setState(prevState => {
            return {
                isSignup : !prevState.isSignup
            }
        })
    }
 
     
    render() {
        let formElemetArray = [];

        for(let key in this.state.controls) {
            formElemetArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        
        let form = formElemetArray.map(formElement => (
            <Input 
                elemetType={formElement.config.elememtType}
                key={formElement.id}
                elementConfig={formElement.config.elememtConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                toached={formElement.config.toached}
                shouldValidate={formElement.config.validation}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}  />
        ));

        if(this.props.loading) {
            form = <Spinner />
        }

        let errorMsg = null;
        if(this.props.error) {
            errorMsg = <p>Error !!!</p>
        }

        let authenticate = null;
        if(this.props.isAuthenticated) {
            authenticate = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authenticate}
                {errorMsg}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthHandler} >Switch to {this.state.isSignup ? 'SIGNIN' : 'SINGUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath : state.auth.authRedirect 

    }
}

const mapDispatchToProps = dispatch =>  {
    return {
        onAuth : (email,password,isSignup) => dispatch(action.auth(email,password,isSignup)),
        onSetAuthRedirectPath : () => dispatch(action.setAuthRedirect('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);