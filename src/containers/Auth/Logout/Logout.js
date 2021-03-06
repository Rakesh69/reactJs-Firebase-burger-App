import React, { Component } from 'react';
import * as action from '../../../Store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class Logout extends Component {

    componentDidMount = () => {
        this.props.onLogout();
    }

    render() {
        return <Redirect to="/" />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout : () => dispatch(action.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);