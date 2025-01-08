package lib

import (
	"math/rand"
	"regexp"
	"strings"
	"time"
)

const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
const numberset = "0123456789"

var seededRand = rand.New(
	rand.NewSource(time.Now().UnixNano()))

func RandomChar(length int) string {
	b := make([]byte, length)
	for i := range b {
		if i == 0 {
			b[i] = charset[seededRand.Intn(25)]
		} else {
			b[i] = charset[seededRand.Intn(len(charset))]
		}
	}
	return string(b)
}

func RandomNumber(length int) string {
	b := make([]byte, length)
	for i := range b {
		if i == 0 {
			b[i] = charset[seededRand.Intn(25)]
		} else {
			b[i] = charset[seededRand.Intn(len(numberset))]
		}
	}
	return string(b)
}

func SlugGenerator(name string) string {
	text := []byte(strings.ToLower(name))

	regE := regexp.MustCompile("[[:space:]]")
	text = regE.ReplaceAll(text, []byte("-"))

	final := string(text) + "-" + RandomChar(3)
	final = strings.ReplaceAll(final, ".", "")

	return strings.ToLower(final)
}

func CodeGenerator(name string) string {
	text := strings.ReplaceAll(name, " ", "")
	text = strings.ToLower(text)
	text = text + "-" + RandomNumber(3)

	return text
}
