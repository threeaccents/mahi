package mahi

import "context"

type TransformService interface {
	Transform(ctx context.Context, blob *FileBlob, opts TransformationOption) (*FileBlob, error)
}

type TransformationOption struct {
	// Width
	Width int
	// Height
	Height int
	// Format
	Format string
	// Quality the quality of the JPEG image defaults to 80.
	Quality int
	//  Compression compression for a PNG image defaults to 6.
	Compression int
	// Crop uses lib vips smart crop to crop image
	Crop bool
	// Rotate image rotation angle. Must be a multiple of 90
	Rotate int
	// Flip flips an image
	Flip bool
	// Flop flops an image
	Flop bool
	// Zoom
	Zoom int
	// black and white
	BW bool
}
