export function assertDynoMetadataEnabled(): void {
  if (
    ![
      'HEROKU_APP_ID',
      'HEROKU_APP_NAME',
      'HEROKU_APP_DEFAULT_DOMAIN_NAME',
      'HEROKU_RELEASE_CREATED_AT',
      'HEROKU_RELEASE_VERSION',
      'HEROKU_BUILD_COMMIT',
      'HEROKU_BUILD_DESCRIPTION',
    ].every((varName) => varName in process.env)
  ) {
    throw Error(
      'Please enable Heroku Dyno Metadata: https://devcenter.heroku.com/articles/dyno-metadata#usage',
    )
  }
}

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
  } else if (process.env.DYNO) {
    assertDynoMetadataEnabled()
    return `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/`
  } else {
    return `http://localhost:${port}`
  }
}
