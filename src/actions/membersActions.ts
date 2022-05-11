import MemberApi from '../api/MemberApi'

export function fetchMembers(offSet, pageSize, refreshing){
    return function(dispatch){
    //return  dispatch => {
        dispatch({
            type:'FETCH_MEMBERS_STARTED',
        })
        Promise.resolve(MemberApi.getMembers(offSet, pageSize))
          .then(data => {
            !data.err ? 
                dispatch({
                    type:'FETCH_MEMBERS_COMPLETED',
                    payload:data.res,
                    refreshing
                })
              :
                dispatch({
                    type:'FETCH_MEMBERS_ERROR',
                    error: data.res
                })
        })
          .catch(err => {
          console.log('err ',err)
            dispatch({
                type:'FETCH_MEMBERS_ERROR',
                error:err
            })
        })
    }

}

export function refreshMembers(offSet, pageSize, refreshing){
    return function(dispatch){
        dispatch({
            type:'FETCH_MEMBERS_STARTED',
        })
        Promise.resolve(MemberApi.getMembers(offSet, pageSize))
            .then( data => {
                dispatch({
                    type:'REFETCH_MEMBERS_COMPLETE',
                    payload:data.res,
                    refreshing
                })
            })
            .catch(err => {
                dispatch({
                    type:'REFETCH_MEMBERS_ERROR',
                    error:err
                })
            })
    }
}

export function addPost(post){
    return {
        type:'ADD_MEMBER',
        payload:{
            post
        }
    }
}

export function loadMore(){
    
}