import uuid from 'uuid';

export const addProfileInfo = (
  profile
) => ({
  type: 'ADD_PROFILE_INFO',
  item: {
    ...profile
  }
}); 
