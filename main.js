/**
 * Priority Queue Node
 */
class PNode {
    /**
     * initiate a new node
     * @param {any} value 
     * @param {number} prio 
     */
    constructor(value, prio) {
        this.value = value;
        this.priority = prio;
        this.next = null;
    }
}

/**
 * Priority Queue
 */
class PriorityQueue {
    /**
     * Initiate new Priority Queue
     * @param {(a, b) => boolean} priorityCallback - Calculate priority function callback
     */
    constructor(priorityCallback) {
        this.head = null;
        this.calculatePriority = priorityCallback;
    }
    /**
     * push a node into queue, order by priority
     * @memberof PriorityQueue
     * @param {any} value 
     * @param {number} priority 
     */
    push(value, priority) {
        let startNode = this.head;
        const newNode = new PNode(value, priority);
        // If head is null => newNode is head
        if (!this.head) {
            this.head = newNode;
        // If newNode has lower priority than value than insert newNode before head
        } else if (this.calculatePriority(this.head.priority, newNode.priority)) {
            newNode.next = this.head;
            this.head = newNode; 
        } else {
            while(startNode.next !== null && !this.calculatePriority(startNode.next.priority, newNode.priority)) {
                startNode = startNode.next;
            }
            newNode.next = startNode.next;
            startNode.next = newNode;
        }
    }
    /**
     * Pop head from queue, return its value
     * @memberof PriorityQueue
     * @returns {any}
     */
    pop() {
        const tmp = this.head;
        this.head = this.head.next;
        return tmp.value;
    }
    /**
     * Iterating through queue 
     * @memberof PriorityQueue
     * @param {function} cb 
     */
    iter(cb) {
        let startNode = this.head;
        while(startNode !== null) {
            const currNode = startNode;
            startNode = startNode.next;
            cb(currNode.value);
        }
    }
    /**
     * Check if queue is empty
     * @memberof PriorityQueue
     * @returns {boolean}
     */
    isEmpty() {
        return this.head === null;
    }
    /**
     * Return queue head's value (**without popping it out**)
     * @memberof PriorityQueue
     * @returns {any}
     */
    peek() {
        return this.head.value;
    }
    /**
     * convert queue's values to an array
     * @memberof PriorityQueue
     * @returns {any[]}
     */
    toArray() {
        const arr = [];
        let startNode = this.head;
        while(startNode !== null) {
            arr.push(startNode.value);
            startNode = startNode.next; 
        }
        return arr;
    }
}