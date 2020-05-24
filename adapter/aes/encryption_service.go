package aes

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"io"
)

type EncryptionService struct {
	Key []byte
}

func (s *EncryptionService) Encrypt(plaintext []byte) ([]byte, error) {
	c, err := aes.NewCipher(s.Key)
	if err != nil {
		return nil, err
	}

	gcm, err := cipher.NewGCM(c)
	if err != nil {
		return nil, err
	}

	nonce := make([]byte, gcm.NonceSize())
	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
		return nil, err
	}

	return gcm.Seal(nonce, nonce, plaintext, nil), nil
}

func (s *EncryptionService) EncryptToString(plaintext []byte) (string, error) {
	ciphertext, err := s.Encrypt(plaintext)
	if err != nil {
		return "", err
	}

	encoded := base64.URLEncoding.EncodeToString(ciphertext)

	return encoded, nil
}

func (s *EncryptionService) Decrypt(ciphertext []byte) ([]byte, error) {
	c, err := aes.NewCipher(s.Key)
	if err != nil {
		return nil, err
	}

	gcm, err := cipher.NewGCM(c)
	if err != nil {
		return nil, err
	}

	nonceSize := gcm.NonceSize()
	if len(ciphertext) < nonceSize {
		return nil, err
	}

	nonce, ciphertext := ciphertext[:nonceSize], ciphertext[nonceSize:]
	plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return nil, err
	}

	return plaintext, nil
}

func (s *EncryptionService) DecryptString(ciphertext string) ([]byte, error) {
	decoded, err := base64.URLEncoding.DecodeString(ciphertext)
	if err != nil {
		return nil, err
	}

	return s.Decrypt(decoded)
}
