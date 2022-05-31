import React, { useState } from "react";
import Logo from "../../assets/imgs/logo.png";
import { NavigationItem } from "../Navigation-item/Navigation-item";
import styled from "styled-components";
import Whitelisted from "../../assets/imgs/get-whitelisted.png";
import { ReactComponent as NavDevider } from "../../assets/svg/nav-devider.svg";
import { ReactComponent as Burger } from "../../assets/svg/burger.svg";
import { LangSelector } from "../Lang-selector/Lang-selector";
import { useTranslation } from "react-i18next";
import {StyledStakeItemBuy } from "../../components/StakeItem/Stake-item";
import WithdrawIcon from "../../assets/imgs/withdraw.png";

const StyledNavContainer = styled.div`
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StyledNavMenuContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1240px) {
    display: none;
  }
`;

const StyledGetWhitelistedButton = styled.a`
  display: flex;
  align-items: center;
  padding: 15px 24px;
  color: #fff;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-left: 24px;
`;

const StyledGetWhitelistedIcon = styled.img`
  margin-left: 12px;
`;

const StyledNavDevider = styled(NavDevider)`
  margin: 0 16px;
`;

const StyledButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-box-align: center;
  width: 100%;
`;
const StyledBurger = styled.div`
  z-index: 1900;
  display: none;
  span {
  }
`;

export const Navigation = ({ handleBurgerClick }) => {
  const { t } = useTranslation();

  return (
    <header style={{'display': 'flex'}}>
    <StyledNavContainer>
      <StyledBurger>
        <Burger />
      </StyledBurger>
      <div>
        <a href="https://metoshi.com"><img src={Logo} alt="METOSHI"></img></a>
      </div>
      <StyledButtonGroup>    
        <LangSelector />
      </StyledButtonGroup>
    </StyledNavContainer>
    <div style={{'margin-left': 'auto'}}>
          <StyledStakeItemBuy activeButton={ true } href="https://pancakeswap.finance/swap?outputCurrency=0xDc3541806D651eC79bA8639a1b495ACf503eB2Dd" style={{'textDecoration': 'none'}}>
              <p className="text">{t("SWAP.BUY")}</p>
             <img src={WithdrawIcon} alt="" />
          </StyledStakeItemBuy>
    </div>
    </header>
  );
};
