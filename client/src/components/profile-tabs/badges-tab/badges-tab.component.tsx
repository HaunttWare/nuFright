import React from "react";
import BadgeIcons from './badgeIcons.component'

const BadgesTab = ({ userBadges }: any) => {
    return (
        <div className="row mt-5">
            {userBadges.map((badge: any) => (
                <div className="col-md-4" key={badge.name}>
                    <div className="card text-white bg-dark mb-3">
                        <div className="row g-0">
                            <div className="col-md-4" >
                                <BadgeIcons name={badge.name} />
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
