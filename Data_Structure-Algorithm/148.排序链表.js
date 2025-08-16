
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
    function middleNode(head) {
        let fast = head;
        let slow = head;
        let pre = head;
        while (fast && fast.next) {
            pre = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        pre.next = null;//断开中间的连接将其分为两段链表
        return slow;
    }

    function mergeTwoLists(list1, list2) {
        const dummy_node = new ListNode();
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

    if (head === null || head.next === null) {
        return head;
    }

    let head2 = middleNode(head);
    head = sortList(head);
    head2 = sortList(head2);

    return mergeTwoLists(head, head2);
};