package mahi

import (
	crand "crypto/rand"
	"encoding/binary"
	mrand "math/rand"
)

func RandInt(min, max int) int {
	var seed int64
	binary.Read(crand.Reader, binary.BigEndian, &seed)

	mrand.Seed(seed)

	return mrand.Intn(max-min+1) + min
}

func RandStr(length int) string {
	var seed int64
	binary.Read(crand.Reader, binary.BigEndian, &seed)

	mrand.Seed(seed)
	alpha := "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"

	buf := make([]byte, length)
	for i := 0; i < length; i++ {
		buf[i] = alpha[mrand.Intn(len(alpha))]
	}
	return string(buf)
}
