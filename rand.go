package mahi

import (
	"crypto/rand"

	"github.com/mr-tron/base58"
)

func RandStr(n int) string {
	buf := make([]byte, n)

	rand.Read(buf)

	return base58.Encode(buf)
}
