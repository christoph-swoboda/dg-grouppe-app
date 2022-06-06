import React from "react";


const ExploreContainer = ({name}) => {

    return (
        <div>
            <div className="container">
                <strong>{name}</strong>
                <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
            </div>
        </div>
    )
}

export default ExploreContainer
