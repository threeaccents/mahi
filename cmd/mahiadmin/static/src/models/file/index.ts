export interface FileModel {
  id: string;
  fileName: string;
  fileKey: string;
  size: number;
  mimeType: string;
  mimeValue: string;
  extension: string;
  url: string;
  width: number;
  height: number;
  dataUrl?: string | ArrayBuffer;
  createdAt: string;
  updatedAt: string;
}
