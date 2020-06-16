export interface PreviewFile {
  id: number;
  src: string | ArrayBuffer;
  progress: number;
  name: string;
  failed: boolean;
  isImage: boolean;
}
