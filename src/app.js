import React               from 'react';
import { Route }           from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Summary }         from './pages/summary';
import store, { history }  from './state/store';
import { Provider }        from 'react-redux';

const storeConfig = store();
export default function App() {

    return (
        <Provider store={storeConfig}>
            <ConnectedRouter history={history}>
                <Route exact path="/" component={Summary}/>
            </ConnectedRouter>
        </Provider>
    );
};
