const baseUrl =
  process.env.NODE_ENV === 'production'
    ? //? 'https://react-reserve-eze.now.sh'
      'https://shielded-plateau-66265.herokuapp.com/'
    : 'http://localhost:3000';

export default baseUrl;
