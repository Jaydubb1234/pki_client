
class MemberApi {

  static async getMembers(offSet: number, pageSize: number) {
    offSet = !offSet ? 0 : offSet
      try{
          const res = await fetch(`http://localhost:3001/api/v1/users?offSet=${offSet}&pageSize=${pageSize}`,{
              method: 'GET',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
          })
        const result = await res.json()

        console.log(result.data)
        
        
          if (result.data.length === 0) {
            return {res: "no data", err: true}
          }

          // const promiseMap = result.data.map(async (res: any) => {
          //     return {avatar_urls: await this.getMembersAvatar(res.ID)}// await this.getMembersAvatar(res.ID)
          // })
          // return Promise.all(promiseMap).then(vals => {
          //     vals.forEach( (val: any, i: number) => {
          //         result.data[i].avatar = val.avatar_urls//[24]
          //     })
          //     return {res: result.data, err:false}
          // })
          return {res: result.data, err:false}
      }
      catch (err) {
          return {res: err, err:true}
      }
  }

  static async getMembersAvatar(memberId: number){
      try{
         const res = await fetch('https://www.poetsknowit.com/wp-json/api/v1/avatar?userId='+memberId)
         const result = res.json()
         return result

      }
      catch(err){
          return false
      }
  }

  static async getMember(userId: number){
    try{
       const res = await fetch('https://www.poetsknowit.com/wp-json/api/v1/user?userId='+userId)
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


export default MemberApi;