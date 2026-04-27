migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'dramarinadepaulaneuropediatra@gmail.com')
      return
    } catch (_) {}

    const record = new Record(users)
    record.setEmail('dramarinadepaulaneuropediatra@gmail.com')
    record.setPassword('hjk@2012')
    record.setVerified(true)
    record.set('name', 'Admin Marina de Paula')
    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail(
        '_pb_users_auth_',
        'dramarinadepaulaneuropediatra@gmail.com',
      )
      app.delete(record)
    } catch (_) {}
  },
)
