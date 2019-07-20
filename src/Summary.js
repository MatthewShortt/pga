import britishOpen from './resources/Logo_of_The_Open_Championship.png';
import React from 'react';

export function Summary() {
    const people = [
        {
            name: "Carter Brooks",
            position: "1",
            total: "-19",
            players: [
                {
                    name: "Tommy Fleetwood",
                    score: "-12"
                },
                {
                    name: "Xander Schauffele",
                    score: "-5"
                },
                {
                    name: "Graeme McDowell",
                    score: "-2"
                },
                {
                    name: "Bryson Deschambeau",
                    score: "+5(MC)"
                }
            ]
        },
        {
            name: "Ronan Weir",
            position: "T2",
            total: "-17",
            players: [
                {
                    name: "Brooks Koepka",
                    score: "-9"
                },
                {
                    name: "Tony Finau",
                    score: "-7"
                },
                {
                    name: "Patrick Cantlay",
                    score: "-1"
                },
                {
                    name: "Paul Casey",
                    score: "+2"
                }
            ]
        },
        {
            name: "Kyle Gray",
            position: "T2",
            total: "-17",
            players: [
                {
                    name: "Rickie Fowler",
                    score: "-8"
                },
                {
                    name: "Danny Willett",
                    score: "-7"
                },
                {
                    name: "Dustin Johnson",
                    score: "-2"
                },
                {
                    name: "Tiger Woods",
                    score: "+6(MC)"
                }
            ]
        },
        {
            name: "Jack Vautour",
            position: "4",
            total: "-13",
            players: [
                {
                    name: "Jon Rahm",
                    score: "-7"
                },
                {
                    name: "Jordan Spieth",
                    score: "-7"
                },
                {
                    name: "Louis Oosthuizen",
                    score: "+1"
                },
                {
                    name: "Francesco Molinari",
                    score: "+2"
                }
            ]
        },
        {
            name: "Matt Shortt",
            position: "5",
            total: "-10",
            players: [
                {
                    name: "Justin Rose",
                    score: "-9"
                },
                {
                    name: "Henrik Stenson",
                    score: "-6"
                },
                {
                    name: "Eddie Pepperell",
                    score: "+5"
                },
                {
                    name: "Jason Day",
                    score: "+2(MC)"
                }
            ]
        },
        {
            name: "Chris Grills",
            position: "6",
            total: "-7",
            players: [
                {
                    name: "Matt Kuchar",
                    score: "-6"
                }, {
                    name: "Justin Thomas",
                    score: "-4"
                },
                {
                    name: "Hideki Matsuyama",
                    score: "+3(MC)"
                },
                {
                    name: "Adam Scott",
                    score: "+9(MC)"
                }

            ]
        },
        {
            name: "Tyler Verbanec",
            position: "7",
            total: "-2",
            players: [
                {
                    name: "Tyrrell Hatton",
                    score: "-3"
                },
                {
                    name: "Lucas Bjerregaard",
                    score: "-1"
                },
                {
                    name: "Rory Mcilroy",
                    score: "+2(MC)"
                },
                {
                    name: "Gary Woodland",
                    score: "+3(MC)"
                },
            ]
        }
    ];
    return (
        <div className="uk-height-viewport uk-background-default uk-margin-medium-bottom">
            <div className="uk-container uk-text-center@m">
                <h1 className="uk-heading-divider uk-margin-top">PGA Pool</h1>
                <img src={britishOpen} width="100px" height="100px" alt="The British Open Logo"
                     className="uk-position-small uk-position-top-right"/>
                <div className="uk-align-center uk-width-1-1@m">
                    <div className="uk-text-center" data-uk-grid>
                        {people.map((person, i) =>
                            <div key={i} className="uk-width-1-3@l uk-width-1-2@m">
                                <div className="uk-card uk-card-default uk-card-body">
                                    <div className="uk-card-badge uk-label">{person.total}</div>
                                    <h3 className="uk-card-title uk-margin-remove-bottom">{person.name}</h3>
                                    <p className="uk-text-meta uk-margin-remove-top">
                                        Position: {person.position}
                                    </p>
                                    <hr className="uk-divider-icon"></hr>
                                    <table className="uk-table uk-table-striped">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        {person.players.map((player, k) =>
                                            <tr key={k}>
                                                <td>{player.name}</td>
                                                <td>{player.score}</td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                    <hr></hr>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}