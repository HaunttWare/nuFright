import React from "react";

const BadgesTab = ({ userBadges }: any) => {
    const profile = require('../../../../../assets/profile-badge.png').default;
  return (
    <div className="row mt-5">
        {userBadges.map((badge: any) => (
            <div className="col-md-4" key={badge.name}>
                <div className="card text-white bg-dark mb-3">
                    <div className="row g-0">
                        <div className="col-md-4" >
                    <img src={profile} className="img-fluid rounded-start" alt="" ></img>
                        </div>
                        <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title"><b>{badge.name}</b></h5>
                        <p className="card-text"><em>{badge.description}</em></p>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>

    
  );
};

export default BadgesTab;
