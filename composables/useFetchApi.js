export default (url, options = {}) => {
  const { useAuthToken } = useAuth()

  console.log('token: ', useAuthToken())

  return $fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${useAuthToken().value}`
    }
  })
}
