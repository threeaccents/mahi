import {FileResponse} from "../../api/file";

export default function oriio() {

  const maxChunkSize = 5e+6;

  function sliceFile(file: File, chunksAmount: number): Blob[] {
    let byteIndex = 0;
    const chunks = [];

    for (let i = 0; i < chunksAmount; i += 1) {
      let byteEnd = Math.ceil((file.size / chunksAmount) * (i + 1));
      chunks.push(file.slice(byteIndex, byteEnd));
      byteIndex += (byteEnd - byteIndex);
    }

    return chunks;
  }

  function uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function url(chunk: boolean = false): string {
    return `https://staging-api.oriio.io/${chunk ? 'chunk-upload' : 'upload'}`
  }

  async function send(url: string, fd: FormData) {
    try {
      const resp = await fetch(url, {
        method: 'post',
        headers: {
          "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
        },
        body: fd,
      })

      const payload = await resp.json()

      if (payload.error) throw new Error(payload)

      return payload
    } catch (err) {
      throw new Error(err)
    }
  }

  return Object.freeze({
    async upload(applicationId: string, file: File): Promise<FileResponse> {
      if (file.size > maxChunkSize) {
        return this.chunkUpload(applicationId, file)
      }

      const fd = new FormData();
      fd.append('file', file)
      fd.append('application_id', applicationId)

      return send(url(), fd)
    },

    async chunkUpload(applicationId: string, file: File) {
      const chunksAmount = Math.ceil(file.size / maxChunkSize)

      const chunks = sliceFile(file, chunksAmount)

      const uploadId = uuidv4()

      let chunkNumber = 1;

      for (let chunk of chunks) {
        const fd = new FormData()
        fd.append('upload_id', uploadId)
        fd.append('chunk_number', chunkNumber.toString())
        fd.append('total_chunks', chunks.length.toString())
        fd.append('total_file_size', file.size.toString())
        fd.append('file_name', file.name)
        fd.append('application_id', applicationId)
        fd.append('data', chunk)

        try {
          await send(url(true), fd);
          chunkNumber++
        } catch (err) {
          throw new Error(err)
        }
      }
    },
  })
}
