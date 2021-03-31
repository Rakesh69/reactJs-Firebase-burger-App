import React, { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import SideDrower from '../../components/Navigation/SideDrower/SideDrower';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import { connect } from 'react-redux';

class Layout extends Component {

    state = {
        showSideDrower: false
    }

    sideDrowerClosedHandler = () => {
        this.setState({showSideDrower: false})
    }

    sideDrowerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrower : !prevState.showSideDrower}
        });
    }

    render() {
       return (
        <Auxiliary>
            <Toolbar
                isAuth={this.props.isAuth} 
                drowerToggleClicked={this.sideDrowerToggleHandler} />
            <SideDrower 
                open={this.state.showSideDrower} 
                isAuth={this.props.isAuth} 
                closed={this.sideDrowerClosedHandler} />
            <main className={classes.content}>
                {this.props.children}
            </main>
        </Auxiliary>
       ) 
    }
}

const mapStateToProps = state => {
    return {
        isAuth : state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);