import { combineReducers } from 'redux';
import tableReducer from 'components/routes/home/tableDuck';

export default combineReducers({
  table: tableReducer,
});
