import decode_token from '../utils/index'
const storeReducer = (state, action) => {
    const { type, payload } = action

    if (type === 'login_success') {
        return {
            ...state,
            token: payload.token,
            userInfo: decode_token(payload.token)
        }
    }

    if (type === 'logout') {
        return {
            ...state,
            token: '',
            userInfo: ''
        }
    }

    return state
}

export default storeReducer;