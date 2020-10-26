import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './HeaderComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';

import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';


// this is a container component

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    }
  }

  render(){
    const HomePage = () => <Home dish={this.state.dishes.filter(dish => dish.featured)[0]}
                                 promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
                                 leader={this.state.leaders.filter(leader => leader.featured)[0]} />;
    const DishWithId = ({match}) => <DishDetail dish={this.state.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]}
                                                comments={this.state.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))} /> 

    return (
      <div>
          <Header />
          <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/aboutus' component={() => <About leaders={this.state.leaders} />} />
            <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
            <Route path path='/menu/:dishId' component={DishWithId} />
            <Route exact path='/contactus' component={Contact} />
            <Redirect to='/home' />
          </Switch>
          <Footer />
      </div>
    );}
}

export default Main;
