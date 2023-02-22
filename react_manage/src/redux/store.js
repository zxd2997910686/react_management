
import { createStore,combineReducers} from 'redux'
import { CollApsedReducer } from './reducers/CollapsedReducer'
import { LoadingReducer } from './reducers/LoadingReducer'

//把几个redux合并到一起
const reducer = combineReducers({
    CollApsedReducer,
    LoadingReducer
})

const store = createStore(reducer)

export default store;

/*
 store.dispatch()

 store.subsribe()

*/
