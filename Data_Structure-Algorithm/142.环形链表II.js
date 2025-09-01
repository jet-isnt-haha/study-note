
function ListNode(val) {
    this.val = val;
    this.next = null;
}


/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
    let fast = head;
    let slow = head;
    let isCircularity = false;
    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
        if (fast === slow) {
            isCircularity = true;
            break;
        }
    }
    if (isCircularity) {
        let index1 = fast;
        let index2 = head;
        while (index1 !== index2) {
            index1 = index1.next;
            index2 = index2.next;
        }
        return index1;
    }
    return null;
};

/* 
    设头节点到入环口需要走a步。设环长为c。
    设相遇的时候，慢指针走了b步，那快则走了2b步。
    设快指针比慢指针多走了k圈，即2b-b=kc。

    慢指针从入环口开始，在环中走了b-a = kc-a到达相遇点。
    因此再走a步就恰好回到入环口。
*/