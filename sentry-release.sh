#!/bin/sh
SENTRY_API_KEY="ba104946f0994c26b02f1444d98a76885844c53517e046808baa0d1dd9197060"
SENTRY_ORG="obschak"
SENTRY_PROJECT_NAME="obschak"
PACKAGE_VERSION=`cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]'`
sentry-cli --auth-token=${SENTRY_API_KEY} releases --org=${SENTRY_ORG} --project=${SENTRY_PROJECT_NAME} new ${PACKAGE_VERSION}
sentry-cli --auth-token=${SENTRY_API_KEY} releases --org=${SENTRY_ORG} --project=${SENTRY_PROJECT_NAME} files ${PACKAGE_VERSION} upload-sourcemaps build/static/js/*.js.map --url-prefix "~/build/static/js/" --rewrite

