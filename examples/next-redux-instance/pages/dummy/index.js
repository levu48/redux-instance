import React from 'react';
import {Provider} from 'react-redux';
import createStore from './store';
import Dummy from './Dummy';
import {instanceReducer} from 'redux-instance';
import {reducer, reducer2} from './reducers';

let store = createStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <h2>redux-instance example</h2>
                    <div>Three instances of a React component with the ability to plugin different reducers.
                    The first one is with no reducer, the second with a reducer, and the third with another reducer.
                    The displayed json is the state of each instance. 
                    Variable '__id' is the id of the corresponding component instance.
                    </div>
                    <Dummy />
                    <Dummy __reducer={instanceReducer(reducer)} />
                    <Dummy __reducer={instanceReducer(reducer2)} />
                </div>
            </Provider>
        );
    }
}

export default App;

