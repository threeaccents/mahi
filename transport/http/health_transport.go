package http

import (
	"net/http"
	"runtime"
)

type HealthStats struct {
	AllocatedMemory      uint64 `json:"allocatedMemory"`
	TotalAllocatedMemory uint64 `json:"totalAllocatedMemory"`
	Goroutines           int    `json:"goroutines"`
	GCCycles             uint32 `json:"completedGCCycles"`
	NumberOfCPUs         int    `json:"cpus"`
	HeapSys              uint64 `json:"maxHeapUsage"`
	HeapAllocated        uint64 `json:"heapInUse"`
	ObjectsInUse         uint64 `json:"objectsInUse"`
	OSMemoryObtained     uint64 `json:"OSMemoryObtained"`
}

func (s *Server) handleHealth() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		mem := &runtime.MemStats{}
		runtime.ReadMemStats(mem)

		h := &HealthStats{
			AllocatedMemory:      mem.Alloc,
			TotalAllocatedMemory: mem.TotalAlloc,
			Goroutines:           runtime.NumGoroutine(),
			NumberOfCPUs:         runtime.NumCPU(),
			GCCycles:             mem.NumGC,
			HeapSys:              mem.HeapSys,
			HeapAllocated:        mem.HeapAlloc,
			ObjectsInUse:         mem.Mallocs - mem.Frees,
			OSMemoryObtained:     mem.Sys,
		}

		RespondOK(w, h)
	})
}
