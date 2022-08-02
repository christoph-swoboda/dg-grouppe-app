export const initialState = {
    user: {},
    modal:false,
    deviceID:null,
    filterIds:[],
};
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.item
            }
            case "SET_MODAL":
            return {
                ...state,
                modal: action.item
            }
            case "SET_DEVICEID":
            return {
                ...state,
                deviceID: action.item
            }
            case "SET_NOTIFILTER":
            return {
                ...state,
                filterIds: [...state.filterIds, action.item]
            }
        default:
            return state;
    }
};

export default reducer;
