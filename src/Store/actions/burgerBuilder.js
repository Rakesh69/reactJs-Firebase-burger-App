import * as actionType from './actionType';
import axios from '../../axios-orders';


export const addIngredient = name => {
    return {
        type: actionType.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = name => {
    return {
        type: actionType.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredient = ingredient => {
    return {
        type: actionType.SET_INGREDIENT,
        ingredients: ingredient
    }
}

export const fetchIngredientFail = () => {
    return {
        type: actionType.FETCH_INGREDIENT_FAIL
    }
}

export const initIngredient = () => {
    return dispatch => {
        axios.get('https://react-my-burger-d9356-default-rtdb.firebaseio.com/ingredient.json')
        .then(response => {
            dispatch(setIngredient(response.data));
        })
        .catch (error => {
            dispatch(fetchIngredientFail());
        })
    }
}