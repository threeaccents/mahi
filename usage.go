package mahi

import (
	"context"
	"time"
)

type UsageService interface {
	Update(ctx context.Context, u *UpdateUsage) error
	Usages(ctx context.Context, startDate, endDate time.Time) ([]*TotalUsage, error)
	ApplicationUsages(ctx context.Context, applicationID string, startTime, endTime time.Time) ([]*Usage, error)
}

type UsageStorage interface {
	Update(ctx context.Context, u *UpdateUsage) (*Usage, error)
	Usages(ctx context.Context, startDate, endDate time.Time) ([]*TotalUsage, error)
	ApplicationUsages(ctx context.Context, applicationID string, startTime, endTime time.Time) ([]*Usage, error)
}

type Usage struct {
	ID              string
	ApplicationID   string
	Transformations int64
	Bandwidth       int64
	Storage         int64
	FileCount       int64
	StartDate       time.Time
	EndDate         time.Time
	CreatedAt       time.Time
	UpdatedAt       time.Time
}

type TotalUsage struct {
	Transformations int64
	Bandwidth       int64
	Storage         int64
	FileCount       int64
	StartDate       time.Time
	EndDate         time.Time
}

type NewUsage struct {
	ApplicationID   string
	Transformations int64
	Bandwidth       int64
	Storage         int64
	FileCount       int64
	StartDate       time.Time
	EndDate         time.Time
}

type UpdateUsage struct {
	ApplicationID   string
	Transformations int64
	Bandwidth       int64
	Storage         int64
	FileCount       int64
	StartDate       time.Time
	EndDate         time.Time
}
