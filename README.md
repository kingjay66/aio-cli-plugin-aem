# Overview
Plugin to Adobe I/O CLI for executing commands related to Adobe Experience Manager.

<!-- toc -->
* [Overview](#overview)
* [Usage](#usage)
* [Adding New Commands](#adding-new-commands)
* [Commands](#commands)
* [Contributing](#contributing)
* [Licensing](#licensing)
<!-- tocstop -->


# Usage
To install the and use the command locally:
<!-- usage -->
```sh-session
$ npm install -g @adobe/aio-cli-plugin-aem
$ aio-aem COMMAND
running command...
$ aio-aem (-v|--version|version)
@adobe/aio-cli-plugin-aem/1.0.5 darwin-x64 node-v16.14.0
$ aio-aem --help [COMMAND]
USAGE
  $ aio-aem COMMAND
...
```
<!-- usagestop -->

# Adding New Commands

To add a new command, do the following:

* Create a new javascript file, named after the command, in src/commands/aem.
* Use the contents of src/commands/aem/upload.js as a starting point for your command, paying
particular attention to the command's `flags`, `args`, and `description`. For additional
information and features, see [https://oclif.io](https://oclif.io/).
* Ensure that the file's exports include an object with a property matching the command name.

## Testing Commands

There are a couple options for running commands through the locally cloned repository.

```
// run command through Node.js
node bin/run aem:COMMAND
```

```
// run command as a binary (Mac)
./bin/run aem:COMMAND
```

```
// run command as a binary (Windows)
bin/run.cmd aem:COMMAND
```

```
// run using specifed NPM command
npm link // only needs to be run once
aio-aem aem:COMMAND
```

# Commands
<!-- commands -->
* [`aio-aem aem:spa:set-root ROOT_PAGE`](#aio-aem-aemspaset-root-root_page)
* [`aio-aem aem:upload FILES_FOLDERS`](#aio-aem-aemupload-files_folders)

## `aio-aem aem:spa:set-root ROOT_PAGE`

Configuration for AEM SPA Projects

```
USAGE
  $ aio-aem aem:spa:set-root ROOT_PAGE

ARGUMENTS
  ROOT_PAGE  Path to the root page of your AEM project.

OPTIONS
  -h, --host=host              [default: http://localhost:4502] AEM hostname
  -i, --imsToken=imsToken      IMS Token. Please provide either username and password or an IMS token.
  -p, --pass=pass              [default: admin] AEM password
  -s, --spaVersion=spaVersion  [default: 1.5] Version of the SPA editor. Supported values are: 1.5 and 2.0

  -u, --user=user              [default: admin] AEM username. Please provide either username and password or an IMS
                               token.

  -v, --version                Show version

  --help                       Show help

DESCRIPTION
  Updates the remote SPA configuration property of your AEM project to the 
  location your SPA is deployed to. This will only work if you used aio to 
  bootstrap and deploy your SPA.

  Authentication to AEM can be done either via IMS or username and password. Either
  provide the values as flags or use the IMS_TOKEN environment variable.

  Please also specify the version of the SPA / Universal Editor your project is using.
  The version can be derived from the main page component you are using.

  spa-project-core/components/remotepagenext -> Version 1.5
  spa-project-core/components/page -> Version 2.0

ALIASES
  $ aio-aem aem:spa:set-root

EXAMPLES
  $ aio aem:spa-set-root -s 1.5 /content/wknd/us/en
  $ aio aem:spa-set-root -u admin -p admin -h http://localhost:4502 -s 2.0 /content/wknd/us/en
  $ aio aem:spa-set-root -i IMS_TOKEN -h https://author.adobeaemcloud.com/ /content/wknd/us/en
```

_See code: [src/commands/aem/spa/set-root.js](https://github.com/adobe/aio-cli-plugin-aem/blob/v1.0.5/src/commands/aem/spa/set-root.js)_

## `aio-aem aem:upload FILES_FOLDERS`

Upload asset binaries to AEM

```
USAGE
  $ aio-aem aem:upload FILES_FOLDERS

ARGUMENTS
  FILES_FOLDERS  Space-delimited list of files and folders to upload.

OPTIONS
  -a, --access_token=access_token  User or service account access token
                                   For authenticating with the target AEM instance.

  -c, --credential=credential      [default: admin:admin] AEM credential
                                   The username and password for authenticating with the
                                   target AEM instance. Should be in the format
                                   <username>:<password>.

  -d, --deep                       Whether or not to perform
                                   a deep upload

  -h, --host=host                  [default: http://localhost:4502] AEM host
                                   The host value of the AEM instance where files will be
                                   uploaded. This should include everything in the host's
                                   URL up until /content/dam.

  -l, --log=log                    [default: upload-${timestamp}.log] Log file path
                                   The local path to where the process's log messages
                                   should be saved.

  -o, --output=output              [default: result-${timestamp}.html] Result html file path
                                   The local path to where the process's metrics will be
                                   saved in html format.

  -r, --threads=threads            [default: 5] Maximum threads
                                   Maximum number of files to upload concurrently.

  -t, --target=target              [default: /content/dam/aem-upload-${timestamp}] Target AEM folder
                                   The folder in the target AEM instance where asset
                                   binaries should be uploaded. Should always begin with
                                   /content/dam.

  -v, --version                    Show version

  --help                           Show help

DESCRIPTION
  Uploads one or more files to a target AEM instance. The upload process uses the
  direct binary access algorithm, so the target instance must have direct binary
  access enabled; otherwise the upload will fail.

  The process will upload the files or directories (non-recursive) provided in
  the command.

EXAMPLES
  $ aio aem:upload myimage.jpg
  $ aio aem:upload -h http://myaeminstance -c admin:12345 myimage.jpg
  $ aio aem:upload -h http://myaeminstance -a myaccesstoken -t /content/dam/myassets myimage.jpg
```

_See code: [src/commands/aem/upload.js](https://github.com/adobe/aio-cli-plugin-aem/blob/v1.0.5/src/commands/aem/upload.js)_
<!-- commandsstop -->

# Contributing

Contributions are welcomed! Read the [Contributing Guide](CONTRIBUTING.md) for more information.

# Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
