export function logError(err: Error) {
  console.log(err)
  if (err.message === 'username Taken') {
    throw new Error('username already taken - please choose another')
  } else if (err.message === 'Forbidden') {
    throw new Error('Admin permissions required')
  } else {
    console.error(
      'Error consuming the API (in client/apiUsers.ts):',
      err.message,
    )
    throw err
  }
}
