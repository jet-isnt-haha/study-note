
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
{
    var mergeKLists = function (lists) {
        function mergeTwoList(list1, list2) {
            let dummy_node = new ListNode();
            let p = dummy_node;
            while (list1 && list2) {
                if (list1.val < list2.val) {
                    p.next = list1;
                    list1 = list1.next;
                } else {
                    p.next = list2;
                    list2 = list2.next;
                }
                p = p.next;
            }
            p.next = list1 ?? list2;
            return dummy_node.next;
        }
        lists = lists.filter(list => list !== null);
        if (lists.length === 0) { return null; }



        let result = lists[0];
        for (let i = 1; i < lists.length; ++i) {
            result = mergeTwoList(result, lists[i]);
        }

        return result;
    };
}

{
    var mergeKLists = function (lists) {
        const pq = new MinPriorityQueue(node => node.val);
        for (const head of lists) {
            if (head) {
                pq.enqueue(head); // 把所有非空链表的头节点入堆
            }
        }

        const dummy = new ListNode(); // 哨兵节点，作为合并后链表头节点的前一个节点
        let cur = dummy;
        while (!pq.isEmpty()) { // 循环直到堆为空
            const node = pq.dequeue(); // 剩余节点中的最小节点
            if (node.next) { // 下一个节点不为空
                pq.enqueue(node.next); // 下一个节点有可能是最小节点，入堆
            }
            cur.next = node; // 把 node 添加到新链表的末尾
            cur = cur.next; // 准备合并下一个节点
        }
        return dummy.next; // 哨兵节点的下一个节点就是新链表的头节点
    };
}