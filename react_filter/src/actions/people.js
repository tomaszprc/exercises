import * as types from '../types/people';

const changeQuery = (text) => ({
  type: types.CHANGE_QUERY,
  text
});

export default {
  changeQuery,
}
