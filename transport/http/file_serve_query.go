package http

type serveFileQueryParam struct {
	Width       int  `schema:"width"`
	Height      int  `schema:"height"`
	Crop        bool `schema:"crop"`
	Quality     int  `schema:"quality"`
	Compression int  `schema:"compression"`
	Rotate      int  `schema:"rotate"`
	Flip        bool `schema:"flip"`
	Flop        bool `schema:"flop"`
	Zoom        int  `schema:"zoom"`
	BW          bool `schema:"bw"`
}
