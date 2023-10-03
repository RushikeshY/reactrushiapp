export function goToProduct(router, id) {
  router.push(`/products/view?id=${id}`);
}

export function goToLogin(router, redirect = router.asPath) {
  router.push(`/auth/login?redirect=${encodeURIComponent(redirect)}`);
}

export function getPublicURL(s) {
  return '' + s
}
