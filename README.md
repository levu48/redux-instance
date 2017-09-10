### redux-instance

Provide redux management for multiple instances of the same React component.
This package allows developers to code React components with their own state, unconcerned with others in the redux store by applying redux-instance high-order components and functions withInstance, instanceState, instanceReducer, and instanceAction appropriately in react-redux 'connect'.

To install the package redux-instance

```
npm install --save redux-instance
```

The top-level component of an [example] (https://github.com/levu48/redux-instance/tree/master/examples/next-redux-instance) is as followed:
```
import React from 'react';
import {Provider} from 'react-redux';
import {instanceReducer} from 'redux-instance';
import createStore from './store';
import Dummy from './Dummy';
import {reducer, reducer2} from './reducers';

let store = createStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Dummy />
                    <Dummy __reducer={instanceReducer(reducer)} />
                    <Dummy __reducer={instanceReducer(reducer2)} />
                </div>
            </Provider>
        );
    }
}

export default App;
```

To run the example:

```
git clone https://github.com/levu48/redux-instance
cd redux-instance/examples/next-redux-instance
npm install
npm run dev
```

then go to http://localhost:3000/dummy to see redux-instance in action.





Credit: This project makes use and modifies Jake Daniel's [redux-dynamix](https://github.com/jake-daniels/redux-dynamix)