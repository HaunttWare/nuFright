import { LOCATION_ACTIONS_TYPES } from "./location.types";
import {createAction} from '@reduxjs/toolkit';

export const setCurrentLocation = (location: any) => createAction(LOCATION_ACTIONS_TYPES.SET_CURRENT_LOCATION, location);