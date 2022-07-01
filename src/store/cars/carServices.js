import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// It is used to define our endpoints and allow to create the API slice
export const postApi = createApi({
 // The unique key that defines where the Redux store will store our cache.
 reducerPath: 'postApi',

 // The base query to request data.
 // RTK Query ships with fetchBaseQuery, which is a lightweight fetch wrapper that automatically handles request headers and response parsing in a manner similar to common libraries like axios.
 baseQuery: fetchBaseQuery({
  baseUrl: 'https://us-central1-car-deal-9915c.cloudfunctions.net/app',
 }),

 // The set of operations that we want to perform against the server.
 endpoints: (builder) => ({
  getAllPost: builder.query({
   query: () => ({
    url: '/api/all',
    method: 'GET'
   })
  }),
  getPostById: builder.query({
   query: (email) => {
    console.log("query email",email)
    return {
     url: '/api/dashboard',
     method: 'GET'
    }
   }
  }),

  deletePost: builder.mutation({
   query: (email) => {
    console.log("Delete email:", email)
    return {
     url:'/api/delete',
     method: 'DELETE'
    }
   }
  }),

  createPost: builder.mutation({
   query: (carInfo) => {
    console.log("upload car details: ", carInfo)
    return {
     url: '/api/car',
     method: 'POST',
     body: carInfo,
     headers: {
        'Content-type': 'application/json; charset=UTF-8',
       }
    }
   }
  }),

  updatePost: builder.mutation({
   query: (updatePostData) => {
    console.log("Update Post: ", updatePostData)
    const { email, ...data } = updatePostData
    console.log("Actual Update Post: ", data)
    return {
     url: '/api/update',
     method: 'PUT',
     body: data,
     headers: {
      'Content-type': 'application/json; charset=UTF-8',
     }
    }
   }
  }),
 }),

})

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const { useGetAllPostQuery, useGetPostByIdQuery, useGetPostByLimitQuery, useDeletePostMutation, useCreatePostMutation, useUpdatePostMutation } = postApi