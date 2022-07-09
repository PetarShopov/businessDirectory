import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BusinessesView } from './features/businessesView/BusinessesView';
import { BusinessItem } from './components/businessItem/BusinessItem';
import { Header } from './components/header/Header';
import { RoutingEnum } from './interfaces';
import styled from 'styled-components';
import { useEffect } from 'react';
import { getBusinesses } from './features/businessesView/businessesViewSlice';
import { useAppDispatch } from './app/hooks';


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
				<Routes>
					<Route path={RoutingEnum.INITIAL} element={<BusinessesView />} />
					<Route path={`${RoutingEnum.BUSINESS}/:id`} element={<BusinessItem />} />
				</Routes>
			</BrowserRouter>
		</StyledWrapper>
	);
}

export default App;
