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
    name: 'Miro',
    email: 'miro.grujin@hotmail.com',
    phone: '0123456789',
    town: '',
    postal_code: '',
    address: 'Huglgasse',
    number: '22',
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
