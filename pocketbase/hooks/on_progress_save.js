onRecordValidate((e) => {
  const score = e.record.getInt('quiz_score')
  if (score > 100) {
    e.record.set('quiz_score', 100)
  }
  e.next()
}, 'course_progress')
