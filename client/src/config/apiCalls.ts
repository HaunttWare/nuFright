import axios from 'axios';

export const fetchUser = async () => {
    const {data: {user}} = await axios.get("/api/auth/login/successful");
    return user;
}

export const fetchBadges = async (user:any) => {
    const { data: { badges, ratings } } = await axios.get(`/api/user/${user.id}/ratings-badges`);
    return { badges, ratings };
}

export const createBadge = async (badgeInfo:any) => {
    await axios.post(`/api/badges`, badgeInfo);
}

export const fetchFollowers = async (user:any) => {
    const { data } = await axios.get(`/api/user/followers/${user.id}`);
    return data;
}

export const fetchFollowing = async (user:any) => {
    const { data } = await axios.get(`/api/user/followings/${user.id}`);
    return data;
}

export const fetchEvents = async () => {
    const { data } = await axios.get(`/api/events`);
    return data;
}

