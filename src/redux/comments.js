import * as ActionTypes from './ActionTypes';


// concat() doesnt mutate the object
// it pushes a new key-value pair then returns the new object
// with the added pair
// hence it is immutable method
export const Comments = (state = {isLoading: true, errMess: null, comments: []}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading: false, errMess: null, comments: action.payload};
        
        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, comments: []};

        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            console.log('i was here', comment);
            return {...state, comments: state.comments.concat(comment)};
            
        default:
            return state;
    }
}