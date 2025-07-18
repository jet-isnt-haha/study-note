
function ListNode(val) {
    this.val = val;
    this.next = null;
}


/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    if (!head) return false;
    let fastIndex = head;
    let slowIndex = head;

    while (fastIndex !== null && fastIndex.next !== null) {
        slowIndex = slowIndex.next;
        fastIndex = fastIndex.next.next;
        if (slowIndex === fastIndex) {
            return true;
        }
    }
    return false;
};