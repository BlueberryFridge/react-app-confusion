import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderDish({ dish }) {
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
    else return <div></div>;
}

function RenderComments({ comments }) {
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
    else return <div></div>;
}


const DishDetail = (props) => {   
    if(props.dish) {
        console.log(props.comments);
        return(
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                    <div className='row'>
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments} />
                    </div>
            </div>
        );
    }
    else return <div></div>;  
}

export default DishDetail;

// according to reactjs.org:
// 'if you dont initialise state or you dont bind methods,
// 'you dont need to implement a constructor for your
// 'React component'
// https://reactjs.org/docs/react-component.html
// user defined components always start with capital letters
// RenderDish and RenderComments are such