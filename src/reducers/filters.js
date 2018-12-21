export default (state = {}, action) => {
    switch (action.type) {
      case 'SORT BY DATE':
        return {
          sortBy: action.sortBy
        };
      default:
        return state
    }
  };
  