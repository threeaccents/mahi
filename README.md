<img src="mahi-gopher.png" height="300" />

# Mahi [![Go Report Card](http://goreportcard.com/badge/threeaccents/mahi)](https://goreportcard.com/report/threeaccents/mahi)

Mahi is an all in one HTTP service for image processing, file_serving, and storage. Mahi also supports chunked, resumable, concurrent uploads.

Mahi currently supports any s3 compitable storage, which currently includes (s3, DO Spaces, Wasabi, Backblaze B2). The specific storage engine can be set when creating an [application](https://github.com/threeaccents/mahi#applications).

Mahi supports different databases for different use cases currently the 2 supported databased are PostgreSQL and BoltDB. The database of choice can be provided via the config file.

## Features
 - [Uploads](https://github.com/threeaccents/mahi#uploads) upload files easily via our api.
 - [Chunked, Concurrent, Resumable Uploads](https://github.com/threeaccents/mahi#large-file-uploads) upload large files by chunking them and uploading to our api.
 - [Flexible File Storage](https://github.com/threeaccents/mahi#applications) store your files in S3, Spaces, Wasabi, B2 with more options coming soon.
 - [Image Processing](https://github.com/threeaccents/mahi#file-transformations) resize, convert, crop with ease.
 - [Usage Analytics](https://github.com/threeaccents/mahi#stats) get insights on how many transformations, how much storage and bandwidth you are processing.

## Install
```bash
go get -u github.com/threeaccents/mahi/...
```
## Usage
```bash
mahid -config=/path/to/mahid.toml
```
## Applications
Mahi has the concept of applications. Each application houses specific files and the storage engine for those files. This makes mahi extremly flexible to use for different projects. If one project you decide to use s3 as your storage engine and another DO Spaces Mahi easily handles it for you.

Applications can be created via our REST interface.  //LINK to docs
## Uploads
Files are uploaded to Mahi via `multipart/form-data` requests. Along with passing in the file data you must also provide the `application_id`.
Mahi will handle processing and storing the file blob in the Application's storage engine along with storing the file meta-data in the database.
## Large File Uploads
When dealing with large files it is best to split up the file into small chunks and upload each chunk separately. Mahi easily handles chunked uploads storing each chunk and then rebuilding the full file. Once the full file is re-built Mahi uploads the file to the application's storage engine.

Other benefits of chunking up files are the ability to resume uploads and being able to upload multiple files concurrently. Mahi handles both scenarios for you with ease.
## File Transformations
Mahi supports file transformations via url query params. Currently, the supported operations are:
 - Resize (width, height) `?width=100&height=100`
 - Smart Crop `?crop=true`
 - Flip `?flip=true`
 - Flop `?flop=true`
 - Zoom `?zoom=2`
 - Black n White `?bw=true`
 - Quality(JPEG), Compression(PNG) `?quality=100` `?compression=10`
 - Format conversion `format is based of the file extension. To transform a png to webp just use the .webp extension.`

All queries can be used together with each other. For example to resize the width, make the image black and white, and change the format to webp the params would look something like this:
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

These stats can be retrieved via our REST interface.
## Config
Mahi's is configured via a toml file. Here are toml config examples. Configuration options include:
 - ***db_engine:string***(default: bolt) The main database for mahi. Valid options are `postgresql` and `bolt`. This is not to be confused with the storage engine. Storage engine is set per application via the REST api.
 - **http**
    - ***port:int***(default: 4200) the port to run mahi on.
    - ***https:boolean***(default: false) configures server to accept https requests.
    - ***ssl_cert_path:string*** path to ssl certificate. Only required if `https` is set to true.
    - ***ssl_key_path:string*** path to ssl key. Only required if `https` is set to true.
 - **security**
    - ***auth_token:string*** token for authenticating requests
    - ***aes_key:string*** key for use with AES-256 encryption. This is used to encrypt storage secrets.
 - **upload**
    - ***chunk_upload_dir:string***(default: ./data/chunks) directory for storing chunks while an upload is happening. Once an upload is completed the chunks are deleted.
    - ***full_file_dir:string***(default: ./data/files) directory for storing full files. Full files include appended chunks and when downloading a file from a storage engine. These files act as temp files that are remvoed once the request is done.
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
In order to use postgre the necessary tables must be created. SQL files are located in the [migrations](https://github.com/threeaccents/mahi/tree/master/cmd/migrations)
     
