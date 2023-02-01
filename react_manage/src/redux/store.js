
import { createStore,combineReducers} from 'redux'
import { CollApsedReducer } from './reducers/CollapsedReducer'

//把几个redux合并到一起
const reducer = combineReducers({
    CollApsedReducer,
})

const store = createStore(reducer)

export default store;

