import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {

    const inputClasses = [classes.Input];

    if(props.invalid && props.shouldValidate && props.toached) {
        inputClasses.push(classes.Invalid);
    }

    let inputElement = null;

    switch(props.elemetType) {
        case('input'):
            inputElement = <input 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed}
                                 />;
            break;
        case('textarea'):
            inputElement = <textarea 
                                className={inputClasses.join(' ')}   
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed} />;
            break;
        case('select'):
            inputElement = (
                <select 
                    className={inputClasses.join(' ')}   
                    value={props.value}
                    onChange={props.changed}
                    >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select> 
                )
            break;
        default:
            inputElement = <input 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed} />;

    }

    return (

        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;