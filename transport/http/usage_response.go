package http

import (
	"time"

	"github.com/threeaccents/mahi"
)

type usagesResponse struct {
	Data *usagesData `json:"data"`
}

type usagesData struct {
	Totals  *usageTotals   `json:"totals"`
	Metrics []*usageMetric `json:"metrics"`
}

type usageTotals struct {
	Transformations       int64 `json:"transformations"`
	UniqueTransformations int64 `json:"uniqueTransformations"`
	Bandwidth             int64 `json:"bandwidth"`
	Storage               int64 `json:"storage"`
	FileCount             int64 `json:"fileCount"`
}

type usageMetric struct {
	Transformations       int64     `json:"transformations"`
	UniqueTransformations int64     `json:"uniqueTransformations"`
	Bandwidth             int64     `json:"bandwidth"`
	Storage               int64     `json:"storage"`
	FileCount             int64     `json:"fileCount"`
	StartDate             time.Time `json:"startDate"`
	EndDate               time.Time `json:"endDate"`
}

func sanitizeTotalUsages(items []*mahi.TotalUsage) *usagesData {
	var res usagesData

	metrics := make([]*usageMetric, len(items))
	for x, i := range items {
		nu := sanitizeTotalUsageMetric(i)
		metrics[x] = nu
	}

	itemLen := len(items)
	var storage int64
	var fileCount int64
	if itemLen > 0 {
		storage = items[itemLen-1].Storage
		fileCount = items[itemLen-1].FileCount
	}

	res.Metrics = metrics
	res.Totals = &usageTotals{
		Storage:               storage,
		Transformations:       calcTotalTransformations(metrics),
		UniqueTransformations: calcTotalUniqueTransformations(metrics),
		Bandwidth:             calcTotalBandwidth(metrics),
		FileCount:             fileCount,
	}

	return &res
}

func sanitizeTotalUsageMetric(v *mahi.TotalUsage) *usageMetric {
	return &usageMetric{
		Transformations:       v.Transformations,
		UniqueTransformations: v.UniqueTransformations,
		Bandwidth:             v.Bandwidth,
		Storage:               v.Storage,
		FileCount:             v.FileCount,
		StartDate:             v.StartDate,
		EndDate:               v.EndDate,
	}
}

func sanitizeUsages(items []*mahi.Usage) *usagesData {
	var res usagesData

	metrics := make([]*usageMetric, len(items))
	for x, i := range items {
		nu := sanitizeUsageMetric(i)
		metrics[x] = nu
	}

	itemLen := len(items)
	var storage int64
	var fileCount int64
	if itemLen > 0 {
		storage = items[itemLen-1].Storage
		fileCount = items[itemLen-1].FileCount
	}

	res.Metrics = metrics
	res.Totals = &usageTotals{
		Storage:               storage,
		Transformations:       calcTotalTransformations(metrics),
		UniqueTransformations: calcTotalUniqueTransformations(metrics),
		Bandwidth:             calcTotalBandwidth(metrics),
		FileCount:             fileCount,
	}

	return &res
}

func sanitizeUsageMetric(v *mahi.Usage) *usageMetric {
	return &usageMetric{
		Transformations:       v.Transformations,
		UniqueTransformations: v.UniqueTransformations,
		Bandwidth:             v.Bandwidth,
		Storage:               v.Storage,
		FileCount:             v.FileCount,
		StartDate:             v.StartDate,
		EndDate:               v.EndDate,
	}
}

func calcTotalTransformations(items []*usageMetric) int64 {
	var total int64
	for _, item := range items {
		total += item.Transformations
	}

	return total
}

func calcTotalUniqueTransformations(items []*usageMetric) int64 {
	var total int64
	for _, item := range items {
		total += item.UniqueTransformations
	}

	return total
}

func calcTotalBandwidth(items []*usageMetric) int64 {
	var total int64
	for _, item := range items {
		total += item.Bandwidth
	}

	return total
}
