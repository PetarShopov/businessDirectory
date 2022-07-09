import { useAppSelector } from '../../app/hooks';
import { selectBusinesses, selectIsBusinessesLoading } from './businessesViewSlice';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { IBusiness, RoutingEnum } from '../../interfaces';

const StyledTableWrapper = styled.div`
    background-color: var(--background);
    margin: 40px 40px 0px 40px;
`;

const StyledTableBodyWrapper = styled.div`
    overflow-y: overlay;
    height: calc(100vh - 146px);
`;

interface IStyledTableRowProps {
    clickable?: boolean;
}

const StyledTableRow = styled.div<IStyledTableRowProps>`
    height:40px;
    border-bottom: none;
    margin-bottom:5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    cursor: ${props => props.clickable ? 'pointer' : "default"};
`;

interface IStyledTableHeaderCellProps {
    width?: string;
}

const StyledTableHeaderCell = styled.div<IStyledTableHeaderCellProps>`
    color: var(--table-header);
    padding-left: 20px;
    font-weight: bold;
    width: ${props => props.width || "100%"};
`;

const StyledTableCell = styled(StyledTableHeaderCell)`
    color: var(--table-cell);
    font-weight: normal;
    width: ${props => props.width || "100%"};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const StyledEmptyScreen = styled.div`
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export function BusinessesView() {
    const navigate = useNavigate();
    const businesses = useAppSelector(selectBusinesses);
    const isBusinessesLoading = useAppSelector(selectIsBusinessesLoading);

    const onTableRowClick = (id: string) => {
        navigate(`${RoutingEnum.BUSINESS}/${id}`);
    }

    const renderTableHeader = () => {
        return (
            <StyledTableRow>
                <StyledTableHeaderCell
                    width="30%"
                >
                    NAME
                </StyledTableHeaderCell>
                <StyledTableHeaderCell
                    width="70%"
                >
                    DESCRIPTION
                </StyledTableHeaderCell>
            </StyledTableRow>
        )
    }

    const renderTableRow = (business: IBusiness) => {
        return (
            <StyledTableRow
                onClick={() => onTableRowClick(business.id)}
                clickable
                key={business.id}
            >
                <StyledTableCell width="30%">
                    {business.name}
                </StyledTableCell>
                <StyledTableCell width="70%">
                    {business.description}
                </StyledTableCell>
            </StyledTableRow>
        )
    }

    if (isBusinessesLoading) {
        return (
            <StyledEmptyScreen>Loading...</StyledEmptyScreen>
        )
    }

    if (businesses.length === 0) {
        return (
            <StyledEmptyScreen>No Data!</StyledEmptyScreen>
        )
    }

    return (
        <StyledTableWrapper>
            {renderTableHeader()}
            <StyledTableBodyWrapper>
                {businesses.map(business => renderTableRow(business))}
            </StyledTableBodyWrapper>
        </StyledTableWrapper>
    )
}
