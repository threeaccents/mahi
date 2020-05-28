package mahi

import "context"

type TransformService interface {
	Transform(ctx context.Context, blob *FileBlob, opts TransformationOption) (*FileBlob, error)
}

type TransformationOption struct {
	Width       int
	Height      int
	Format      string
	Quality     int
	Compression int
	Crop        bool
	Rotate      int
	Flip        bool
}
