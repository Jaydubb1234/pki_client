//import console = require("console");

const initialState = {
  members:[],
  fetching: false,
  fetched:false,
  error:false,
  refreshing:false,
  isMemberLoaded: false,
  loading: false,
  offSet: 0,
  pageSize: 10
  
}

const memberReducer = (state=initialState, action) => {
  switch(action.type){
      case 'FETCH_MEMBERS_STARTED': {
          return {
              ...state, 
              fetching:true,
              loading: true 
          }
      }
      case 'FETCH_MEMBERS_COMPLETED': {
          return {
              ...state, 
              members: action.refreshing ? mapRefresh(action.payload, state.members)/*[...action.payload, ...state.posts]*/ : mapRefresh(state.members, action.payload)/*[...state.posts, ...action.payload]*/,
              isMemberLoaded: true,
              refreshing:false,
              loading: false,
              offSet: state.offSet + 10
          }
      }
      case 'FETCH_MEMBERS_ERROR': {
          return{
              ...state,
              //error:[...state.posts, action.payload]
              error: action.error,
              loading: false

          }
      }
      case 'REFETCH_MEMBERS_COMPLETE':{
          return{
              ...state,
              members: mapRefresh(action.payload, state.members),//[...new Set([...action.payload, ...state.posts])],
              //refreshing: true,
              refreshing: false,
              loading: false,
          }
      }
      case 'ADD_MEMBER': {
          return{
              ...state,
              members:[...state.members, action.payload]
          }
      }
      default: 
          return state
  }
}

function mapRefresh(curr, old){
  if(old.length === 0){
      return curr
  }
//   const data = []
//   curr.forEach(val => {
//       if( (old[0] && val) && (old[0].ID < val.ID)){
//           data.push(val)
//       }
//   })
//   return [...data,...old]
    return [...curr, ...old]
}

export default memberReducer