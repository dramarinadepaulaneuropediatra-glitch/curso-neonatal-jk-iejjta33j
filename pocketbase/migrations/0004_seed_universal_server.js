migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'servidor@hjk.com')
      return // already seeded
    } catch (_) {}

    const record = new Record(users)
    record.setEmail('servidor@hjk.com')
    record.setPassword('hjk@2026')
    record.setVerified(true)
    record.set('name', 'Servidor Universal')
    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('_pb_users_auth_', 'servidor@hjk.com')
      app.delete(record)
    } catch (_) {}
  },
)
