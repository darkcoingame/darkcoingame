import React, { useCallback, useState, useImperativeHandle, useEffect } from "react";
import styled from "styled-components";
import HelpIcon from "../../assets/imgs/help-icon.png";
import HarvestIcon from "../../assets/imgs/harvest.png";
import WithdrawIcon from "../../assets/imgs/withdraw.png";
import SleepIcon from "../../assets/imgs/zzz.svg";
import { useTranslation } from "react-i18next";
import { SC } from '../../SmartContracts';
import '../../index.css';

const StyledStakeItemContainer = styled.div`
  z-index: 10;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 32px;
  color: #fff;
  box-sizing: border-box;
  padding: 32px;
  @media (max-width: 600px) {
    min-width: auto !important;
    border-radius: 15px;
    padding-right: 8px;
    padding-left: 8px;
    padding-top: 22px;
    padding-bottom: 22px;
    margin-bottom: 10px;
  }
`;

const StyledStakeItemHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.02em;
  -webkit-justify-content: space-between;
  color: #ffffff;
  p {
    margin: auto;
  }
`;

const StyledStakeItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  p {
    font-weight: 500;
    font-size: 20px;
    line-height: 140%;
    letter-spacing: 0.02em;
    color: #ffffff;
  }
  span {
    color: #c2abcb;
    font-weight: 500;
    font-size: 20px;
    line-height: 140%;
    letter-spacing: 0.02em;
  }
`;

const StyledStakeItemRowWithButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  gap: 20px;
`;

export const StyledStakeItemBuy = styled.a`
    cursor: pointer;
    display: -webkit-box;
    border-radius: 12px;
    letter-spacing: 0.02em;
    -webkit-transition-duration: 0.2s;
    transition-duration: 0.2s;
    padding: 2vh 2vh 2vh 3vh;
  ${(props) =>
        props.activeButton &&
        "background: linear-gradient(83.53deg, #B114FF 0, #B114FF 24.77%, #FF1493 100.89%);"}
  ${(props) =>
        props.activeButton &&
        "&:hover { background-position: left center; background-size: 200%;}"}
    
  img {
    margin-left: 12px;
  }
  &:hover {
    background-position: right center;
  }
  p {
    display: flex;
    justify-content: center;
    max-width: 20vh;
    min-width: 12vh;
    font-size: 2.55vh;
    color: #fff;
    font-weight: 500;
    margin: auto;
  }
`;

export const StyledStakeItemButton = styled.a`
    cursor: pointer;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 21px 25px;
    background: linear-gradient( 90deg,rgba(255,255,255,0.1) 0%,rgba(255,255,255,0.1) 50%,rgba(255,255,255,0.1) 50.1%,rgba(255,255,255,0.2) 100% );
    background-size: 200%;
    border-radius: 12px;
    min-width: 24vh;
    /text-align: center;
    font-weight: 500;
    font-size: 20px;
    line-height: 140%;
    -webkit-letter-spacing: 0.02em;
    -moz-letter-spacing: 0.02em;
    -ms-letter-spacing: 0.02em;
    letter-spacing: 0.02em;
    color: rgb(255,255,255);
    -webkit-transition-duration: 0.2s;
    transition-duration: 0.2s;
}
  ${(props) =>
        props.activeButton &&
        "background: linear-gradient(83.53deg, #B114FF 0, #B114FF 24.77%, #FF1493 100.89%);"}
  ${(props) =>
        props.activeButton &&
        "&:hover { background-position: left center; background-size: 200%;}"}
    
  img {
    margin-left: 12px;
  }
  &:hover {
    background-position: right center;
  }
`;

const StyledStakeItemTextWithButton = styled.div`
  display: flex;
  flex-direction: column;
  span {
    color: #c2abcb;
    font-weight: 500;
    font-size: 20px;
    line-height: 140%;
    letter-spacing: 0.02em;
    font-family: 'Segoe UI', sans-serif;
  }
  p {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.02em;
    color: #ffffff;
  }
  @media (max-width: 600px) {
    p {
    font-size: 18px;
    }
  }
`;

const StyledAPR = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-right: 6px;
  }
`;

