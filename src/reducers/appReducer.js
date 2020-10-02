const appReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SHOW_ADD_FORM":
      return { ...state, showAddForm: !state.showAddForm };
    case "WILDER_ADDED":
      return {
        ...state,
        showAddForm: false,
        successMessage: `The wilder ${action.newWilder.name} has been successfully added`,
        wilders: [{ ...action.newWilder, justAdded: true }, ...state.wilders],
      };
    case "WILDERS_FETCH_SUCCESS":
      return { ...state, wilders: action.wilders };
    default:
      return state;
  }
};

export default appReducer;
