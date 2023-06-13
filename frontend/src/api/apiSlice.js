import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({
        // Fill in your own server starting URL here
        baseUrl: '/',
    }),
    endpoints: (build) => ({
        getUser: build.query({
            query: () => ({ url: '/persons/user', method: 'POST' }),
        }),
        getUsers: build.query({
            query: () => ({ url: '/persons/users', method: 'POST' }),
        }),
        changeGlobalRole: build.mutation({
            query: (data) => ({
                url: '/persons/global-role',
                method: 'PUT',
                body: data,
            }),
        }),
        updateCoursePersons: build.mutation({
            query: () => '/persons/course_role',
        }),
        findPeople: build.mutation({
            query: (searchString) => ({
                url: '/persons/search',
                method: 'GET',
                body: { searchString },
            }),
        }),
        getCategoriesForCourse: build.mutation({
            query: (courseId) => ({
                url: `/categories/${courseId}`,
                method: 'GET',
            }),
        }),
        getCourseData: build.mutation({
            query: (id) => ({
                url: '/categories',
                method: 'GET',
                body: { courseInstanceId: id },
            }),
        }),
        createCategory: build.mutation({
            query: (data) => ({
                url: '/categories/create',
                method: 'POST',
                body: data,
            }),
        }),
        removeCategory: build.mutation({
            query: (data) => ({
                url: `/categories/${data.id}`,
                method: 'DELETE',
            }),
        }),
        detailsCategory: build.mutation({
            query: (data) => ({
                url: `/categories/${data.id}`,
                method: 'GET',
            }),
        }),
        editCategory: build.mutation({
            query: (data) => ({
                url: `/categories/${data.id}`,
                method: 'PUT',
                body: { ...data, id: undefined },
            }),
        }),
    }),
})
