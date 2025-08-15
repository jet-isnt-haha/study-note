
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {

    let n = 0;
    for (let i = head; i !== null; i = i.next) {
        n++;
    }

    let dummy_node = new ListNode(0, head);
    let p0 = dummy_node;
    let pre = null;
    let cur = head;

    for (; n >= k; n -= k) {
        for (let i = 0; i < k; ++i) {
            const tmp = cur.next;
            cur.next = pre;
            pre = cur;
            cur = tmp;
        }

        const tmp = p0.next;
        p0.next.next = cur;
        p0.next = pre;
        p0 = tmp;
    }

    return dummy_node.next;
};