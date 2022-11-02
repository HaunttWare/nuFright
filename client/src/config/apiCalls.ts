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

export const fetchEvents = async (location:any) => {
  const { data } = await axios.get(`/api/events?location=${location}`);
  return data;
};
