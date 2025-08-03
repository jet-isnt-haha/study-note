/**
 * @param {number} capacity
 */
class Node {
    constructor(key = 0, value = 0) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

var LRUCache = function (capacity) {
    this.KeyToNode = new Map();
    this.dummyNode = new Node();
    this.dummyNode.next = this.dummyNode;
    this.dummyNode.prev = this.dummyNode;
    this.capacity = capacity;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    let node = this.KeyToNode.get(key);
    if (node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        node.prev = null;
        node.next = null;

        node.prev = this.dummyNode;
        node.next = this.dummyNode.next;
        node.prev.next = node;
        node.next.prev = node;

        return node.value;
    } else {
        return -1;
    }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {

    //旧的key时
    let newNode = this.KeyToNode.get(key);
    if (!newNode) {
        let newNode = new Node(key, value);
        //当还未达到capacity且是新的key时
        newNode.prev = this.dummyNode;
        newNode.next = this.dummyNode.next;
        newNode.prev.next = newNode;
        newNode.next.prev = newNode;
        this.KeyToNode.set(key, newNode);
        if (this.KeyToNode.size > this.capacity) {
            let lastNode = this.dummyNode.prev;

            lastNode.prev.next = lastNode.next;
            lastNode.next.prev = lastNode.prev;
            lastNode.prev = null;
            lastNode.next = null;

            this.KeyToNode.delete(lastNode.key);
        }
    } else {
        newNode.value = value;

        newNode.prev.next = newNode.next;
        newNode.next.prev = newNode.prev;
        newNode.prev = null;
        newNode.next = null;

        newNode.prev = this.dummyNode;
        newNode.next = this.dummyNode.next;
        newNode.prev.next = newNode;
        newNode.next.prev = newNode;
    }


};


/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */