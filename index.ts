export default function inferServerUrl({
  port,
  overrideBaseUrl,
}: {
  port?: number
  overrideBaseUrl?: string
}): string {
  if (overrideBaseUrl) {
    return overrideBaseUrl
  } else if (port === undefined) {
    return 'https://bogus.test'
  } else if (process.env.HEROKU_APP_NAME) {
    return `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/`
  } else if (process.env.DYNO) {
    throw Error(
      'In Heroku, either SERVER_URL should be set or HEROKU DYNO metadata should be enabled',
    )
  } else {
    return `http://localhost:${port}`
  }
}
