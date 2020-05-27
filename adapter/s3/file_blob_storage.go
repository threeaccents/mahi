package s3

import (
	"context"
	"errors"
	"fmt"
	"io/ioutil"

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

func (s *FileBlobStorage) FileBlob(ctx context.Context, bucket, id, tempDir string) (*mahi.FileBlob, error) {
	downloader := s3manager.NewDownloader(s.AWSSession)

	svc := s3.New(s.AWSSession)

	resp, err := svc.HeadObject(&s3.HeadObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(id),
	})
	if err != nil {
		return nil, fmt.Errorf("could not get object meta data %w", err)
	}

	buff, err := ioutil.TempFile(tempDir, "s3-")
	if err != nil {
		return nil, err
	}

	if _, err := downloader.DownloadWithContext(ctx, buff, &s3.GetObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(id),
	}); err != nil {
		if err := handleAWSErr(err); err != nil {
			return nil, err
		}
		return nil, fmt.Errorf("could not get file from s3 compatible storage %w", err)
	}

	f := &mahi.FileBlob{
		ID:           id,
		Data:         buff,
		MIMEValue:    *resp.ContentType,
		Size:         *resp.ContentLength,
		TempFileName: buff.Name(),
	}

	return f, nil
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
