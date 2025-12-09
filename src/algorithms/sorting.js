// Bubble Sort Generator
export function* bubbleSort(array) {
    const arr = [...array]
    const n = arr.length

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Highlight comparing elements
            yield {
                array: [...arr],
                comparing: [j, j + 1],
                sorted: Array.from({ length: n - i }, (_, k) => n - 1 - k)
            }

            if (arr[j] > arr[j + 1]) {
                // Swap
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]

                yield {
                    array: [...arr],
                    swapping: [j, j + 1],
                    sorted: Array.from({ length: n - i }, (_, k) => n - 1 - k)
                }
            }
        }
    }

    // All sorted
    yield {
        array: [...arr],
        sorted: Array.from({ length: n }, (_, i) => i),
        comparing: [],
        swapping: []
    }
}

// Quick Sort Generator
export function* quickSort(array, start = 0, end = array.length - 1) {
    const arr = [...array]

    function* quickSortHelper(low, high) {
        if (low < high) {
            const pivotIndex = yield* partition(low, high)
            yield* quickSortHelper(low, pivotIndex - 1)
            yield* quickSortHelper(pivotIndex + 1, high)
        }
    }

    function* partition(low, high) {
        const pivot = arr[high]
        let i = low - 1

        yield {
            array: [...arr],
            pivot: [high],
            comparing: []
        }

        for (let j = low; j < high; j++) {
            yield {
                array: [...arr],
                pivot: [high],
                comparing: [j]
            }

            if (arr[j] < pivot) {
                i++
                [arr[i], arr[j]] = [arr[j], arr[i]]

                yield {
                    array: [...arr],
                    pivot: [high],
                    swapping: [i, j]
                }
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]

        yield {
            array: [...arr],
            swapping: [i + 1, high],
            sorted: [i + 1]
        }

        return i + 1
    }

    yield* quickSortHelper(start, end)

    yield {
        array: [...arr],
        sorted: Array.from({ length: arr.length }, (_, i) => i)
    }
}

// Merge Sort Generator
export function* mergeSort(array) {
    const arr = [...array]

    function* mergeSortHelper(left, right) {
        if (left >= right) return

        const mid = Math.floor((left + right) / 2)

        yield* mergeSortHelper(left, mid)
        yield* mergeSortHelper(mid + 1, right)
        yield* merge(left, mid, right)
    }

    function* merge(left, mid, right) {
        const leftArr = arr.slice(left, mid + 1)
        const rightArr = arr.slice(mid + 1, right + 1)

        let i = 0, j = 0, k = left

        while (i < leftArr.length && j < rightArr.length) {
            yield {
                array: [...arr],
                comparing: [left + i, mid + 1 + j],
                merging: Array.from({ length: right - left + 1 }, (_, idx) => left + idx)
            }

            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i]
                i++
            } else {
                arr[k] = rightArr[j]
                j++
            }
            k++

            yield {
                array: [...arr],
                merging: Array.from({ length: right - left + 1 }, (_, idx) => left + idx)
            }
        }

        while (i < leftArr.length) {
            arr[k] = leftArr[i]
            i++
            k++
            yield { array: [...arr] }
        }

        while (j < rightArr.length) {
            arr[k] = rightArr[j]
            j++
            k++
            yield { array: [...arr] }
        }
    }

    yield* mergeSortHelper(0, arr.length - 1)

    yield {
        array: [...arr],
        sorted: Array.from({ length: arr.length }, (_, i) => i)
    }
}

// Heap Sort Generator
export function* heapSort(array) {
    const arr = [...array]
    const n = arr.length

    function* heapify(size, i) {
        let largest = i
        const left = 2 * i + 1
        const right = 2 * i + 2

        yield {
            array: [...arr],
            comparing: [i, left, right].filter(idx => idx < size)
        }

        if (left < size && arr[left] > arr[largest]) {
            largest = left
        }

        if (right < size && arr[right] > arr[largest]) {
            largest = right
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]]

            yield {
                array: [...arr],
                swapping: [i, largest]
            }

            yield* heapify(size, largest)
        }
    }

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        yield* heapify(n, i)
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]]

        yield {
            array: [...arr],
            swapping: [0, i],
            sorted: Array.from({ length: n - i }, (_, k) => n - 1 - k)
        }

        yield* heapify(i, 0)
    }

    yield {
        array: [...arr],
        sorted: Array.from({ length: n }, (_, i) => i)
    }
}

// Algorithm metadata
export const sortingAlgorithms = {
    bubble: {
        name: 'Bubble Sort',
        function: bubbleSort,
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.'
    },
    quick: {
        name: 'Quick Sort',
        function: quickSort,
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(log n)',
        description: 'Picks an element as pivot and partitions the array around the picked pivot.'
    },
    merge: {
        name: 'Merge Sort',
        function: mergeSort,
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        description: 'Divides the array into two halves, recursively sorts them and then merges the two sorted halves.'
    },
    heap: {
        name: 'Heap Sort',
        function: heapSort,
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(1)',
        description: 'Builds a max heap from the input data, then repeatedly extracts the maximum element.'
    }
}
