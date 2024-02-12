import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface OrderResponse {
  "order": Order
}

interface Order {
    "id": string,
    "status": string,
    "amount": number,
    "currency": string
}

export const orderApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api',
  }),
  tagTypes: ['Order'],
  endpoints: (build) => ({

    getOrderById: build.query<OrderResponse, string>({
      query: (id) => ({ url: `orders/${id}` }),    
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
    
    deleteOrderById: build.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
  }),
});

export const { useGetOrderByIdQuery, useDeleteOrderByIdMutation } = orderApi