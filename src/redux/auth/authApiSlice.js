import { apiSlice } from '../../redux/api/apiSlice';
import { logOut } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'User/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: 'User/logout',
        method: 'POST',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          // Ожидание завершения запроса
          await queryFulfilled;

          // Успешный запрос: очищаем состояние аутентификации
          dispatch(logOut());

          // Сбрасываем состояние всех кэшированных запросов RTK Query
          apiSlice.util.resetApiState();
        } catch {
          // Обработка ошибок, если необходимо
          console.error('Logout failed');
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
