import '../styles/hero.css';
export default function Hero() {
    return (
        <div className="hero-container">
            <div className="hero-poster">
                <img
                    src="src/assets/poster-placeholder 1.svg"
                    alt="X's poster"
                    className="hero-poster-img"
                />
            </div>
            <div className="hero-info-container">
                <div className="anime-info">
                    <h1 className="anime-title">Anime Title</h1>
                    <p className="anime-jpn-title">Japanese Title</p>
                    <p className="anime-synposis">
                        Bro ipsum dolor sit amet skinny 360 fatty corduroy
                        reverse camber white room. Bomb hole death cookies
                        frontside T-bar gaper, back country heli core shot
                        stoked grip tape dope sucker hole frozen chicken heads.
                        Chillax bump Bike moguls. Road rash shred dust on crust,
                        bomb chain ring couloir caballerial giblets carbon bomb
                        hole Whistler hardtail 360 hot dogging twin tip. Bro
                        clean bail park wheelie, grunt frontside glades free
                        ride dirtbag 360.
                    </p>
                </div>
                <hr />
                <div className="anime-ratings">
                    <small className="label">SCORE</small>
                    <p>score/10</p>
                    <small className="label">RANK</small>
                    <p># rank</p>
                    <small className="label">YEAR</small>
                    <p>2023</p>
                    <small className="label">EPS</small>
                    <p>number of Eps</p>
                </div>
                <hr />
                <div className="pills-container">
                    //map over each studio and put it in the span
                    <span className="hero-pill">studio</span>
                </div>
                <div className="hero-buttons-container">
                    <button>Open Dossier</button>
                    <button>Rate</button>
                </div>
            </div>
        </div>
    );
}
