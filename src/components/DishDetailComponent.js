import React, {Component} from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, 
         Breadcrumb, BreadcrumbItem,
         Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

//------------------------------------------------------------ FUNCTIONAL COMPONENT: RENDER DISH ------------------------------------------------------------//
function RenderDish({ dish }) {
    if(dish) {
        return(
            <div className='col-12 col-md-5 m-1'>
                <Card>
                    <CardImg top width='100%' src={baseUrl + dish.image} alt={dish.name} />
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

//------------------------------------------------------------ FUNCTIONAL COMPONENT: RENDER COMMENTS ------------------------------------------------------------//
function RenderComments({ comments, addComment, dishId }) {
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
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>   
        );
    } 
    else return <div></div>;
}

//------------------------------------------------------------ CLASS COMPONENT: COMMENT MODAL ------------------------------------------------------------//
const required = value => value && value.length;
const minLength = length => value => value && (value.length >= length);
const maxLength = length => value => !value || (value.length <= length);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCommentModalOpen: false
        }
        this.toggleCommentModal = this.toggleCommentModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleCommentModal() {
        this.setState({isCommentModalOpen: !this.state.isCommentModalOpen});
    }

    handleSubmit(values) {
        this.toggleCommentModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <>
                <Button outline onClick={this.toggleCommentModal}>
                    <span className='fa fa-pencil fa-lg' /> Submit Comment
                </Button>

                <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal}>
                    <ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row className='form-group'>
                                <Label htmlFor='rating' xs={12}>Rating</Label>
                                <Col xs={12}>
                                    <Control.select model='.rating' name='rating' id='rating'
                                                    className='form-control'>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='author' xs={12}>Your Name</Label>
                                <Col xs={12}>
                                    <Control.text model='.author' name='author' id='author'
                                                  className='form-control'
                                                  validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}
                                                  placeholder='Your name' />
                                    <Errors className='text-danger'
                                        model='.author'
                                        show='touched'
                                        messages={{required: 'Required',
                                        minLength: 'Must be at least 3 characters',
                                        maxLength: 'Must be less than 15 characters'}} />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='comment' xs={12}>Comment</Label>
                                <Col xs={12}>
                                    <Control.textarea model='.comment' name='comment' id='comment'
                                                      rows='6'
                                                      className='form-control' />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col xs={12}>
                                    <Button type='submit' color='primary'>Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

//------------------------------------------------------------ CLASS COMPONENT: DISH DETAILS ------------------------------------------------------------//
const DishDetail = (props) => {       
        if(props.isLoading) {
            return(
                <div className='container'>
                    <div className='row'>
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.errMess) {
            return(
                <div className='container'>
                    <div className='row'>
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish) {
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
                        <RenderComments comments={props.comments}
                                        addComment={props.addComment}
                                        dishId={props.dish.id} />
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