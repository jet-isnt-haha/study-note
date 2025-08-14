
function ListNode(val) {
    this.val = val;
    this.next = null;
}


/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */

{
    var getIntersectionNode = function (headA, headB) {
        let p = headA, q = headB;
        while (p !== q) {
            p = p ? p.next : headB;
            q = q ? q.next : headA;
        }
        return p;
    }
}
{
    var getIntersectionNode = function (headA, headB) {
        if (headA === null || headB === null) return null;
        let lenA = 0, lenB = 0;
        let pA = new ListNode().next = headA, pB = new ListNode().next = headB;
        while (pA !== null) {
            pA = pA.next;
            lenA++;
        }
        while (pB !== null) {
            pB = pB.next;
            lenB++;
        }

        if (lenA > lenB) {
            let num = lenA - lenB;
            while (num--) {
                headA = headA.next;
            }
        } else {
            let num = lenB - lenA;
            while (num--) {
                headB = headB.next;
            }
        }

        while (headA !== null && headB !== null) {
            if (headA === headB) {
                return headA;
            } else {
                headA = headA.next;
                headB = headB.next;
            }
        }
        return null;
    };
}