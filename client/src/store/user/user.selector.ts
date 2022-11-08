import { createSelector } from "reselect";

const selectUserReducer = (state: any) => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (user) => user.currentUser
);

export const selectFollowingList = createSelector(
  [selectUserReducer],
  (user) => user.following
);

export const selectFollowerList = createSelector(
  [selectUserReducer],
  (user) => user.followers
);
