import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    selectBusinesses,
    selectCurrentBusiness,
    selectNearbyBusinesses,
    setCurrentBusiness
} from "../../features/businessesView/businessesViewSlice";
import { RoutingEnum } from "../../interfaces";
import { CustomImage } from "../customImage/CustomImage";

const StyledWrapper = styled.div`
    height: calc(100% - 60px);
    padding: 40px;
    box-sizing: border-box;
`;

const StyledImageWrapper = styled.div`
    height: 36vh;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 4vh;
`;

const StyledBottomWrapper = styled.div`
    height: calc(100% - 40vh); 
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0px 50px;
    box-sizing: border-box;
`;

const StyledInfoBox = styled.div`
    width: 25%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-self: flex-start;
`;

const StyledInfoBoxTitle = styled.div`
    width: 100%;
    height: 100%;
    margin: 20px 0px 30px 0px;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: flex-start;
    color: var(--text-info-title);
`;

const StyledInfoBoxLine = styled.div`
    width: 100%;
    color: var(--text-secondary);
    line-height: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const StyledNearbyPlaces = styled.div`
    width: 50%;
    height: 100%;
    background-color: var(--white);
    color: var(--text-info-title);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px;
    box-sizing: border-box;
`;

const StyledNearbyPlacesTitle = styled.div`
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const StyledNearbyPlacesBody = styled.div`
    height: 100%;
    overflow-y: overlay;
`;

const StyledNearbyPlacesRow = styled.div`
    width: 100%;
    height: 40px;
    background-color: var(--background);
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    padding: 0px 15px;
    box-sizing: border-box;
    cursor: pointer;
    color: var(--text-secondary);
`;

const StyledNearbyPlacesRowName = styled.div`
    width: 150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const StyledNearbyPlacesRowInfo = styled.div`
    width: calc(100% - 150px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export function BusinessItem() {
    const params = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const currentBusiness = useAppSelector(selectCurrentBusiness);
    const businesses = useAppSelector(selectBusinesses);
    const nearbyBusinesses = useAppSelector(selectNearbyBusinesses);

    useEffect(() => {
        const currentBusiness = businesses.find(item => item.id === params.id);
        dispatch(setCurrentBusiness(currentBusiness));
    }, [businesses, params.id]);

    const onRowClick = (id: string) => {
        navigate(`${RoutingEnum.BUSINESS}/${id}`);
    }

    const renderImage = () => {
        return (
            <StyledImageWrapper>
                <CustomImage src={currentBusiness?.image}></CustomImage>
            </StyledImageWrapper>
        )
    }

    const renderNearbyPlace = () => {
        return (
            <StyledNearbyPlaces>
                <StyledNearbyPlacesTitle>Nearby Places</StyledNearbyPlacesTitle>
                <StyledNearbyPlacesBody>
                    {nearbyBusinesses.map(item => {
                        return (
                            <StyledNearbyPlacesRow
                                key={item.id}
                                onClick={() => onRowClick(item.id)}
                            >
                                <StyledNearbyPlacesRowName>{item.name}</StyledNearbyPlacesRowName>
                                <StyledNearbyPlacesRowInfo>
                                    {`${item.address.number} ${item.address.street}, ${item.address.city} ${item.address.zip}`}
                                </StyledNearbyPlacesRowInfo>
                            </StyledNearbyPlacesRow>
                        )
                    })}
                </StyledNearbyPlacesBody>
            </StyledNearbyPlaces>
        )
    }

    const renderBottom = () => {
        return (
            <StyledBottomWrapper>
                <StyledInfoBox>
                    <StyledInfoBoxTitle>Address</StyledInfoBoxTitle>
                    <StyledInfoBoxLine>{`${currentBusiness?.address?.number} ${currentBusiness?.address?.street} Street`}</StyledInfoBoxLine>
                    <StyledInfoBoxLine>{`${currentBusiness?.address?.city}, ${currentBusiness?.address?.zip}`}</StyledInfoBoxLine>
                </StyledInfoBox>
                <StyledInfoBox>
                    <StyledInfoBoxTitle>Contact</StyledInfoBoxTitle>
                    <StyledInfoBoxLine>{currentBusiness?.name}</StyledInfoBoxLine>
                    <StyledInfoBoxLine>{currentBusiness?.phone}</StyledInfoBoxLine>
                    <StyledInfoBoxLine>{currentBusiness?.email}</StyledInfoBoxLine>
                </StyledInfoBox>
                {renderNearbyPlace()}
            </StyledBottomWrapper>
        )
    }

    return (
        <StyledWrapper>
            {renderImage()}
            {renderBottom()}
        </StyledWrapper>
    );
}