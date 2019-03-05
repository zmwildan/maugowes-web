import styled from "styled-components"
import {color_black_main} from "../Const"

export const DropdownStyled = styled.div`
  position: relative; 
  width: 100%;
  
  .dropdown {
    padding: 11px 15px;
    position: relative;
    z-index: unset;
    text-align: left;
  }

  &.dropdown-inline {
    position: relative;
    display: inline-flex;
  }

  .dropdown__menu {
    transition: all 0.3s ease;
    position: absolute;
    top: 100%;
    margin-left: 50%;
    border-radius: 3px 3px 0 0;
    background-color: #fff;
    z-index: 1000;
    /* height: 0; */
  }

  .dropdown-content {
    background: ${color_black_main};
    color: #FFF;
    display: none;
    position: absolute;
    min-width: 160px;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    top: 35px;
    right: 0;
    z-index: 100;

    ul {
      padding: 0;
      margin: 0;
    }

    a {
      color: #FFF;
      text-decocation: none;
    }

    &.dropdown-content-small {
      width: 180px;
      font-size: 12px;
    }

  }

  .top-notif,
  .top-japri,
  .top-explore {
    float: left;
  }

  .dropdown__toggle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }

  .dropdown__label {
    position: absolute;
    top: 7px;
    left: 6px;
  }

  /* used in header community / user profile */
  .profile-dropdown {
    border-radius: 5px;
    border: 1px solid #d5d5d5;
    background: #fff;
    margin-left: 0;
    right: -5px;
    top: 30px;
    width: 160px;
    z-index: 12;

    @media (min-width: 768px) {
      width: 240px;
    }
  }

  .profile-dropdown__list {
    margin: 0;
    list-style: none;
    padding: 0;
  }

  .profile-dropdown__link {
    color: #999797;
    display: block;
    padding: 10px 15px;
    border-top: 1px solid #d5d5d5;
    text-align: left;
  }

  .profile-dropdown__item:first-child .profile-dropdown__link {
    border-top: 0;
  }
  /* end of used in header community / user profile */

`

export default DropdownStyled
