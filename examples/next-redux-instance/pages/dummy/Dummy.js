import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Actions} from './actions';
import {withInstance, instanceState, instanceAction} from 'redux-instance';


class Dummy extends React.Component {
    render() {
        let {state, storm, harvey, irma} = this.props;
        return (
            <div>
                <hr />
                <h3>Dummy (a React component): {storm}</h3>
                <div>
                    <button onClick={() => harvey()}>Harvey</button>
                    <button onClick={() => irma()}>Irma</button>
                </div>
                <pre>{JSON.stringify(state, null, 2)}</pre>
            </div>
        )
    }
}


const mapStateToProps = instanceState((state, props) => ({
    state,
    storm: state.storm
}));

const mapDispatchToProps = (dispatch, props) => {
    return {
        harvey: () => dispatch(instanceAction(Actions.harvey, props)),
        irma: () => dispatch(instanceAction(Actions.irma, props))
    }
};

export default withInstance(connect(mapStateToProps, mapDispatchToProps)(Dummy));