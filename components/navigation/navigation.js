import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Typography, Paper, Switch, Button, Tooltip, Grid, SvgIcon, Link} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { withTheme, withStyles } from '@material-ui/core/styles';
import { INFO_URL } from '../../stores/constants/constants';
import SSWarning  from '../ssWarning';

import stores from '../../stores';
import { formatAddress } from '../../utils';
import SVGComponent from '../SVGComponent';
import classes from './navigation.module.css';

function SiteLogo(props) {
  const { color, className } = props;
  return (

    <SVGComponent  width={30} height={10.511}  className={className} />
   
  );
}

const StyledSwitch = withStyles((theme) => ({
  root: {
    width: 58,
    height: 32,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(28px)',
      color: '#212529',
      '& + $track': {
        backgroundColor: '#ffffff',
        opacity: 1,
      },
    },
    '&$focusVisible $thumb': {
      color: '#ffffff',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 32 / 2,
    border: `1px solid #212529`,
    backgroundColor: '#212529',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

function Navigation(props) {
  const router = useRouter()

  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('swap')

  function handleNavigate(route) {
    router.push(route);
  }

  const [warningOpen, setWarningOpen] = useState(false);

  useEffect(function () {
    const localStorageWarningAccepted = window.localStorage.getItem('fixed.forex-warning-accepted');
    setWarningOpen(localStorageWarningAccepted ? localStorageWarningAccepted !== 'accepted' : true);
  }, []);

  const openWarning = () => {
    setWarningOpen(true)
  }

  const closeWarning = () => {
    window.localStorage.setItem('fixed.forex-warning-accepted', 'accepted');
    setWarningOpen(false)
  }

  const onActiveClick = (event, val) => {
    if(val) {
      setActive(val)
      handleNavigate('/' + val);
    }
  }

  useEffect(() => {
    const activePath = router.asPath
    if(activePath.includes('swap')) {
      setActive('swap')
    }
    if(activePath.includes('liquidity')) {
      setActive('liquidity')
    }
    if(activePath.includes('vest')) {
      setActive('vest')
    }
    if(activePath.includes('vote')) {
      setActive('vote')
    }
    if(activePath.includes('bribe')) {
      setActive('bribe')
    }
    if(activePath.includes('rewards')) {
      setActive('rewards')
    }
    if(activePath.includes('dashboard')) {
      setActive('dashboard')
    }
    if(activePath.includes('whitelist')) {
      setActive('whitelist')
    }
    if(activePath.includes('info')) {
      setActive('info')
    }
  }, [])

  const renderNavs = () => {
    return (
      <ToggleButtonGroup
        value={active}
        exclusive
        onChange={onActiveClick}
        className={ classes.navToggles}
      >
        {renderSubNav(
          'Swap',
          'swap',
        )}
        {renderSubNav(
          'Liquidity',
          'liquidity',
        )}
        {renderSubNav(
          'Vest',
          'vest',
        )}
        {renderSubNav(
          'Vote',
          'vote',
        )}
        {renderSubNav(
          'Rewards',
          'rewards',
        )}
        {renderSubNav(
          'Whitelist',
          'whitelist',
        )}
         {renderExternalLink('Info', 'info')}
      </ToggleButtonGroup>
    );
  };

  const renderSectionHeader = (title) => {
    return (
      <div
        className={classes.navigationOptionContainer}
      >
        <div className={classes.navigationOptionNotSelected}></div>
        <Typography variant="h2" className={ classes.sectionText}>{title}</Typography>
      </div>
    );
  };

  const renderExternalLink = (title, link) => {
    return (
      <ToggleButton  className={ classes.navButton } classes={{ selected: classes.testChange }}>
        <Link href={INFO_URL} style={{color:"#7E99B0", textDecoration:"none"}} rel="noopener noreferrer" target="_blank"  > <Typography variant="h2" className={ classes.subtitleText}>{title}</Typography></Link>
       
      </ToggleButton>
    );
  };



  const renderSubNav = (title, link) => {
    return (
      <ToggleButton value={link} className={ classes.navButton } classes={{ selected: classes.testChange }}>
        <Typography variant="h2" className={ classes.subtitleText}>{title}</Typography>
      </ToggleButton>
    );
  };

  return (
    <div className={classes.navigationContainer}>
      <div className={classes.navigationHeading}>
        <a onClick={() => router.push('/home')} className={classes.linkz}>
          <SiteLogo className={classes.appLogo} />
        </a>
      </div>

      <div className={classes.navigationContent}>{renderNavs()}</div>

      { warningOpen &&
        <SSWarning close={ closeWarning } />
      }

    </div>
  );
}

export default withTheme(Navigation);
