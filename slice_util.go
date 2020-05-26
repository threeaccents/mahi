package mahi

// StrContains checks if a string slice contains an element.
func StrContains(needle string, haystack []string) bool {
	for _, a := range haystack {
		if a == needle {
			return true
		}
	}
	return false
}
