import numeral from "numeral";
import styled, { css } from "styled-components";

// --- CONSTANTS ---
// Colors
export const COLOR_ACCENT: string = 'rgb(6, 102, 235)';
export const COLOR_GREY: string = 'rgb(246, 247, 248)';
export const COLOR_GREY_HOVER: string = 'rgb(236, 236, 236)';
export const COLOR_DARK_GREY: string = 'rgb(82, 92, 102)';
export const COLOR_BLACK: string = 'rgb(0, 0, 0)';
// Spacing
export const CONTENT_PADDING: string = '40px';
// HTTP
export const HTTP_FETCH_GET = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    }
};


// UTILS
export const formatAmount = (amount?: numeral.Numeral) => {
    if (!amount || amount.value() === null) {
        return;
    }
    const stringVal = amount.value()?.toString();
    if (!!stringVal && stringVal.length > 13) {
        amount = numeral(stringVal.substr(0, 13));
    }
    return numeral(amount.format('0,0[.]00'));
}



// --- STYLES ---
// Widget config
export const CurrencyExchangeWidgetConfig = styled.section`
    --themeAccent: ${COLOR_ACCENT};
    --themeGrey: ${COLOR_GREY};
    --themeGreyHover: ${COLOR_GREY_HOVER};
    --themeDarkGrey: ${COLOR_DARK_GREY};
    --themeBlack: ${COLOR_BLACK};
    --contentPadding: ${CONTENT_PADDING};
`;

// Reusable styles
const Heading = styled.div`
    font-weight: 700;
    text-transform: uppercase;
    color: var(--themeBlack);
`;
export const Heading1 = styled(Heading)`font-size: 18px;`;

export const Paragraph = styled.p`
    font-weight: 400;
    margin: 5px 0 0 0;
    color: var(--themeDarkGrey);
`;

export const Button = styled.button`
    padding: 10px 20px;
    border-radius: 20px;
    border: none;
    background-color: var(--themeAccent);
    font-weight: 600;
    font-size: 14px;
    color: white;
    cursor: pointer;
    max-width: 300px;
`;

// Forms

export const FormElement = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const FormElementError = styled.div`
    position: absolute;

    width: 100%;
    margin-left: 5px;
    top: 100%;

    font-size: 12px;
    color: red;
    white-space: pre;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const FormElementInfo = styled.div`
    color: var(--themeDarkGrey);
    font-size: 12px;
    position: absolute;
    top: 100%;
    margin-left: 5px;
`;

export const Switch = styled.div`
  width: 24px;
  height: 24px;

  transform: rotate(90deg) translateX(-7px);
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMiAwYzYuNjIzIDAgMTIgNS4zNzcgMTIgMTJzLTUuMzc3IDEyLTEyIDEyLTEyLTUuMzc3LTEyLTEyIDUuMzc3LTEyIDEyLTEyem0wIDJjNS41MTkgMCAxMCA0LjQ4MSAxMCAxMHMtNC40ODEgMTAtMTAgMTAtMTAtNC40ODEtMTAtMTAgNC40ODEtMTAgMTAtMTB6bTIgMTJ2LTNsNSA0LTUgNHYtM2gtOXYtMmg5em0tNC02di0zbC01IDQgNSA0di0zaDl2LTJoLTl6Ii8+PC9zdmc+');
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.5;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

// Inputs

const baseInputElementStyles = css`
    padding: 10px 10px 8px 10px;
    width: 100%;

    border-radius: 10px;
    border: none;
    background-color: var(--themeGrey);
    font-size: 14px;
    font-weight: 600;

    transition: background 0.2s ease-in-out;
    &:focus, &:hover {
        background-color: var(--themeGreyHover);
    }
`;

export const InputElement = styled.input`
    ${baseInputElementStyles};
    width: 100%;
`;

export const SelectElement = styled.select`
    ${baseInputElementStyles};
    cursor: pointer;
`;