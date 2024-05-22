import { apiSlice } from '../../app/api/apiSlice';

export const assetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssets: builder.query({
      query: () => 'Asset/all',
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetAssetsQuery } = assetApiSlice;
