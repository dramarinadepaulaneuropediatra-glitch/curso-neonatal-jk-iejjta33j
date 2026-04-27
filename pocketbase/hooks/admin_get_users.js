routerAdd(
  'GET',
  '/backend/v1/admin/users',
  (e) => {
    const auth = e.auth
    if (!auth || auth.getString('email') !== 'dramarinadepaulaneuropediatra@gmail.com') {
      throw new ForbiddenError('Acesso restrito.')
    }
    const records = $app.findRecordsByFilter('users', '1=1', '-created', 1000, 0)
    const users = records.map((r) => ({
      id: r.id,
      name: r.getString('name'),
      email: r.getString('email'),
    }))
    return e.json(200, { users })
  },
  $apis.requireAuth(),
)
