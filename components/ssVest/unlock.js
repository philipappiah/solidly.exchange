import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Paper, Typography, Button, CircularProgress, IconButton } from '@material-ui/core';
import classes from "./ssVest.module.css";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VestingInfo from './vestingInfo'
import stores from '../../stores'
import {
  ACTIONS,
  CONTRACTS
} from '../../stores/constants';

export default function Unlock({ nft, govToken, veToken }) {

  const router = useRouter();

  const [ lockLoading, setLockLoading ] = useState(false)

  useEffect(() => {
    const lockReturned = () => {
      setLockLoading(false)
      router.push('/vest')
    }
    const errorReturned = () => {
      setLockLoading(false)
    }

    stores.emitter.on(ACTIONS.ERROR, errorReturned);
    stores.emitter.on(ACTIONS.WITHDRAW_VEST_RETURNED, lockReturned);
    return () => {
      stores.emitter.removeListener(ACTIONS.ERROR, errorReturned);
      stores.emitter.removeListener(ACTIONS.WITHDRAW_VEST_RETURNED, lockReturned);
    };
  }, []);

  const onWithdraw = async () => {
    const web3 = await stores.accountStore.getWeb3Provider()
    const vestingContract = new web3.eth.Contract(CONTRACTS.VE_TOKEN_ABI, CONTRACTS.VE_TOKEN_ADDRESS)

    const [attachments, voted] = await Promise.all([
      vestingContract.methods.attachments(nft.id ).call(),
      vestingContract.methods.voted(nft.id ).call()
    ]
    )

    if (Number(attachments) === 0 && Number(voted) === 0 ){
      setLockLoading(true)
      stores.dispatcher.dispatch({ type: ACTIONS.WITHDRAW_VEST, content: { tokenID: nft.id } })
    }else{
      stores.emitter.emit(ACTIONS.ERROR, "Cannot withdraw an attached token")
    }

  }

  const onBack = () => {
    router.push('/vest')
  }

  return (
    <Paper elevation={0} className={ classes.container2 }>
      <div className={ classes.titleSection }>
        <IconButton className={ classes.backButton } onClick={ onBack }>
          <ArrowBackIcon className={ classes.backIcon } />
        </IconButton>
        <Typography className={ classes.titleText }>Manage Existing Lock</Typography>
      </div>
      <VestingInfo currentNFT={nft} veToken={veToken} />
      <div className={classes.contentBox}>
        <Typography className={ classes.para }>Your lock has expired. Please withdraw your lock before you can re-lock.</Typography>
      </div>
      <div className={ classes.actionsContainer }>
        <Button
          fullWidth
          variant='contained'
          size='large'
          color='primary'
          disabled={ lockLoading }
          onClick={ onWithdraw }
          className={ classes.buttonOverride }
          >
          <Typography className={ classes.actionButtonText }>{ lockLoading ? `Withrawing` : `Withdraw` }</Typography>
          { lockLoading && <CircularProgress size={10} className={ classes.loadingCircle } /> }
        </Button>
      </div>
    </Paper>
  );
}
