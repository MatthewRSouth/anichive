export default function Rank({ animeModalResults }) {
    function reduceMembersNumber(members) {
        return Math.floor(members / 1000) + 'K';
    }
    return (
        <div className="modal-rankings">
            <div className="modal-rankings-top">
                <div className="modal-rank">
                    <span className="rank-title">Rank</span>
                    <br />
                    <p className="rank">#{animeModalResults.rank}</p>
                </div>
                <div className="modal-popularity">
                    <span className="popularity-title">Popularity</span>
                    <br />
                    <p className="popularity">
                        #{animeModalResults.popularity}
                    </p>
                </div>
            </div>
            <div className="modal-rankings-bottom">
                <div className="modal-members">
                    <span className="members-title">Members</span>
                    <br />
                    <p className="members">
                        {reduceMembersNumber(animeModalResults.members)}
                    </p>
                </div>
                <div className="modal-episodes">
                    <span className="episodes-title">Episodes</span>
                    <br />
                    <p className="episodes">{animeModalResults.episodes}</p>
                </div>
            </div>
        </div>
    );
}
