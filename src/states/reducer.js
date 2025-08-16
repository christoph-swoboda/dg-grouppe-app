export const initialState = {
    user: {},
    modal:false,
    network:'online',
    img:null,
    resId:'',
    avatar:null,
    showModal:false,
    pushOpened:false,
    imgUploaded:false,
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
            case "SET_IMG":
            return {
                ...state,
                img: action.item
            }
            case "SET_AVATAR":
            return {
                ...state,
                avatar: action.item
            }
            case "SET_IMGUPPLOADED":
            return {
                ...state,
                imgUploaded: action.item
            }
            case "SET_RESID":
            return {
                ...state,
                resId: action.item
            }
            case "SET_PUSHOPENED":
            return {
                ...state,
                pushOpened: action.item
            }
            case "SET_NETWORK":
            return {
                ...state,
                network: action.item
            }
            case "SET_SHOWMODAL":
            return {
                ...state,
                showModal: action.item
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
