migrate(
  (app) => {
    const collection = new Collection({
      name: 'course_progress',
      type: 'base',
      listRule:
        "@request.auth.id != '' && (user_id = @request.auth.id || @request.auth.email = 'dramarinadepaulaneuropediatra@gmail.com')",
      viewRule:
        "@request.auth.id != '' && (user_id = @request.auth.id || @request.auth.email = 'dramarinadepaulaneuropediatra@gmail.com')",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != '' && user_id = @request.auth.id",
      deleteRule: null,
      fields: [
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'completed_lessons', type: 'json' },
        { name: 'quiz_type', type: 'text' },
        { name: 'quiz_score', type: 'number' },
        { name: 'quiz_attempts', type: 'number' },
        { name: 'passed', type: 'bool' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('course_progress')
    app.delete(collection)
  },
)
