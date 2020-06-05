<img src="mahi-gopher.png" height="300" />

# Mahi [![Go Report Card](http://goreportcard.com/badge/threeaccents/mahi)](https://goreportcard.com/report/threeaccents/mahi) [![GoDoc](http://img.shields.io/badge/godoc-reference-blue.svg)](http://godoc.org/github.com/threeaccents/mahi)


Mahi is an all in one HTTP service for image processing, file serving, and storage. Mahi also supports chunked, resumable, and concurrent uploads. Mahi uses Libvips behind the scenes making it extremely fast and memory efficient.

Mahi currently supports any s3 compatible storage, which includes (AWS s3, DO Spaces, Wasabi, Backblaze B2). The specific storage engine can be set when creating an [application](https://github.com/threeaccents/mahi#applications).

Mahi supports different databases for storing file meta-data and analytics. Currently, the 2 supported databased are PostgreSQL and BoltDB. The database of choice can be provided via the config file.

## Features
 - [Uploads](https://github.com/threeaccents/mahi#uploads) upload files easily via our Web API.
 - [Chunked, Concurrent, Resumable Uploads](https://github.com/threeaccents/mahi#large-file-uploads) upload large files by chunking them and uploading them to our Web API.
 - [Flexible File Storage](https://github.com/threeaccents/mahi#applications) store your files in S3, Spaces, Wasabi, B2 with more options coming soon.
 - [Image Processing](https://github.com/threeaccents/mahi#file-transformations) resize, convert, and crop with ease.
 - [Usage Analytics](https://github.com/threeaccents/mahi#stats) get insights on how many transformations, how much storage and bandwidth you are processing.

## Install
Libvips must be installed on your machine. 
### Ubuntu
```bash
sudo apt install libvips libvips-dev libvips-tools
```
### MacOS
```bash
brew install vips
```
For other systems check out instructions [here](https://github.com/libvips/libvips/wiki#building-and-installing).

Installing mahid server.
```bash
go get -u github.com/threeaccents/mahi/...
```
This will install the `mahid` command in your `$GOPATH/bin` folder.
## Usage
```bash
mahid -config=/path/to/config.toml
```
If no config is passed Mahi will look for a `mahi.toml` file in the current directory.
## Applications
Mahi has the concept of applications. Each application houses specific files and the storage engine for those files. This makes Mahi extremely flexible to use for different projects. If on one project you decide to use s3 as your storage engine and another DO Spaces, Mahi easily handles it for you.

Applications can be created via our [Web API](https://mahi-api-docs.threeaccents.com/#req_10641a46be544cae978fa83b6fe1f00e).
## Uploads
Files are uploaded to Mahi via `multipart/form-data` requests. Along with passing in the file data, you must also provide the `application_id`.
Mahi will handle processing and storing the file blob in the application's storage engine along with storing the file meta-data in the database.
## Large File Uploads
When dealing with large files, it is best to split the file into small chunks and upload each chunk separately. Mahi easily handles chunked uploads storing each chunk and then re-building the whole file. Once the whole file is re-built Mahi uploads the file to the application's storage engine.

Other benefits of chunking up files are the ability to resume uploads and uploading multiple chunks concurrently. Mahi handles both scenarios for you with ease.
## File Transformations (More Coming Soon)
Mahi supports file transformations via URL query params. Currently, the supported operations are:
 - Resize (width, height) `?width=100&height=100`
 - Smart Crop `?crop=true`
 - Flip `?flip=true`
 - Flop `?flop=true`
 - Zoom `?zoom=2`
 - Black n White `?bw=true`
 - Quality(JPEG), Compression(PNG) `?quality=100` `?compression=10`
 - Format conversion `format is based on the file extension. To transform a png to webp, just use the .webp extension.`

All queries can be used together with each other. For example, to resize the width, make the image black and white, and change the format to webp the params would look something like this:
```
https://yourdomain.com/myimage.webp?width=100&bw=true
```
## Stats
Mahi currently tracks these stats for both specific applications and the service as a hole:
 - Transformations: Total transformations
 - Unique Transformations: Unique transformations per file. 
 - Bandwidth: Bytes served.
 - Storage: Bytes stored.
 - File Count: Total files.

These stats can be retrieved via our [Web API](https://mahi-api-docs.threeaccents.com/#req_4971b4c6a7854cad87e45d2150c7db64).
## Config
Mahi's is configured via a toml file. Here are toml [config examples](https://github.com/threeaccents/mahi/tree/master/examples/config). Configuration options include:
 - ***db_engine:string***(default: bolt) The main database for mahi. Valid options are `postgres` and `bolt`. This is not to be confused with the storage engine. Storage engine is set per application via the [Web API](https://mahi-api-docs.threeaccents.com/#req_10641a46be544cae978fa83b6fe1f00e).
 - **http**
    - ***port:int***(default: 4200) the port to run mahi on.
    - ***https:boolean***(default: false) configures server to accept https requests.
    - ***ssl_cert_path:string*** path to ssl certificate. Only required if `https` is set to true.
    - ***ssl_key_path:string*** path to ssl key. Only required if `https` is set to true.
 - **security**
    - ***auth_token:string*** token for authenticating requests
    - ***aes_key:string*** key for use with AES-256 encryption. This is used to encrypt storage secrets.
 - **upload**
    - ***chunk_upload_dir:string***(default: ./data/chunks) directory for storing chunks while an upload is happening. Once an upload is completed, the chunks are deleted.
    - ***full_file_dir:string***(default: ./data/files) full_files are temp files used while building chunks or downloading files from the storage engine. These temp files are removed once the request is completed.
    - ***max_chunk_size:int64***(default: 10MB) max size of a file chunk in bytes.
    - ***max_file_size_upload:int64***(default: 50MB) max size of a file for a regular upload in bytes.
    - ***max_transform_file_size:int64***(default: 50MB) max size of a file that can be transformed in bytes.
 - **bolt(only used if `db_engine` is set to bolt**
    - ***dir:string***(default: ./data/mahi/mahi.db) directory for bolt db file.
 - **postgresql(only used if `db_engine` is set to postgresql)**
    - ***database:string***(default: mahi) name of database.
    - ***host:string***(default: localhost) host of database.
    - ***port:int***(default: 5432)  port of database.
    - ***user:string***(default: mahi) username of database.
    - ***password:string***(default: ) password of database.   
    - ***max_conns:int***(default: 10 connections per CPU) maximum connections for database pool.   
## Postgre
To use Postgres the necessary tables must be created. SQL files are located in the [migrations](https://github.com/threeaccents/mahi/tree/master/cmd/migrations) folder. In the future, Mahi will come with a migrate command that will automatically do everything for you. For now, you have 2 options. Install [tern](https://github.com/jackc/tern), `cd` into the migrations folder, and run `tern migrate`. The second option is just to copy and paste the SQL provided directly in a GUI or command line instance of Postgre.
     
