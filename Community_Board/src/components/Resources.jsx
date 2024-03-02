import React from "react";
import data from "./parks.json";

const Resources = () => {

  return (
    <div className="Resources">
        <div class="container">

{/*Cards Start----------------------------------------------*/}
            {data.parks.map((parks) => (
                <div className="card" key={parks.name}>
                    <img className="park" src={parks.image} alt={parks.name}></img>
                    <h3>{parks.name}</h3>
                    <h4>{parks.location}</h4>
                    <a href={parks.link} target="_blank"><button>View Info</button></a>
                </div>
            ))}
{/*Cards End----------------------------------------------*/}

        </div>
    </div>
  )
}

export default Resources;