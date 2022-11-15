import axios from "axios";

export const fetchUser = async () => {
  const {
    data: { user },
  } = await axios.get("/api/auth/login/successful");
  return user;
};

export const fetchBadges = async (userId: any) => {
  const {
    data: { badges, ratings },
  } = await axios.get(`/api/user/${userId}/ratings-badges`);
  return { badges, ratings };
};

export const createBadge = async (userId: any) => {
  const loginBadge = {
    userId,
    badgeName: "It's ALIIIIVEEEE!!",
    description: "Welcome to nuFright 😈",
    badge: "It's ALIIIIVEEEE!!",
  };
  await axios.post(`/api/badges`, loginBadge);
  return loginBadge;
};

export const fetchFollowers = async (userId: any) => {
  const { data } = await axios.get(`/api/user/followers/${userId}`);
  return data;
};

export const fetchFollowing = async (userId: any) => {
  const { data } = await axios.get(`/api/user/followings/${userId}`);
  return data;
};

export const fetchEvents = async (location: any) => {
  try {
    const { data } = await axios.get(`/api/events?location=${location}`);
    console.log("Events data:", data);
    return data;
  } catch (error) {
    console.log("error in api call",error);
  }

};

export const fetchMovies = async () => {
  try {
    const { data } = await axios.get(`/api/movies`);
    return data;
  } catch (error) {
    console.error('error in axios request', error);
  }
};

export const fetchShows = async () => {
  try {
    const { data } = await axios.get('/api/shows');
    return data;
  } catch (error) {
    console.error('error in axio request', error);
  }
};