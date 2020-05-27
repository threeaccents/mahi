package http

type fileServiceQueryParam struct {
	Width  int  `scheme:"width"`
	Height int  `scheme:"height"`
	Crop   bool `scheme:"crop"`
}
