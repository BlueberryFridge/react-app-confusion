import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


//-------------------------------------------- POST method: add comment --------------------------------------------//
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId,
        rating,
        author,
        comment
    }
    newComment.date = new Date().toISOString();

    return fetch(`${baseUrl}comments`, {
                method: 'POST', 
                body: JSON.stringify(newComment),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin'
            })
                .then(response => {
                    if(response.ok) return response;
                    else {
                        var err = new Error(`Error ${response.status}: ${response.statusText}`);
                        err.response = response;
                        throw err;
                    }
                }, err => {
                    var errmess = new Error(err.message);
                    throw errmess;
                })
                .then(response => response.json())
                .then(response => dispatch(addComment(response)))
                .catch(err => {
                    console.log('Post comments', err.message)
                    alert(`Your comment could not be posted\nError: ${err.message}`);
                });
}

//-------------------------------------------- POST method: add feedback --------------------------------------------//
export const postFeedback = (values) => {
    const newFeedback = {...values}
    newFeedback.date = new Date().toISOString();
    fetch(`${baseUrl}feedback`, {
            method: 'POST',
            body: JSON.stringify(newFeedback),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
        .then(response => {
            if(response.ok) return response;
            else {
                var err = new Error(`Error ${response.status}: ${response.statusText}`);
                err.response = response;
                throw err;
            }
        }, err => {
            var errMess = new Error(err.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(feedback => {
            alert(`Feedback sent. ${JSON.stringify(feedback)}`);
            console.log(`Feedback sent. ${JSON.stringify(feedback)}`);
        })
        .catch(err => {
            console.log('Post feedback', err.message);
            alert(`Your feedback cannot be processed.\nError: ${err.message}`)})
}

//--------------------------------------------------- DISHES ---------------------------------------------------//
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(`${baseUrl}dishes`)
                .then(response => {
                    if(response.ok) return response;
                    else {
                        var err = new Error(`Error ${response.status}: ${response.statusText}`);
                        err.response = response;
                        throw err;
                    }
                }, err => {
                    var errmess = new Error(err.message);
                    throw errmess;
                })
                .then(response => response.json())
                .then(dishes => dispatch(addDishes(dishes)))
                .catch(err => dispatch(dishesFailed(err.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

//--------------------------------------------------- COMMENTS ---------------------------------------------------//
export const fetchComments = () => dispatch => {
    return fetch(`${baseUrl}comments`)
                .then(response => {
                    if(response.ok) return response;
                    else {
                        var err = new Error(`Error ${response.status}: ${response.statusText}`);
                        err.response = response;
                        throw err;
                    }
                }, err => {
                    var errmess = new Error(err.message);
                    throw errmess;
                })
                .then(response => response.json())
                .then(comments => dispatch(addComments(comments)))
                .catch(err => dispatch(commentsFailed(err.message)));
}

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const commentsFailed = (errMess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

//--------------------------------------------------- PROMOTIONS ---------------------------------------------------//
export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());

    return fetch(`${baseUrl}promotions`)
                .then(response => {
                    if(response.ok) return response;
                    else {
                        var err = new Error(`Error ${response.status}: ${response.statusText}`);
                        err.response = response;
                        throw err;
                    }
                }, err => {
                    var errmess = new Error(err.message);
                    throw errmess;
                })
                .then(response => response.json())
                .then(promos => dispatch(addPromos(promos)))
                .catch(err => dispatch(promosFailed(err.message)));
}

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errMess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errMess
});

//--------------------------------------------------- LEADERS ---------------------------------------------------//
export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());

    return fetch(`${baseUrl}leaders`)
                .then(response => {
                    if(response.ok) return response;
                    else {
                        var err = new Error(`Error ${response.status}: ${response.statusText}`);
                        err.response = response;
                        throw err;
                    }
                }, err => {
                    var errMess = new Error(err.message);
                    throw errMess;
                })
                .then(response => response.json())
                .then(leaders => dispatch(addLeaders(leaders)))
                .catch(err => dispatch(leadersFailed(err.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const leadersFailed = (errMess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errMess
});