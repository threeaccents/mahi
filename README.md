<img src="mahi-gopher.png" height="300" />

# Mahi [![Go Report Card](http://goreportcard.com/badge/threeaccents/mahi)](https://goreportcard.com/report/threeaccents/mahi)

Mahi is an all in one HTTP service for image processing, file_serving, and storage. Mahi also supports chunked and resumable uploads. 

## Install
```bash
go get -u github.com/threeaccents/mahi/...
```
## Usage
```bash
mahid -config=/path/to/mahid.toml
```
## File Transformations
Mahi supports file transformations via url query params. Currently the supported operations are:
 - Resize (width, height) `?width=100&height=100`
 - Smart Crop `?crop=true`
 - Flip `?flip=true`
 - Flop `?flop=true`
 - Zoom `?zoom=2`
 - Black n White `?bw=true`
 - Quality(JPEG), Compression(PNG) `?quality=100` `?compression=10`
 - Format conversion `format is based of the file extension. To transform a png to webp just use the .webp extension.`



## Chunk Uploads

## Config