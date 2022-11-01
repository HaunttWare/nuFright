import React from "react";

const BadgesTab = ({ userBadges }: any) => {
  return (
    <div className="row mt-5">
        {userBadges.map((badge: any) => (
            <div className="col-md-4" key={badge._id}>
                <div className="card text-white bg-dark mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{badge.name}</h5>
                        <p className="card-text">{badge.description}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>

    
  );
};

export default BadgesTab;
