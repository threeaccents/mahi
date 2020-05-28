package postgre

import (
	"context"
	"testing"
	"time"

	"github.com/jinzhu/now"

	"github.com/stretchr/testify/assert"
	"github.com/threeaccents/mahi"
)

func TestUsageStorage_Store(t *testing.T) {
	completeUsage := &mahi.NewUsage{ApplicationID: testApplication.ID, Transformations: 1, Bandwidth: 10, Storage: 2, FileCount: 20, StartDate: now.BeginningOfDay().Add(240 * time.Hour), EndDate: now.EndOfDay().Add(242 * time.Hour)}
	sameStartAndEndDates := &mahi.NewUsage{ApplicationID: testApplication.ID, Transformations: 1, Bandwidth: 10, Storage: 2, FileCount: 20, StartDate: now.BeginningOfDay(), EndDate: now.BeginningOfDay()}
	noApplicationID := &mahi.NewUsage{Transformations: 1, Bandwidth: 10, Storage: 2, FileCount: 20, StartDate: now.BeginningOfDay(), EndDate: now.BeginningOfDay()}

	tests := []struct {
		newUsage    *mahi.NewUsage
		expected    bool
		description string
	}{
		{completeUsage, true, "insert complete usage should be successful"},
		{sameStartAndEndDates, false, "dates must be different"},
		{noApplicationID, false, "NOT NULL fields fail"},
	}

	ctx := context.Background()

	for _, test := range tests {
		u, err := testUsageStorage.Store(ctx, test.newUsage)
		result := err == nil

		if !assert.Equal(t, test.expected, result) {
			t.Errorf("test: %s. error: %v", test.description, err)
			return
		}

		if err == nil {
			assert.NotNil(t, u.ID, test.description)
			assert.NotNil(t, u.CreatedAt, test.description)
			assert.NotNil(t, u.UpdatedAt, test.description)
			assert.Equal(t, test.newUsage.ApplicationID, u.ApplicationID, "ApplicationID should be equal", test.description)
			assert.Equal(t, test.newUsage.Transformations, u.Transformations, "Transformations should be equal", test.description)
			assert.Equal(t, test.newUsage.Bandwidth, u.Bandwidth, "Bandwidth should be equal", test.description)
			assert.Equal(t, test.newUsage.Storage, u.Storage, "Storage should be equal", test.description)
			assert.Equal(t, test.newUsage.FileCount, u.FileCount, "FileCount should be equal", test.description)
			assert.Equal(t, test.newUsage.StartDate.Format(mahi.DateLayout), u.StartDate.Format(mahi.DateLayout), "StartDate should be equal", test.description)
			assert.Equal(t, test.newUsage.EndDate.Format(mahi.DateLayout), u.EndDate.Format(mahi.DateLayout), "EndDate should be equal", test.description)
		}
	}
}

func TestUsageStorage_Update(t *testing.T) {
	createNewUsageIfNoneExist := &mahi.UpdateUsage{ApplicationID: testApplication.ID, Transformations: 1, StartDate: now.BeginningOfDay().Add(72 * time.Hour), EndDate: now.EndOfDay().Add(74 * time.Hour)}
	statsGetUpdated := &mahi.UpdateUsage{ApplicationID: testApplication.ID, Transformations: 1, Bandwidth: 1, FileCount: 1, Storage: 1, StartDate: testUsage.StartDate, EndDate: testUsage.EndDate}

	tests := []struct {
		updateUsage  *mahi.UpdateUsage
		expected     bool
		testIncrease bool
		description  string
	}{
		{createNewUsageIfNoneExist, true, false, "creates new usage if there's none for the day"},
		{statsGetUpdated, true, true, "stats increase by value provided"},
	}

	ctx := context.Background()

	for _, test := range tests {
		u, err := testUsageStorage.Update(ctx, test.updateUsage)
		result := err == nil

		if !assert.Equal(t, test.expected, result) {
			t.Errorf("test: %s. error: %v", test.description, err)
			return
		}

		if test.testIncrease {
			assert.Equal(t, testUsage.Transformations+1, u.Transformations, "transformation should have been added")
			assert.Equal(t, testUsage.Bandwidth+1, u.Bandwidth, "Bandwidth should have been added")
			assert.Equal(t, testUsage.Storage+1, u.Storage, "Storage should have been added")
			assert.Equal(t, testUsage.FileCount+1, u.FileCount, "FileCount should have been added")
		}
	}
}

func TestUsageStorage_Usages(t *testing.T) {
	tests := []struct {
		startDate   time.Time
		endDate     time.Time
		expected    bool
		description string
	}{
		{now.BeginningOfMonth(), now.EndOfMonth(), true, "usages should be returned"},
	}

	for _, test := range tests {
		a, err := testUsageStorage.Usages(context.Background(), test.startDate, test.endDate)
		result := err == nil

		if !assert.Equal(t, test.expected, result) {
			t.Errorf("test %s. error %v", test.description, err)
		}

		if err == nil {
			if !assert.NotEmpty(t, a) {
				t.Errorf("test %s. error at least 1 usage should be returned", test.description)
			}
		}
	}
}

func TestUsageStorage_ApplicationUsages(t *testing.T) {
	tests := []struct {
		applicationID string
		startDate     time.Time
		endDate       time.Time
		expected      bool
		description   string
	}{
		{testApplication.ID, now.BeginningOfMonth(), now.EndOfMonth(), true, "usages should be returned"},
	}

	for _, test := range tests {
		a, err := testUsageStorage.ApplicationUsages(context.Background(), test.applicationID, test.startDate, test.endDate)
		result := err == nil

		if !assert.Equal(t, test.expected, result) {
			t.Errorf("test %s. error %v", test.description, err)
		}

		if err == nil {
			if !assert.NotEmpty(t, a) {
				t.Errorf("test %s. error at least 1 usage should be returned", test.description)
			}
		}
	}
}
