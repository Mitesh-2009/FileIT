import { HIDE_PROGRESS, SHOW_PROGRESS, UPDATE_PROGRESS_STATE } from './commonData.action.types';

const initialState = {
  progressIndicator: 0,
  showingProgressIndicator: false,
};

const commonDataReducer = (state = initialState, action) => {
  if (action.type === SHOW_PROGRESS) {
    return {
      ...state,
      progressIndicator: state.progressIndicator + 1,
    };
  } else if (action.type === HIDE_PROGRESS) {
    return {
      ...state,
      progressIndicator: state.progressIndicator - 1,
    };
  } else if (action.type === UPDATE_PROGRESS_STATE) {
    return {
      ...state,
      showingProgressIndicator: action.showingProgressIndicator,
    };
  } else {
    return state;
  }
};

export { commonDataReducer };
