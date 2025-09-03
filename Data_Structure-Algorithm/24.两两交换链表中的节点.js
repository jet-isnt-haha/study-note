
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
    let dummy_node = new ListNode(0, head);
    let p0 = dummy_node;
    let prev = null;
    let curr = head;
    let n = 0;
    for (let i = head; i; i = i.next) n++;
    for (; n >= 2; n -= 2) {
        for (let j = 0; j < 2; ++j) {
            const next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        const tmp = p0.next;
        p0.next.next = curr;
        p0.next = prev;
        p0 = tmp;
    }
    return dummy_node.next;
};