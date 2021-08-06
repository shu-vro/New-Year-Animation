import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Animation from "./components/Animation";
import Timer from "./components/Timer";

// DO NOT DELETE THIS LINE. I HAVE IMPORTED ALL THE ESSENTIAL IMAGES SO THAT THEY MIGHT LOAD FASTER.
import EarthTexture from "./img/earth.jpg";
import SpaceTexture from "./img/space.jpg";
import NormalEarthTexture from "./img/earth_normal_map.png";

let images = {
    EarthTexture: EarthTexture,
    SpaceTexture: SpaceTexture,
    NormalEarthTexture: NormalEarthTexture,
};

export default function App() {
    const [transition, setTransition] = useState(false);
    return (
        <>
            {transition ? <Redirect to="animation" /> : ""}
            <Switch>
                <Route exact path="/">
                    <Timer setTransition={setTransition}></Timer>
                </Route>
                <Route exact path="/animation">
                    <Animation images={images} />
                </Route>
            </Switch>
        </>
    );
}
