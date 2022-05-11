import PostApi from '../api/PostApi'

export function fetchPosts(currentUserId, refreshing, offSet, pageSize){
    return function(dispatch){
    //return  dispatch => {
        dispatch({
            type:'FETCH_POSTS_STARTED',
        })
        Promise.resolve(PostApi.getPosts(currentUserId, offSet, pageSize))
          .then(data => {
            !data.err ? 
                dispatch({
                    type:'FETCH_POSTS_COMPLETED',
                    payload:data.res,
                    refreshing
                })
              :
                dispatch({
                    type:'FETCH_POSTS_ERROR',
                    error: data.res
                })
        })
        .catch(err => {
            dispatch({
                type:'FETCH_POSTS_ERROR',
                error:err
            })
        })
    }

}

export function refreshPosts(currentUserId, refreshing, offSet, pageSize){
    return function(dispatch){
        dispatch({
            type:'FETCH_POSTS_STARTED',
        })
        Promise.resolve(PostApi.getPosts(currentUserId, offSet, pageSize))
            .then( data => {
                dispatch({
                    type:'REFETCH_POSTS_COMPLETE',
                    payload:data.res,
                    refreshing
                })
            })
            .catch(err => {
                dispatch({
                    type:'REFETCH_POSTS_ERROR',
                    error:err
                })
            })
    }
}

export function addPost(post){
    return {
        type:'ADD_POST',
        payload:{
            post
        }
    }
}

export function loadMore(){
    
}