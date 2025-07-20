/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    let minHeap = [];
    function push(minHeap, val) {

        minHeap.push(val);
        const index = minHeap.length - 1;
        siftUp(minHeap, index);
    }

    function siftUp(heap, index) {

        while (index > 0 && heap[index] < heap[Math.floor((index - 1) / 2)]) {
            const parentIndex = Math.floor((index - 1) / 2);
            [heap[index], heap[parentIndex]] = [heap[parentIndex], heap[index]];
            index = parentIndex;
        }
    }
    function extractMin() {
        if (minHeap.length === 0) {
            return null;
        }
        if (minHeap.length === 1) {
            return minHeap.pop();
        }

        minHeap[0] = minHeap.pop(); // 将最后一个元素放到堆顶
    }
    for (let i = 0; i < nums.length; ++i) {

        if (minHeap.length < k) {
            push(minHeap, nums[i]);
        } else {
            if (nums[i] > minHeap[0]) {
                extractMin();
                let index = 0;
                let lastIndex = minHeap.length - 1;
                while (true) {
                    let leftChild = index * 2 + 1;
                    let rightChild = index * 2 + 2;
                    let smallIndex = index;

                    if (leftChild <= lastIndex && minHeap[leftChild] < minHeap[smallIndex]) {
                        smallIndex = leftChild;
                    }
                    if (rightChild <= lastIndex && minHeap[rightChild] < minHeap[smallIndex]) {
                        smallIndex = rightChild;
                    }

                    if (index === smallIndex) {
                        break;
                    }
                    [minHeap[smallIndex], minHeap[index]] = [minHeap[index], minHeap[smallIndex]];
                    index = smallIndex;

                }
                push(minHeap, nums[i]);
            }

        }

    }
    return minHeap;
};
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6, 7, 7, 8, 2, 3, 1, 1, 1, 10, 11, 5, 6, 2, 4, 7, 8, 5, 6], 20));
