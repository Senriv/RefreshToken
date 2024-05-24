import { apiSlice } from '../../redux/api/apiSlice';

export const assetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssets: builder.query({
      query: () => 'Asset/all',
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetAssetsQuery } = assetApiSlice;
