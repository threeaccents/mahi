package mahi

import "time"

type UsageService interface {
	//Usages(startTime, endTime time.Time) ([]*Usage, error)
	//ApplicationUsages(applicationID string, startTime, endTime time.Time) ([]*Usage, error)
}

type UsageStorage interface {
	Update(u *UpdateUsage) error
	//Usages(startTime, endTime time.Time) ([]*Usage, error)
	//ApplicationUsages(applicationID string, startTime, endTime time.Time) ([]*Usage, error)
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
