const initialState = {
  isAuthentified: false,
  toxId: null,
  publicKey: null,
  nospam: null,
  profile: {
    name: null,
    status: null,
    presence: null,
    avatar: null
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
