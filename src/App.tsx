import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BusinessesView } from './features/businessesView/BusinessesView';
import { BusinessItem } from './components/businessItem/BusinessItem';
import { Header } from './components/header/Header';
import { RoutingEnum } from './interfaces';
import styled from 'styled-components';
import React, { useEffect } from 'react';
import { getBusinesses } from './features/businessesView/businessesViewSlice';
import { useAppDispatch } from './app/hooks';
import { CustomErrorBoundary } from './components/shared/customErrorBoundary/CustomErrorBoundary';

const StyledWrapper = styled.div`
    height: 100vh;
    background-color: var(--background);
`;

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getBusinesses());
	}, []);

	return (
		<StyledWrapper>
			<BrowserRouter>
				<Header />
				<CustomErrorBoundary>
					<Routes>
						<Route path={RoutingEnum.INITIAL} element={<BusinessesView />} />
						<Route path={`${RoutingEnum.BUSINESS}/:id`} element={<BusinessItem />} />
					</Routes>
				</CustomErrorBoundary>
			</BrowserRouter>
		</StyledWrapper>
	);
}

export default App;
