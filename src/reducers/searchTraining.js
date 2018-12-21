export default (state = {}, action) => {
    switch (action.type) {
      case 'SEARCH TRAINING':
        return {
          searchTraining: action.searchTraining
        }
      default:
        return state;
    }
  };
  