package application

import (
	"context"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/threeaccents/mahi/adapter/s3"

	"github.com/gosimple/slug"

	"github.com/threeaccents/mahi"
)

func (s *Service) FileBlobStorage(engine, accessKey, secretKey, region, endpoint string) (mahi.FileBlobStorage, error) {
	var fileBlobStorage mahi.FileBlobStorage
	var err error

	switch engine {
	case mahi.StorageEngineAzureBlob:
		return nil, fmt.Errorf("engine not supported yet")
	default:
		// s3, DO, wasabi, b2
		fileBlobStorage, err = s.s3FileBlobStorage(accessKey, secretKey, region, endpoint)
		if err != nil {
			return nil, fmt.Errorf("cuold not create s3 file blob storage %w", err)
		}
	}

	return fileBlobStorage, nil
}

func (s *Service) createStorageBucket(ctx context.Context, n *mahi.NewApplication) error {
	fileBlobStorage, err := s.FileBlobStorage(n.StorageEngine, n.StorageAccessKey, n.StorageSecretKey, n.StorageRegion, n.StorageEndpoint)
	if err != nil {
		return err
	}

	if err := fileBlobStorage.CreateBucket(ctx, n.StorageBucket); err != nil {
		return err
	}

	return nil
}

func (s *Service) s3FileBlobStorage(accessKey, secretKey, region, endpoint string) (*s3.FileBlobStorage, error) {
	// get the user's access keys
	plaintextSecret, err := s.EncryptionService.DecryptString(secretKey)
	if err != nil {
		return nil, fmt.Errorf("could not decrypt storage secret key %w", err)
	}

	// create storage engine configuration
	creds := credentials.NewStaticCredentials(accessKey, string(plaintextSecret), "")
	config := &aws.Config{
		Endpoint:    aws.String(endpoint),
		Region:      aws.String(region),
		Credentials: creds,
		HTTPClient:  &http.Client{Timeout: 5 * time.Minute},
	}

	// create a new s3 session
	sess, err := session.NewSession(config)
	if err != nil {
		return nil, err
	}
	return &s3.FileBlobStorage{
		AWSSession: sess,
	}, nil
}

func makeStorageEndpoint(engine, region string) string {
	switch engine {
	case mahi.StorageEngineDigitalOcean:
		return fmt.Sprintf("%s.digitaloceanspaces.com", region)
	case mahi.StorageEngineWasabi:
		return fmt.Sprintf("s3.%s.wasabisys.com", region)
	case mahi.StorageEngineB2:
		return fmt.Sprintf("s3.%s.backblazeb2.com", region)
	default:
		return ""
	}
}

func makeStorageBucketName(appname string) string {
	salt := strconv.Itoa(mahi.RandInt(1000, 10000))
	sluggedName := appname + "-" + salt

	return slug.Make("mahi-" + sluggedName)
}
