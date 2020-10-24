import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    renderComments(comments) {
        if(comments) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <h4>Comments</h4>
                    {comments.map(commentDetails => 
                        <ul className='list-unstyled' key={commentDetails.id}>
                            <li>{commentDetails.comment}</li>
                            <li>-- {commentDetails.author}, {commentDetails.date}</li>
                        </ul>
                    )}
                </div>
            );
        } else {
            return (<div></div>);
        }
    }

    render() {
        const selectedDish = this.props.selectedDish;

        return(
            <div className='row'>
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg top width='100%' src={selectedDish.image} alt={selectedDish.name} />
                        <CardBody>
                            <CardTitle>{selectedDish.name}</CardTitle>
                            <CardText>{selectedDish.description}</CardText>
                        </CardBody>  
                    </Card>
                </div>
                {this.renderComments(selectedDish.comments)}
            </div>
        );
    }
}

export default DishDetail;