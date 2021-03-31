import * as actionType from '../actions/actionType';
import { updateObject }  from '../../shared/utility';

const initialState = {
    ingredient : null,
    totalPrice : 4,
    error: false,
    building: false
}

// price of each ingredients : 
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese : 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName] : state.ingredient[action.ingredientName] + 1}
            const updatedIngredients = updateObject(state.ingredient, updatedIngredient);
            const updatedState = {
                ingredient : updatedIngredients,
                totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedState);
}

const removeIngredinet = (state, action) => {
    const updatedIng = {[action.ingredientName] : state.ingredient[action.ingredientName] - 1}
            const updatedIngs = updateObject(state.ingredient, updatedIng);
            const updatedSt = {
                ingredient : updatedIngs,
                totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedSt);
}

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredient: action.ingredients,
        error: false,
        totalPrice: 4,
        building: false
    })
}

const fetchIngredientFail = (state, action) =>{
    return updateObject(state, {error: true})
}

const reducer = (state = initialState, action) => {

    switch(action.type) {

        case actionType.ADD_INGREDIENT: return addIngredient(state, action);            

        case actionType.REMOVE_INGREDIENT: return removeIngredinet(state, action);
                 
        case actionType.SET_INGREDIENT: return setIngredient(state, action);            

        case actionType.FETCH_INGREDIENT_FAIL: return fetchIngredientFail(state, action);
            
        default:  return state;
           
    }

};

export default reducer;