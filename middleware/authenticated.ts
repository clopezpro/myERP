export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuth } = useAuthUserStore()
  console.log(isAuth, to.path)
  /* if (!isAuth && to.path !== '/login')
    return await navigateTo('/login') */
})
