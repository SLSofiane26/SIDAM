let InitialState = {
  prenom: null,
  nom: null,
  token: null,
  deviceToken: null,
  loading: false,
  error: false,
  email: false,
  identifiant: null,
  factures: [],
  contact: [],
};

let Reducer = (state = InitialState, action) => {
  switch (action.type) {
    case 'TOKEN':
      return Object.assign({}, state, {
        deviceToken: action.payload.token,
      });
    case 'SUCCES':
      return Object.assign({}, state, {
        token: action.payload.token,
        email: false,
        identifiant: action.payload.identifiant,
      });
    case 'USERB':
      return Object.assign({}, state, {
        prenom: action.payload.data.prenom,
        nom: action.payload.data.nom,
      });
    case 'CONTACT':
      return Object.assign({}, state, {
        contact: action.payload.data,
      });
    case 'LOGOUT':
      return Object.assign({}, state, {
        token: null,
        email: null,
        identifiant: action.payload.identifiant,
      });
    case 'ACCOUNT':
      return Object.assign({}, state, {
        account: action.payload.data,
      });
    case 'LogoutBis':
      return Object.assign({}, state, {
        identifiant: null,
      });
    case 'FACTURE':
      return Object.assign({}, state, {
        factures: action.payload.data,
      });
    default:
      break;
  }
  return state;
};

export default Reducer;
