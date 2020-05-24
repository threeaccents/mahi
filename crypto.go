package mahi

// EncryptionService manages the encrypting and decrypting of data
type EncryptionService interface {
	Encrypt(plaintext []byte) ([]byte, error)
	EncryptToString(plaintext []byte) (string, error)
	Decrypt(cipherText []byte) ([]byte, error)
	DecryptString(cipherText string) ([]byte, error)
}
