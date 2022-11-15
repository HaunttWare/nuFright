import React from "react";

const BadgeIcons = ({ name }: any) => {
  const profile = require('../../../../../assets/profile-badge.png').default;
  const image = require('../../../../../assets/img-badge.png').default;

  switch (name) {
    case "It's ALIIIIVEEEE!!":
      return <img src={profile} className="img-fluid rounded-start" alt="" ></img>
    default:
      return <img src={image} className="img-fluid rounded-start" alt="" ></img>
  }
};

export default BadgeIcons;