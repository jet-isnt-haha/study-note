
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
    if (list1 === null) return list2;
    if (list2 === null) return list1;

    let head = new ListNode();
    let p = head;

    let indexA = list1;
    let indexB = list2;
    while (indexA !== null || indexB !== null) {

        if (indexA === null) {
            while (indexB !== null) {
                p.next = new ListNode(indexB.val);
                p = p.next;
                indexB = indexB.next;
            }
            break;
        }

        if (indexB === null) {
            while (indexA !== null) {
                p.next = new ListNode(indexA.val);
                p = p.next;
                indexA = indexA.next;
            }
            break;
        }

        if (indexB.val <= indexA.val) {
            p.next = new ListNode(indexB.val);
            p = p.next;
            indexB = indexB.next;
        } else {
            p.next = new ListNode(indexA.val);
            p = p.next;
            indexA = indexA.next;
        }

    }
    return head.next;
};