import { ReactNode, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import styled from "styled-components";

const StyledWrap = styled.div`
    display: flex;
    justify-content: center;
    margin: 50px auto;
    border-radius: 5px;
    width: 400px;
    line-height: 50px;
    color: red;
    background: var(--white);
    padding: 10px;
    box-shadow: 0px 3px 3px -2px lightgrey;
`;

interface IProps {
    children?: ReactNode;
}

export function CustomErrorBoundary({ children }: IProps) {
    let resetError: Function = () => { };

    useEffect(() => {
        resetError();
    }, [resetError]);

    return (
        <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => {
                resetError = resetErrorBoundary;
                return (
                    <StyledWrap>{`Error: ${error.message}`}</StyledWrap>
                )
            }
            }
        >
            {children}
        </ErrorBoundary>
    )
}