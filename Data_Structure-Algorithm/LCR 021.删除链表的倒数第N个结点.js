const { getHeapSnapshot } = require("v8");


function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    let dmy = new ListNode(0, head);

    let slow = dmy;
    let fast = dmy;
    while (n-- > 0) {
        fast = fast.next
    }

    while (fast.next !== null) {
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;
    return dmy.next;
};