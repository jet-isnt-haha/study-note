
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {

    //寻找中间节点
    let slow = head, fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    //反转后半段链表
    let pre = null;
    let cur = slow;
    while (cur !== null) {
        const tmp = cur.next;
        cur.next = pre;
        pre = cur;
        cur = tmp;
    }

    while (pre !== null) {
        if (pre.val !== head.val) {
            return false;
        }
        pre = pre.next;
        head = head.next;
    }
    return true;
};