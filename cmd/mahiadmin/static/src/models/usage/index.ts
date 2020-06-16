export interface UsagesModel {
  totals: TotalModel;
  metrics: MetricModel[];
}

export interface TotalModel {
  transformations: number;
  bandwidth: number;
  storage: number;
  fileCount: number;
  nsfw: number;
  virusScans: number;
  imagesDescribed: number;
  imageTags: number;
}

export interface MetricModel {
  id: string;
  transformations: number;
  bandwidth: number;
  storage: number;
  nsfw: number;
  virusScans: number;
  imagesDescribed: number;
  imageTags: number;
  startTime: Date;
  endTime: Date;
  fileCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export const initialUsagesModel = {
  totals: {
    transformations: 0,
    bandwidth: 0,
    storage: 0,
    fileCount: 0,
    nsfw: 0,
    virusScans: 0,
    imagesDescribed: 0,
    imageTags: 0,
  },
  metrics: []
}
