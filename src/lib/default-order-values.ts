const defaultValues = {
  product: {
    vehicle: 'sm',
    date: undefined,
    time: '',
    direction: 'to-airport',
    flightArrivalDirection: '',
    flightId: '',
  },
  extras: {
    childSeatSm: '',
    childSeatMd: '',
    childSeatLg: '',
    stopoverValue: '',
    meetAndGreet: false,
  },
  customer: {
    name: '',
    email: '',
    phone: '',
    town: '',
    postal_code: '',
    address: '',
    number: '',
  },
  data: {
    paymentMethod: '',
    description: '',
  },
  isReturnJourney: false,
  returnJourney: {
    isDifferentAddress: false,
    date: undefined,
    time: '',
    flightId: '',
    flightArrivalDirection: '',
    differentAddress: {
      address: '',
      number: '',
      postal_code: '',
      town: '',
    },
  },
  conditions: false,
};

export default defaultValues;
