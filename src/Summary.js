import britishOpen from './resources/Logo_of_The_Open_Championship.png';
import React from 'react';

export function Summary() {
    const people = [
        {
            name: "Ronan Weir",
            position: "1",
            total: "-11",
            players: [
                {
                    name: "Tony Finau",
                    score: "-7"
                },
                {
                    name: "Brooks Koepka",
                    score: "-6"
                },
                {
                    name: "Patrick Cantlay",
                    score: "+2"
                },
                {
                    name: "Paul Casey",
                    score: "+4"
                }
            ]
        },
        {
            name: "Kyle Gray",
            position: "2",
            total: "-7",
            players: [
                {
                    name: "Rickie Fowler",
                    score: "-5"
                },
                {
                    name: "Danny Willett",
                    score: "-5"
                },
                {
                    name: "Dustin Johnson",
                    score: "+3"
                },
                {
                    name: "Tiger Woods",
                    score: "+6(MC)"
                }
            ]
        },
        {
            name: "Jack Vautour",
            position: "3",
            total: "-6",
            players: [
                {
                    name: "Francesco Molinari",
                    score: "-3"
                },
                {
                    name: "Jon Rahm",
                    score: "-2"
                },
                {
                    name: "Jordan Spieth",
                    score: "-1"
                },
                {
                    name: "Louis Oosthuizen",
                    score: "-1"
                }
            ]
        },
        {
            name: "Tyler Verbanec",
            position: "4",
            total: "-5",
            players: [
                {
                    name: "Tyrrell Hatton",
                    score: "-5"
                },
                {
                    name: "Lucas Bjerregaard",
                    score: "-2"
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
        },
        {
            name: "Carter Brooks",
            position: "5",
            total: "-3",
            players: [
                {
                    name: "Tommy Fleetwood",
                    score: "-9"
                },
                {
                    name: "Xander Schauffele",
                    score: "+2"
                },
                {
                    name: "Graeme McDowell",
                    score: "+4"
                },
                {
                    name: "Bryson Deschambeau",
                    score: "+5(MC)"
                }
            ]
        },
        {
            name: "Matt Shortt",
            position: "6",
            total: "E",
            players: [
                {
                    name: "Justin Rose",
                    score: "-1"
                },
                {
                    name: "Henrik Stenson",
                    score: "-1"
                },
                {
                    name: "Eddie Pepperell",
                    score: "+8"
                },
                {
                    name: "Jason Day",
                    score: "+2(MC)"
                }
            ]
        },
        {
            name: "Chris Grills",
            position: "7",
            total: "+2",
            players: [
                {
                    name: "Justin Thomas",
                    score: "-3"
                },
                {
                    name: "Matt Kuchar",
                    score: "+2"
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