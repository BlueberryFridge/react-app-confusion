import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

// according to reactjs.org:
// 'if you dont initialise state or you dont bind methods,
// 'you dont need to implement a constructor for your
// 'React component'
// https://reactjs.org/docs/react-component.html


class DishDetail extends Component {

    renderDish(dish) {
        if(dish) {
            return(
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg top width='100%' src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>  
                    </Card>
                </div>
            );
        } 
        else return(<div></div>);
    }
    
    renderComments(comments) {
        if(comments) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <h4>Comments</h4>
                    {comments.map(commentDetails => 
                        <ul className='list-unstyled' key={commentDetails.id}>
                            <li>{commentDetails.comment}</li>
                            <li>-- {commentDetails.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(commentDetails.date)))}</li>
                        </ul>
                    )}
                </div>
            );
        } 
        else return (<div></div>);
    }

    render() {     
        const comments = this.props.dish && this.props.dish.comments;

        return(
            <div className='container'>
                <div className='row'>
                    {this.renderDish(this.props.dish)}
                    {this.renderComments(comments)}
                </div>
            </div>
        );
    }
}

export default DishDetail;