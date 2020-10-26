import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

// this is a container component

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      dishes: DISHES
    }
  }

  onDishSelect(dishId) {
      this.setState({ selectedDish: dishId });
  }

  render(){
    const HomePage = () => <Home />;

    return (
      <div>
          <Header />
          <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
            <Redirect to='/home' />
          </Switch>
          <Footer />
      </div>
    );}
}

export default Main;
