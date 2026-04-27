routerAdd(
  'POST',
  '/backend/v1/admin/users/{id}/password',
  (e) => {
    const auth = e.auth
    if (!auth || auth.getString('email') !== 'dramarinadepaulaneuropediatra@gmail.com') {
      throw new ForbiddenError('Acesso restrito.')
    }

    const id = e.request.pathValue('id')
    const body = e.requestInfo().body || {}

    if (!body.password || body.password.length < 8) {
      throw new BadRequestError('A senha deve ter no mínimo 8 caracteres.')
    }

    const user = $app.findRecordById('users', id)
    user.setPassword(body.password)
    $app.save(user)

    return e.json(200, { success: true })
  },
  $apis.requireAuth(),
)
