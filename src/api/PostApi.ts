
class PostApi {

  static async getPosts(currentUserId: number, offSet: number, pageSize: number){
      try{
          const res = await fetch(`http://localhost:3002/api/v1/posts?currentUserId=${currentUserId}&offSet=${offSet}&pageSize=${pageSize}`,{
              method: 'GET',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
          })
        const result = await res.json()

          if (result.data.length === 0) {
            return {res: "no data", err: true}
          }
        
          return {res: result.data, err:false}
      }
      catch(err){
          return {res: err, err:true, lastPostId:null}
      }
  }

  static async getPostAuthorAvatar(authorId: number){
      try{
         const res = await fetch('https://www.poetsknowit.com/wp-json/api/v1/avatar?userId='+authorId)
         const result = res.json()
         return result
      }
      catch(err){
          return false
      }
  }

  static async getPost(authorId: number){
    try{
       const res = await fetch('http://localhost:3002/api/v1/posts/'+authorId)
      const result = await res.json()

      return result.data
    }
    catch (err) {
      console.log('err ',err)
        return false
    }
  }

  static async getLikes(postId: number){
    try{
       const res = await fetch('https://www.poetsknowit.com/wp-json/api/v1/likes?postId='+postId)
       const result = res.json()
       return result
    }
    catch(err){
        return false
    }
  }

  static async getComments(postId: number){
    try{
       const res = await fetch('https://www.poetsknowit.com/wp-json/api/v1/comments?postId='+postId)
       const result = res.json()
       return result
    }
    catch(err){
        return false
    }
  }

  // public getPost: (currentUserId: string, lastId?: any) => Promise<{currentUserId: string, lastId: any}> = (currentUserId, lastId) => {
  //     return new Promise<{currentUserId: string, lastId: any}>( (resolve,reject) => {
  //         this.axiosInstance.get(`/posts/${14}`) // currentUserId switch with 14
  //             .then(function (response: any) {
  //                 console.log('response ',response)
  //                 resolve(response)
  //             })
  //             .catch(function (error: any) {
  //                 console.log(error)
  //                 reject(error)
  //             })
  //     })
  // }

  // public getPosts: (currentUserId: string, lastId?: any) => Promise<{currentUserId: string, lastId: any}> = (currentUserId, lastId) => {
  //     return new Promise<{currentUserId: string, lastId: any}>( (resolve,reject) => {
  //         this.axiosInstance.post('/posts',{currentUserId: '14', lastId})
  //             .then(function (response: any) {
  //                 console.log(response)
  //                 resolve(response)
  //             })
  //             .catch(function (error: any) {
  //                 console.log(error)
  //                 reject(error)
  //             })
  //     })
  // }

  // public createPost: (postContent: any, currentUserId?: string,) => Promise<{postContent: any, currentUserId: string}> = (postContent, currentUserId) => {
  //     return new Promise<{postContent: any, currentUserId: string}>( (resolve,reject) => {
  //         this.axiosInstance.post('/posts/create',{postContent, currentUserId: '17', })
  //             .then(function (response: any) {
  //                 console.log(response)
  //                 resolve(response)
  //             })
  //             .catch(function (error: any) {
  //                 console.log(error)
  //                 reject(error)
  //             })
  //     })
  // }
}


export default PostApi;