package sliceutil

import (
	"testing"
)

func TestStrContains(t *testing.T) {
	var tests = []struct {
		s      interface{}
		e      interface{}
		result bool
	}{
		{[]string{"a", "b", "c", "d"}, "a", true},
		{[]string{"a", "b", "c", "d"}, "c", true},
		{[]string{"a", "b", "c", "d"}, "f", false},
	}

	for _, test := range tests {
		actual := Contains(test.s, test.e)
		if actual != test.result {
			t.Errorf("(%q,%q) = %v; want %v", test.s, test.e, actual, test.result)
		}
	}
}

func TestContains(t *testing.T) {
	// Create a test struct
	type testStruct struct {
		Name string
	}

	// Used to test pointer comparison
	testStructPointer := &testStruct{"two"}

	var tests = []struct {
		s      interface{}
		e      interface{}
		result bool
	}{
		{[]string{"a", "b", "c", "d"}, "a", true},
		{[]string{"a", "b", "c", "d"}, "c", true},
		{[]string{"a", "b", "c", "d"}, "f", false},
		{[]int{1, 2, 3, 4}, 2, true},
		{[]int{1, 2, 3, 4}, 4, true},
		{[]int{1, 2, 3, 4}, 12, false},
		{[]bool{true}, true, true},
		{[]bool{false}, true, false},
		{[]bool{false}, true, false},
		{[]testStruct{{"one"}, {"two"}}, testStruct{"one"}, true},
		{[]*testStruct{{"one"}, testStructPointer}, testStructPointer, true},
	}

	for _, test := range tests {
		actual := Contains(test.s, test.e)
		if actual != test.result {
			t.Errorf("(%q,%q) = %v; want %v", test.s, test.e, actual, test.result)
		}
	}
}
