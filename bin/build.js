const fs = require('fs')
const Zip = require('adm-zip')

const currentVersion = JSON.parse(
  fs.readFileSync('./src/manifest.json')
).version

const version = process.argv[2]

if (!version) {
  // eslint-disable-next-line no-console
  console.error(
    `No version number specified. Current version is ${currentVersion}.`
  )

  process.exit(1)
}

;['./src/manifest.json'].forEach((file) => {
  const json = JSON.parse(fs.readFileSync(file))

  json.version = version

  fs.writeFileSync(file, JSON.stringify(json, null, 2))
})

const zip = new Zip()

zip.addLocalFolder('./src', '')

zip.writeZip('./build/webextension.zip')
