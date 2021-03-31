
import reducer from './auth';
import * as actionType from '../actions/actionType';


describe('auth reducer' , () => {
    it('should return the initial state' , () => {
        expect(reducer(undefined, {})).toEqual({
            token : null,
            userId: null,
            error: null,
            loading: false,
            authRedirect : '/'
        })
    })

    it('should store the token uponlogIn',  () => {
        expect(reducer({
            token : null,
            userId: null,
            error: null,
            loading: false,
            authRedirect : '/'
        }, {
            type: actionType.AUTH_SUCCESS, 
            idToken: 'some-token',
            userId: 'some-userid'
        })).toEqual({
            token : 'some-token',
            userId: 'some-userid',
            error: null,
            loading: false,
            authRedirect : '/'
        })
    })
})