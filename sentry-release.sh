SENTRY_TOKEN="ba104946f0994c26b02f1444d98a76885844c53517e046808baa0d1dd9197060"
PACKAGE_VERSION=`cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]'`

printf "\nBuilding version $PACKAGE_VERSION...\n\n"
APP_URL=$(grep APP_URL .env | xargs)

#2) cd to build directory
cd build/static/js # or whatever your build folder is

#3) create Sentry release
SOURCE_MAP=`find . -maxdepth 1 -mindepth 1 -name '*.map' | awk '{ gsub("./", "") ; print $0 }'`
printf "\nCreating a Sentry release for version $PACKAGE_VERSION...\n"

curl https://sentry.io/api/0/projects/obschak/obschak/releases/ \
  -X POST \
  -H "Authorization: Bearer ${SENTRY_TOKEN}" \
  -H 'Content-Type: application/json' \
  -d "{\"version\": \"${PACKAGE_VERSION}\"}" \

#4) Upload a file for the given release
printf "\n\nUploading sourcemap file to Sentry: ${SOURCE_MAP}...\n"
curl "https://sentry.io/api/0/projects/obschak/obschak/releases/$PACKAGE_VERSION/files/" \
  -X POST \
  -H "Authorization: Bearer ${SENTRY_TOKEN}" \
  -F file=@${SOURCE_MAP} \
  -F name="Request URL: https://${APP_URL}/$SOURCE_MAP"

