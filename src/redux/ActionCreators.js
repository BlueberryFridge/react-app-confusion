import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId,
        rating,
        author,
        comment
    }
});

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