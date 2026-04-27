migrate(
  (app) => {
    app
      .db()
      .newQuery('UPDATE course_progress SET quiz_score = 100 WHERE quiz_score > 100')
      .execute()
  },
  (app) => {
    // Down migration left empty safely as we do not want to restore incorrectly high scores
  },
)
