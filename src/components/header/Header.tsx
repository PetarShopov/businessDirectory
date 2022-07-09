import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { useAppDispatch } from "../../app/hooks";
import { setCurrentBusiness } from "../../features/businessesView/businessesViewSlice";
import { RoutingEnum } from "../../interfaces";


const StyledHeader = styled.div`
    height: 60px;
    background-color: white;
    box-shadow: 0 2px 4px -2px lightgrey;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledHeaderText = styled.div`
    font-size:16px;
    color: var(--logo-text);
    cursor: pointer;
`;

export function Header() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onLogoClick = () => {
        dispatch(setCurrentBusiness());
        navigate(RoutingEnum.INITIAL);
    }

    return (
        <StyledHeader>
            <StyledHeaderText onClick={onLogoClick}>LOGO</StyledHeaderText>
        </StyledHeader>
    )
}
