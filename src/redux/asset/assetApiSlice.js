import { apiSlice } from '../../redux/api/apiSlice';

export const assetApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['Assets'],
  endpoints: (builder) => ({
    getAssets: builder.query({
      query: () => 'Asset/all',
      keepUnusedDataFor: 5,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Assets', id })),
              { type: 'Assets', id: 'LIST' },
            ]
          : [{ type: 'Assets', id: 'LIST' }],
    }),
    addAsset: builder.mutation({
      query: (credential) => ({
        url: 'Asset/create',
        method: 'POST',
        body: { ...credential },
      }),
      invalidatesTags: [{ type: 'Assets', id: 'LIST' }],
    }),
  }),
});

export const { useGetAssetsQuery, useAddAssetMutation } = assetApiSlice;
