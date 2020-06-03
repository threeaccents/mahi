package sliceutil

import "reflect"

// StrContains checks if a string slice contains an element.
func StrContains(needle string, haystack []string) bool {
	for _, a := range haystack {
		if a == needle {
			return true
		}
	}
	return false
}

// Contains checks if a slice contains an element.
func Contains(s interface{}, e interface{}) (out bool) {
	slice := convertSliceToInterface(s)

	for _, a := range slice {
		if a == e {
			return true
		}
	}

	return false
}

// convertSliceToInterface takes a slice passed in as an interface{}
// then converts the slice to a slice of interfaces.
func convertSliceToInterface(s interface{}) (slice []interface{}) {
	v := reflect.ValueOf(s)
	if v.Kind() != reflect.Slice {
		return nil
	}

	length := v.Len()
	slice = make([]interface{}, length)

	for i := 0; i < length; i++ {
		slice[i] = v.Index(i).Interface()
	}

	return slice
}
