import { HIDE_PROGRESS, SHOW_PROGRESS, UPDATE_PROGRESS_STATE } from './commonData.action.types';

export const showProgress = () => {
  return {
    type: SHOW_PROGRESS,
  };
};
export const hideProgress = () => {
  return {
    type: HIDE_PROGRESS,
  };
};
export const updateProgress = (progressStatus: boolean) => {
  return {
    type: UPDATE_PROGRESS_STATE,
    showingProgressIndicator: progressStatus,
  };
};