const StyledStakeItemAccountId = styled.div`
  margin-top: 25px;
  opacity: .5;
  padding: 5px;
  padding-left: 10px;
  font-weight: 600;
  background: rgba(255, 255, 255, .2);
  border-radius: 7px;
`;
const StyledStakeItemHelp = styled.span`
.i {
  position: relative;
  top: 2px;
}
.i .tooltip {
  display: none;
  background: #000;
  border-radius: 4px;
  color: #fff;
  padding: 4px 4px 6px;
  font-size: 12px;
  line-height: 130%;
  position: absolute;
  left: calc(50% - 234px/2);
  bottom: 38px;
  width: 234px;
  box-sizing: border-box;
  text-align: center;
  }
  .i .icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(22.svg);
    vertical-align: top;
    margin-top: 3px;
}
.i:hover   .tooltip {display: block;}
.i .tooltip:before{position:absolute;content:'';left:calc(50% - 4px);bottom:-4px;width:8px;height:4px;background-image: url("data:image/svg+xml,%3Csvg width='8' height='4' viewBox='0 0 8 4' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.01107 4L8 0H0L4.01107 4Z' fill='black'/%3E%3C/svg%3E%0A");}
`;

export const StakeItem = ({
    version,
    earnedText,
    activeButton,
    onUseConnection,
    account,
    onStake,
    needToApprove,
    provider
}, ref) => {
    let [ APR, setAPR ] = useState(0);
    let [ Rate, setRate ] = useState(0);
    let [ initialized, setInitialized ] = useState(false);
    let [ approved, setApproved ] = useState(false);
    let [ earned, setEarned ] = useState('-');
    let [ inStake, setInStake ]  = useState('-');
    let [ canHarvest, setCanHarvest ] = useState(false);
    let [ canWithdraw, setCanWithdraw ] = useState(false);
    let [ unlockedReward, setUnlockedReward ] = useState(0);
    let [ available, setAvailable ] = useState(0);
    let [ remaining, setRemaining ] = useState(0);
    let [ availableNft, setAvailableNft ] = useState(0);
    let [ remainingNft, setRemainingNft ] = useState(0);
    let [ balanceNft, setBalanceNft ] = useState(0);

    const { t } = useTranslation();

    const handleUseConnection = useCallback(() => {
        onUseConnection();
    }, [ onUseConnection ]);

    const handleStake = useCallback(() => {
        onStake();
    }, [ onStake ])
  
    const harvest = useCallback(async () => {
        if (version === "1") {
          await SC.harvest(account);
        } else if (version === "2") {
          await SC.harvestV2(account);
        }
    }, [ version, account ]);

    const withdraw = useCallback(async () => {
        if (version === "1") {
          await SC.withdraw(account, SC.inStake);
        } else if (version === "2") {
          await SC.withdrawV2(account, SC.inStakeV2);
        }
    }, [ version, account ]);

    const claimOshi = useCallback(async () => {
      if (version === "3") {
        await SC.claimOshi(account);
      }
  }, [ version, account ]);

  const claimOshiNft = useCallback(async () => {
    if (version === "4") {
      await SC.claimOshiNft(account);
    }
}, [ version, account ]);

const swapNft = useCallback(async () => {
  if (version === "4") {
    await SC.swapNft(account);
  }
}, [ version, account ]);

    const updateData = useCallback(async () => {
      let inStakeRaw, earnedRaw, holdingTimeRaw, stackedTimeRaw,unlockReward,inStakeRawV2,availabReward,remainReward,inStakeRawV3,availabNftReward,remainNftReward,balanceNftReward;
      if (version === "1") {
          inStakeRaw = await SC.getInStake(account);
          earnedRaw = await SC.getEarned(account);
          holdingTimeRaw =  await SC.getInHoldTime();
          stackedTimeRaw = await SC.getInStackTime(account);
          setInStake(inStakeRaw);
          setEarned(earnedRaw);
      } else if (version === "2") {
           unlockReward = await SC.getUnlockedRewardV2(account);
           inStakeRawV2 = await SC.getInStakeV2(account);
           earnedRaw = await SC.getEarnedV2(account);
           setInStake(inStakeRawV2);
           setEarned(earnedRaw.toFixed(2));
           setUnlockedReward(unlockReward);
      } else if (version === "3") {
           availabReward = await SC.available(account);
           remainReward = await SC.remaining(account);
           inStakeRawV3 = await SC.getInStakeV3(account);
           setInStake(inStakeRawV3);
           setAvailable(availabReward);
           setRemaining(remainReward);
      } else if (version === "4") {
        availabNftReward = await SC.availableNft(account);
        remainNftReward = await SC.remainingNft(account);
        balanceNftReward = await SC.balanceNft(account);
        setAvailableNft(availabNftReward);
        setRemainingNft(remainNftReward);
        setBalanceNft(balanceNftReward)
       }
        if(version === "1") {
          setCanHarvest(true);
          setCanWithdraw(!(parseInt(inStakeRaw) <= 0) && !(holdingTimeRaw >= (Math.floor(Date.now() / 1000) - stackedTimeRaw)));
        }
        else if(version === "2") {
          setCanHarvest(unlockReward > 0);
          setCanWithdraw(!(parseInt(inStakeRawV2) <= 0));
        }

    }, [ account, version, inStake ]);

    const approve = useCallback(async () => {
        let approval;
        if (version === "1") {
            approval = await SC.approve();
        } else if (version === "2") {
            approval = await SC.approveV2();
        } else if (version === "3") {
            approval = await SC.approveV3();
        } else if (version === "4") {
            approval = await SC.approveV4();
        }
        setApproved(approval);

        updateData();
    }, [ version, updateData ]);

    useEffect(() => {  
        (async () => {
            if (account && !approved) {
                if (version === "1") {
                    if (await SC.allowance(account)) return setApproved(true);
                } else if (version === "2") {
                    if (await SC.allowanceV2(account)) return setApproved(true);
                } else if(version === "3") {
                    if (await SC.allowanceV3(account)) return setApproved(true);
                }
                 else if(version === "4") {
                    if (await SC.allowanceV4(account)) return setApproved(true);
                }
              }
        
              if (!initialized && approved) {
                if (version === "1") {
                    setAPR(await SC.APR());
                } else if (version === "2") {
                    setAPR(await SC.APRV2());
                } else if(version == "3") {
                    setRate(await SC.Rate());
                }
                 else if(version == "4") {
                setRate(await SC.RateNft());
                }
                setInitialized(true);
                 setInterval(() => {
                   updateData();
               }, 1000);
               
               }
        })();
    }, [
        initialized,
        setInitialized,
        updateData,
        account, earned, version,
        approved,
        setAPR
    ]);
    return (
      <div>
        {version == "1" || version == "2" ?
        <StyledStakeItemContainer>
            { version === "1" ? <StyledStakeItemHeader>
                <p>
                    {t("STAKE.STAKE_TITLE1")}
                </p>
                <StyledStakeItemHelp>
                <span class="i">
                      <img src={HelpIcon} alt="" />
			                <span class="tooltip">			
                      {t("STAKE.HELPSTAKE1")}
		          	</span>
              	</span>
                </StyledStakeItemHelp>
            </StyledStakeItemHeader> : version == "2" ? <StyledStakeItemHeader>
                <p>
                    {t("STAKE.STAKE_TITLE2")}
                </p>
                <StyledStakeItemHelp>
                <span class="i">
                      <img src={HelpIcon} alt="" />
			                <span class="tooltip">			
                      {t("STAKE.HELPSTAKE2")}
		          	</span>
              	</span>
                </StyledStakeItemHelp>
            </StyledStakeItemHeader> : null}
      <StyledStakeItemRow>
          <StyledAPR>
              <span> {t("STAKE.APR")}</span>
              <StyledStakeItemHelp>
               <span class="i">
                <img src={HelpIcon} alt="" />
                <span class="tooltip">			
                {t("STAKE.HELPAPR")}
          </span>
          </span>
          </StyledStakeItemHelp>
          </StyledAPR>
          <p> {APR ? `${APR}%` : '-' }</p>
      </StyledStakeItemRow>
      { version === "2" ? <StyledStakeItemRow>
          <span> {t("STAKE.REWARD")}</span>
          <p>
              {earnedText}
          </p>
      </StyledStakeItemRow> : null }
      { version === "2" ? <StyledStakeItemRow>
          <span>{t("STAKE.UNLOCKED")}</span>
          {<p>{unlockedReward }</p>}
      </StyledStakeItemRow> : null }
      <StyledStakeItemRowWithButton>
          <StyledStakeItemTextWithButton>
              <span>
                  {earnedText} {t("STAKE.EARNED")}
              </span>
              <p>{ earned }</p>
          </StyledStakeItemTextWithButton>

          <StyledStakeItemButton activeButton={ approved && canHarvest } onClick={ approved && canHarvest ? harvest : () => {} }>
              {t("STAKE.HARVEST")} <img src={HarvestIcon} alt="" />
          </StyledStakeItemButton>
      </StyledStakeItemRowWithButton>
      <StyledStakeItemRowWithButton>
          <StyledStakeItemTextWithButton>
              <span>METO {t("STAKE.INSTAKE")}</span>
              <p>{ inStake }</p>
          </StyledStakeItemTextWithButton>

          <StyledStakeItemButton activeButton={ approved && canWithdraw} onClick={ approved && canWithdraw ? withdraw : () => {} }>
              {(activeButton && `${t("STAKE.STAKE")} METO`) ||
                  version == "1" ? `${t("STAKE.WITHDRAW1")}` : `${t("STAKE.WITHDRAW2")}`}{" "}
              <img src={WithdrawIcon} alt="" />
          </StyledStakeItemButton>
      </StyledStakeItemRowWithButton>
      {version == "1" ? <StyledStakeItemRowWithButton>
          <StyledStakeItemButton onClick={ approved ? handleStake : () => {} } activeButton={ approved } style={{ width: '100%' }}>
              Stake
          </StyledStakeItemButton>
      </StyledStakeItemRowWithButton> : version == "2" ?
      <StyledStakeItemRowWithButton>
           <StyledStakeItemButton activeButton={false} style={{ width: '100%' }}>
              Stake
         </StyledStakeItemButton>
</StyledStakeItemRowWithButton>
      :null}
      <StyledStakeItemRowWithButton>
          <StyledStakeItemButton onClick={ needToApprove ? (!approved ? approve : () => {}) : handleUseConnection } activeButton={ !approved } style={{ width: '100%' }}>
              { needToApprove ? (approved ? 'Approved' : 'Approve') : t("STAKE.CONNECT") }
              <img src={WithdrawIcon} alt="" />
          </StyledStakeItemButton>
      </StyledStakeItemRowWithButton>
      { account ? 
          <StyledStakeItemAccountId>Connected as { `${account.slice(0, 6)}...${account.slice(38, 42)}` }</StyledStakeItemAccountId>
          : null
      }
</StyledStakeItemContainer>

: version == "3" || version == "4" ? 
<StyledStakeItemContainer>
{ version === "3" ? <StyledStakeItemHeader>
    <p>
       {t("SWAP.SWAPMETO")}
    </p>
    <StyledStakeItemHelp>
    <span class="i">
          <img src={HelpIcon} alt="" />
          <span class="tooltip">			
          {t("SWAP.HELPSWAP1")}
    </span>
    </span>
    </StyledStakeItemHelp>
</StyledStakeItemHeader> : version == "4" ? <StyledStakeItemHeader>
    <p>
        Swap NFT to OSHI
    </p>
    <StyledStakeItemHelp>
    <span class="i">
          <img src={HelpIcon} alt="" />
          <span class="tooltip">			
          {t("STAKE.HELPSOON")}
    </span>
    </span>
    </StyledStakeItemHelp>
</StyledStakeItemHeader> : null}

{ version === "3" ? <StyledStakeItemRow>
<StyledAPR>
  <span>{t("SWAP.RATE")}</span>
  <StyledStakeItemHelp>
   <span class="i">
    <img src={HelpIcon} alt="" />
    <span class="tooltip">	
        {t("SWAP.HELPSWAP2")}
    </span>
   </span>
  </StyledStakeItemHelp>
</StyledAPR>
<p style={{'color': '#c2abcb'}}>{Rate? `${'1 OSHI = '+Rate+' METO'}` : '-' }</p>
</StyledStakeItemRow> : version == "4" ? <StyledStakeItemRow>
<StyledAPR>
  <span>{t("SWAP.RATE")}</span>
  <StyledStakeItemHelp>
   <span class="i">
    <img src={HelpIcon} alt="" />
    <span class="tooltip">	
        {t("STAKE.HELPSOON2")}
    </span>
   </span>
  </StyledStakeItemHelp>
</StyledAPR>
<p style={{'color': '#c2abcb'}}>{Rate? `${'1 NFT = '+Rate+' OSHI'}` : '-' }</p>
</StyledStakeItemRow>
: null}
  {version == "3" ? <StyledStakeItemRowWithButton>
     <div>
        <StyledStakeItemTextWithButton style={{'margin-top': '25px'}}>
           <span>{t("SWAP.AVAILABLE")} <br />{available}</span>
        </StyledStakeItemTextWithButton>
         <StyledStakeItemTextWithButton style={{'margin-top': '30px'}}>
           <span>{t("SWAP.REMAINING")} <br />{remaining}</span> 
        </StyledStakeItemTextWithButton>
     </div>
     <div>
     <StyledStakeItemButton activeButton={ true } href="https://pancakeswap.finance/swap?outputCurrency=0xDc3541806D651eC79bA8639a1b495ACf503eB2Dd" style={{'margin-bottom': '4vh', 'textDecoration': 'none'}}>
        {t("SWAP.BUY")}
        <img src={WithdrawIcon} alt="" />
      </StyledStakeItemButton>
     <StyledStakeItemButton activeButton={ available > 0 } onClick={ available > 0 ? claimOshi : null}>
        {t("SWAP.CLAIM")}
      </StyledStakeItemButton>
    </div>
  </StyledStakeItemRowWithButton>
  : version == "4" ?
  <StyledStakeItemRowWithButton>
     <div>
        <StyledStakeItemTextWithButton style={{'margin-top': '25px'}}>
           <span>{t("SWAP.AVAILABLE")} <br />{availableNft}</span>
        </StyledStakeItemTextWithButton>
         <StyledStakeItemTextWithButton style={{'margin-top': '30px'}}>
           <span>{t("SWAP.REMAINING")} <br />{remainingNft}</span> 
        </StyledStakeItemTextWithButton>
     </div>
     <div>
     <StyledStakeItemButton activeButton={ true } href="https://pancakeswap.finance/swap?outputCurrency=0xDc3541806D651eC79bA8639a1b495ACf503eB2Dd" style={{'margin-bottom': '4vh', 'textDecoration': 'none'}}>
        {t("SWAP.BUY")}
        <img src={WithdrawIcon} alt="" />
      </StyledStakeItemButton>
      <StyledStakeItemButton activeButton={ availableNft > 0 } onClick={ availableNft > 0 ? claimOshiNft : null}>
        {t("SWAP.CLAIM")}
      </StyledStakeItemButton>
      </div>
  </StyledStakeItemRowWithButton> : null}
   
   {version == "3" ? <div>
    <StyledStakeItemRowWithButton>
          <StyledStakeItemButton  onClick={handleStake} activeButton={approved} style={{ width: '100%' }}>
          {t("SWAP.SWAPMETO")}
          </StyledStakeItemButton>
   </StyledStakeItemRowWithButton>
      <StyledStakeItemRowWithButton>
      <StyledStakeItemButton onClick={ needToApprove ? (!approved ? approve : () => {}) : handleUseConnection } activeButton={ !approved } style={{ width: '100%' }}>
        { needToApprove ? (approved ? t("SWAP.APPROVED") : t("SWAP.APPROVE") ) : t("SWAP.CONNECT") }
         <img src={WithdrawIcon} alt="" />
       </StyledStakeItemButton>
</StyledStakeItemRowWithButton>
{ account ? 
<StyledStakeItemAccountId>Connected as { `${account.slice(0, 6)}...${account.slice(38, 42)}` }</StyledStakeItemAccountId>
: null
}
</div> : version == "4" ? <div>
   <StyledStakeItemRowWithButton>
   <StyledStakeItemButton  onClick={approved && balanceNft > 0 ? swapNft : null} activeButton={approved && balanceNft > 0} style={{ width: '100%' }}>
          {t("SWAP.SWAPNFT")}
    </StyledStakeItemButton>
   </StyledStakeItemRowWithButton>
      <StyledStakeItemRowWithButton>
      <StyledStakeItemButton onClick={ needToApprove ? (!approved ? approve : () => {}) : handleUseConnection } activeButton={ !approved } style={{ width: '100%' }}>
        { needToApprove ? (approved ? t("SWAP.APPROVED") : t("SWAP.APPROVE") ) : t("SWAP.CONNECT") }
         <img src={WithdrawIcon} alt="" />
       </StyledStakeItemButton>
</StyledStakeItemRowWithButton>
{ account ? 
<StyledStakeItemAccountId>Connected as { `${account.slice(0, 6)}...${account.slice(38, 42)}` }</StyledStakeItemAccountId>
: null
}
</div> : null}
</StyledStakeItemContainer> : null}
</div>
);
};
