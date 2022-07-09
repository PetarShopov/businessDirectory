import { IBusiness } from '../../interfaces';
import businessesViewReducer, {
  BusinessesViewState,
  setBusinesses,
  setBusinessesLoading,
  setCurrentBusiness,
} from './businessesViewSlice';

const businessZazio: IBusiness = {
  description: "Drainage of Subdural Space with Drain Dev, Open Approach",
  email: "igowanlock0@networkadvertising.org",
  id: "T758601439",
  image: "https://images.unsplash.com/photo-1527015175922-36a306cf0e20?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&w=1000",
  name: "Zazio",
  phone: "609-306-3610",
  address: {
    city: "Manchester",
    country: "United Kingdom",
    number: "84586",
    street: "Straubel",
    zip: "SG4",
  }
};

const businessTesla: IBusiness = {
  description: "Drainage of Subdural Space with Drain Dev, Open Approach",
  email: "igowanlock0@networkadvertising.org",
  id: "6758601439",
  image: "https://images.unsplash.com/photo-1527015175922-36a306cf0e20?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&w=1000",
  name: "Tesla",
  phone: "609-306-3610",
  address: {
    city: "Manchester",
    country: "United Kingdom",
    number: "84586",
    street: "Straubel",
    zip: "SG4",
  }
};

describe('businesses view reducer', () => {
  const initialState: BusinessesViewState = {
    businesses: [],
    isBusinessesLoading: false,
    currentBusiness: undefined,
    nearbyBusinesses: [],
  };
  it('should handle initial state', () => {
    expect(businessesViewReducer(undefined, { type: 'unknown' })).toEqual({
      businesses: [],
      isBusinessesLoading: false,
      currentBusiness: undefined,
      nearbyBusinesses: [],
    });
  });

  it('should handle setBusinesses', () => {
    const actual = businessesViewReducer(initialState, setBusinesses([businessZazio]));
    expect(actual.businesses[0].id).toEqual(businessZazio.id);
  });

  it('should handle setBusinessesLoading', () => {
    const actual = businessesViewReducer(initialState, setBusinessesLoading(true));
    expect(actual.isBusinessesLoading).toEqual(true);
  });

  it('should handle setCurrentBusiness', () => {
    let actual = businessesViewReducer(initialState, setBusinesses([businessZazio]));
    actual = businessesViewReducer(actual, setCurrentBusiness(businessTesla));
    expect(actual.currentBusiness?.id).toEqual(businessTesla.id);
    expect(actual.nearbyBusinesses[0].id).toEqual(businessZazio.id);
  });
});
