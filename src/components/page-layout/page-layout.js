import React        from 'react';
import mastersTitle from '../../assets/masters_title.svg';
import mastersLogo  from '../../assets/masters_logo.png';
import { NavLink }  from 'react-router-dom';
import '../../index.css';

export default function PageLayout({ children }) {

    return (
        <div className='uk-height-viewport uk-background-default uk-margin-medium-bottom'>
            <div className='uk-container uk-text-center'>
                <div className='uk-heading-divider uk-margin-top'>
                    <img src={mastersTitle} width='200px' alt='The British Open Logo'/>
                </div>
                <img src={mastersLogo} width='90px' alt='PGA Tournament Logo'
                     className='uk-position-small uk-position-top-right uk-margin-top uk-visible@l'/>
                <nav className='uk-navbar-container uk-margin' data-uk-navbar='mode: click'>
                    <div className='uk-navbar-left'>
                        <ul className='uk-navbar-nav'>
                            <li><NavLink exact to='/' activeClassName='color-green'>Standings</NavLink></li>
                            <li><NavLink to='/leaderboard' activeClassName='color-green'>Leaderboard</NavLink></li>
                        </ul>
                    </div>
                </nav>
                <div className='uk-align-center uk-width-1-1@m'>
                    {children}
                </div>
            </div>
        </div>
    )

}