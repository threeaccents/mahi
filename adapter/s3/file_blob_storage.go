package s3

import (
	"context"
	"errors"
	"fmt"

	"github.com/aws/aws-sdk-go/service/s3/s3manager"

	"github.com/aws/aws-sdk-go/aws/awserr"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3"

	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/threeaccents/mahi"
)

type FileBlobStorage struct {
	AWSSession *session.Session
}

func (s *FileBlobStorage) Upload(ctx context.Context, bucket string, b *mahi.FileBlob) error {
	uploader := s3manager.NewUploader(s.AWSSession)
	if _, err := uploader.UploadWithContext(ctx, &s3manager.UploadInput{
		Body:        b.Data,
		Bucket:      aws.String(bucket),
		Key:         aws.String(b.ID),
		ContentType: aws.String(b.MIMEValue),
	}); err != nil {
		if err := handleAWSErr(err); err != nil {
			return err
		}
		return fmt.Errorf("could not upload file to s3 compatiable storage %w", err)
	}

	return nil
}

func (s *FileBlobStorage) CreateBucket(ctx context.Context, name string) error {
	svc := s3.New(s.AWSSession)
	input := &s3.CreateBucketInput{
		Bucket: aws.String(name),
	}

	_, err := svc.CreateBucketWithContext(ctx, input)
	if err != nil {
		if err := handleAWSErr(err); err != nil {
			return err
		}
		return fmt.Errorf("could not create bucket %w", err)
	}

	if err = svc.WaitUntilBucketExists(&s3.HeadBucketInput{
		Bucket: aws.String(name),
	}); err != nil {
		if err := handleAWSErr(err); err != nil {
			return err
		}
		return err
	}

	return nil
}

func handleAWSErr(err error) error {
	var awsErr awserr.Error
	if errors.As(err, &awsErr) {
		switch awsErr.Code() {
		case s3.ErrCodeNoSuchBucket:
			return mahi.ErrBucketNotFound
		case s3.ErrCodeNoSuchKey:
			return mahi.ErrFileNotFound
		case s3.ErrCodeNoSuchUpload:
			return mahi.ErrFileNotFound
		case "InvalidAccessKeyId":
			return mahi.ErrInvalidStorageKey
		case "AccessDenied":
			return mahi.ErrInvalidStorageKey
		}

		if awsErr.Message() == "Access Denied" {
			return mahi.ErrInvalidStorageKey
		}
	}

	return nil
}
