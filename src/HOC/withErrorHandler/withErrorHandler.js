import React, { Component } from 'react';
import Modal from '../../components/UI/Model/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent , axios) => {
    return class extends Component {

        state = {
            error: null
        }

        // constructor(props) {
        //     super(props);
        //     axios.interceptors.request.use(req => {
        //         this.setState({error: null});
        //         return req;
        //     })

        //     axios.interceptors.response.use(resp => resp, error => {
        //         this.setState({error: error});
        //     })
        // }

        componentWillMount () {

            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })

            this.respInterceptors = axios.interceptors.response.use(resp => resp, error => {
                this.setState({error: error});
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.respInterceptors);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});   
        }

        render() {
            return (
                <Auxiliary>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    }
}

export default withErrorHandler;