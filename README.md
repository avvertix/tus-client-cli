# Tus Client as Binary

A [Tus protocol](https://tus.io/) client as a single binary file. 

You can use it to upload a file to a Tus server or just to try if a Tus server is properly configured.


## Getting Started

Download the pre-built binary for your Operating System from the [Release page](https://github.com/avvertix/tus-client-cli/releases/latest).

Then upload a file to a tus.io based server

```bash
$ tus-client upload <FILE> <TUS_SERVER>
# e.g. tus-client.exe upload readme.md https://master.tus.io/files/
```

> running `tus-client` without command and options outputs the help message

## Commands and options

### Options, when no command is specified

- `-V` (or `--version`): output the program version
- `-h` (or `--help`): output the help message

### Commands

#### `upload`

Perform a file upload to a Tus server

```
upload [options] <file> <server>  Upload a <file> to the Tus <server>
```

The upload carries the following automatic metadata

- `filename`: The name of the file being uploaded
- `filesize`: The file size
- `filetype`: The file mime type (based on the file extension)
- `upload_request_id`: An identifier associated to the request

**Arguments**

- `<file>` the file to upload (required)
- `<server>` the Tus server endpoint URL (required)


**Options**

- `-h` (or `--help`) Output usage information
- `--meta [data]`  Add custom metadata to the upload. Please format the `[data]` string as a key/value map, separated by a comma, e.g. `"token=hello,request_id=counter"`


**Example**

Upload a file and pass a custom `token` metadata, with the value of `ABCD`

```bash
tus-client.exe upload --meta "token=ABCD" readme.md https://master.tus.io/files/
```

## Compile from source

**Requirements:**

- NodeJS (6.0 or newer)
- NPM

> Yes, it is a Javascript project, but thanks to [PKG, by Zeit](https://github.com/zeit/pkg) can be packed into a real executable.

**Generate the binaries**

Download all the dependencies

```bash
# pull the dependencies
npm install
```
Now generate the binaries for MacOS, Windows and Linux in the `./dist` folder

```bash
# Build the executables
npm run production
```

## Contribution

Contributions are welcomed, just make a pull request.

The code styling is enforced by eslint, remember to run

```bash
npm run lint
```

and review the style problems.

If you feel confident you can run

```bash
npm run lint -- --fix
# or npm run lint:fix
```

to automatically fix the problems

## License

This project is licensed under the MIT license, see `LICENSE.txt`.
