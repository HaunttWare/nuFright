import styled from "styled-components";

interface Props {
  image : string;
}

export const CoverImage = styled.div<Props>`
  background: url(${(props) => `${props.image}`});
  position: absolute;
  top: 0;
  z-index: 1;
  height: 100%;
  right: 0;
  background-size: cover;
  border-radius: 11px;

  // media queries
  @media screen and (max-width: 576px) {
    width: 100%;
    background-position: 50% 50% !important; 
  }

  @media screen and (min-width: 768px) {
    width: 80%;
    background-position: -100% 10% !important;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    background-position: 50% 50% !important;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
    background-position: 50% 50% !important; 
  }

`;


// $mobile: 576px;
// $tablet: 768px;
// $laptop: 992px;
// $desktop: 1200px;