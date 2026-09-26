import { DsaProblem, HackathonItem } from '../types/portfolio';

export interface DsaTelemetryMetrics {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  easyTarget: number;
  mediumTarget: number;
  hardTarget: number;
  acceptanceRate: number;
  contestRating: number;
  topPercentile: number;
  activeStreakDays: number;
}

export const DSA_TELEMETRY: DsaTelemetryMetrics = {
  totalSolved: 318,
  easySolved: 114,
  mediumSolved: 162,
  hardSolved: 42,
  easyTarget: 120,
  mediumTarget: 180,
  hardTarget: 50,
  acceptanceRate: 74.2,
  contestRating: 1846,
  topPercentile: 6.4,
  activeStreakDays: 148
};

export const DSA_TOPIC_BREAKDOWN = [
  { name: 'Dynamic Programming', count: 54, percentage: 85, icon: 'Zap' },
  { name: 'Graphs & DAG Scheduling', count: 48, percentage: 80, icon: 'GitBranch' },
  { name: 'Trees & Binary Search', count: 52, percentage: 88, icon: 'Layers' },
  { name: 'Sliding Window & Two Pointers', count: 41, percentage: 76, icon: 'Sliders' },
  { name: 'Concurrency & Locking', count: 26, percentage: 70, icon: 'Cpu' },
  { name: 'Trie & String Algorithms', count: 32, percentage: 68, icon: 'Terminal' },
  { name: 'Heaps & Priority Queues', count: 35, percentage: 74, icon: 'Database' },
  { name: 'Bit Manipulation & Math', count: 30, percentage: 65, icon: 'Activity' }
];

export const CURATED_DSA_PROBLEMS: DsaProblem[] = [
  {
    id: 'dsa-lru-cache',
    title: 'LRU (Least Recently Used) Cache',
    platform: 'LeetCode',
    difficulty: 'Medium',
    category: 'system-design',
    categoryLabel: 'System Design & Caching',
    systemApplication: 'Core eviction policy in Redis, Caffeine Cache, and Linux Virtual Memory Page Replacements.',
    timeComplexity: 'O(1) Get · O(1) Put',
    spaceComplexity: 'O(Capacity)',
    problemSummary: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) average time complexity for both get() and put() operations.',
    keyTakeaway: 'Combines a doubly linked list (for O(1) node relocation on access) with a HashMap (for O(1) key-to-node lookup). Dummy head and tail sentinel nodes eliminate null pointer edge cases.',
    invariants: [
      'Head.next always points to the Most Recently Used (MRU) node.',
      'Tail.prev always points to the Least Recently Used (LRU) candidate for eviction.',
      'HashMap and Doubly Linked List node counts are always strictly identical and bounded by capacity.'
    ],
    testCaseDemo: {
      input: 'capacity = 2; put(1, 1); put(2, 2); get(1); put(3, 3); get(2); put(4, 4); get(1); get(3); get(4);',
      expectedOutput: '[get(1)->1, get(2)->-1 (evicted), get(1)->-1 (evicted), get(3)->3, get(4)->4]',
      executionTimeMs: 0.18,
      memoryFootprint: '48.2 KB (Heap)',
      executionLog: [
        'INIT: Allocated LRUCache(capacity=2) with sentinel head/tail nodes.',
        'PUT(1, 1): Node(1) inserted at MRU head. Size=1/2.',
        'PUT(2, 2): Node(2) inserted at MRU head. Size=2/2 [CAPACITY REACHED].',
        'GET(1) -> 1: Hit! Promoted Node(1) from tail neighbor to MRU head.',
        'PUT(3, 3): Capacity exceeded. Evicted tail.prev Node(2). Inserted Node(3) at head.',
        'GET(2) -> -1: Miss! Node(2) was previously evicted.',
        'PUT(4, 4): Evicted Node(1). Inserted Node(4) at MRU head.',
        'ASSERT: All assertions passed with zero memory leaks.'
      ]
    },
    url: 'https://leetcode.com/problems/lru-cache/',
    solutionCode: `import java.util.HashMap;
import java.util.Map;

/**
 * Production-Grade LRU Cache
 * Used as the fundamental building block of distributed in-memory cache engines.
 */
public class LRUCache {
    private static class Node {
        int key;
        int value;
        Node prev;
        Node next;
        Node(int k, int v) { this.key = k; this.value = v; }
    }

    private final int capacity;
    private final Map<Integer, Node> map;
    private final Node head;
    private final Node tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>(capacity);
        this.head = new Node(0, 0); // Sentinel head
        this.tail = new Node(0, 0); // Sentinel tail
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        Node node = map.get(key);
        if (node == null) return -1;
        moveToHead(node);
        return node.value;
    }

    public void put(int key, int value) {
        Node node = map.get(key);
        if (node != null) {
            node.value = value;
            moveToHead(node);
        } else {
            if (map.size() >= capacity) {
                Node lru = removeTail();
                map.remove(lru.key);
            }
            Node newNode = new Node(key, value);
            map.put(key, newNode);
            addToHead(newNode);
        }
    }

    private void moveToHead(Node node) {
        removeNode(node);
        addToHead(node);
    }

    private void addToHead(Node node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private Node removeTail() {
        Node res = tail.prev;
        removeNode(res);
        return res;
    }
}`,
    pythonSolutionCode: `from collections import OrderedDict

class LRUCache:
    """
    Pythonic O(1) LRU Cache leveraging OrderedDict internal doubly linked list.
    """
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache: OrderedDict[int, int] = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        # Move accessed key to right (MRU position)
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            # Pop left (LRU item) in O(1) time
            self.cache.popitem(last=False)`
  },
  {
    id: 'dsa-consistent-hashing',
    title: 'Consistent Hashing Ring with Virtual Nodes',
    platform: 'LeetCode',
    difficulty: 'Hard',
    category: 'system-design',
    categoryLabel: 'System Design & Caching',
    systemApplication: 'Distributed partition routing in Apache Cassandra, Amazon DynamoDB, Akamai CDN, and Redis Clusters.',
    timeComplexity: 'O(log(N × V)) Lookup · O(V log(N × V)) Node Add/Remove',
    spaceComplexity: 'O(N × V)',
    problemSummary: 'Design a distributed load balancing ring where keys are routed to server nodes. When a node joins or leaves, only K/N keys are remapped instead of the entire dataset.',
    keyTakeaway: 'Maps server replicas onto a 32-bit hash ring via virtual nodes (vnodes). TreeMap with ceilingEntry() provides O(log M) binary search across the ring with circular wrap-around.',
    invariants: [
      'Virtual nodes distribute shard ownership uniformly around the 2^32 hash ring, eliminating hot-spots.',
      'Adding/removing a server only impacts keys belonging to immediate successor ranges.'
    ],
    testCaseDemo: {
      input: 'ring = new ConsistentHashRing(vnodes=3); addServer("redis-01"); addServer("redis-02"); routeKey("user_session_9102");',
      expectedOutput: 'Target Node: "redis-02" (Virtual Hash: 0x8FA41C02)',
      executionTimeMs: 0.24,
      memoryFootprint: '32.4 KB (Heap)',
      executionLog: [
        'INIT: Created ConsistentHashRing with MD5 32-bit hash projection.',
        'NODE ADD: "redis-01" registered 3 virtual node coordinates on ring.',
        'NODE ADD: "redis-02" registered 3 virtual node coordinates on ring.',
        'ROUTE: Key "user_session_9102" hashed to ring coordinate 0x7E31A900.',
        'SEARCH: TreeMap ceilingKey found nearest successor vnode: "redis-02#vnode-1".',
        'DISPATCH: Key mapped to physical node "redis-02" with zero cluster reshuffle.'
      ]
    },
    solutionCode: `import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Collection;
import java.util.SortedMap;
import java.util.TreeMap;

/**
 * Production Consistent Hash Ring with Virtual Nodes
 * Powers horizontal partitioning and partition fault recovery.
 */
public class ConsistentHashRing<T> {
    private final int numberOfReplicas;
    private final SortedMap<Long, T> circle = new TreeMap<>();

    public ConsistentHashRing(int numberOfReplicas, Collection<T> nodes) {
        this.numberOfReplicas = numberOfReplicas;
        for (T node : nodes) {
            addNode(node);
        }
    }

    public void addNode(T node) {
        for (int i = 0; i < numberOfReplicas; i++) {
            circle.put(hash(node.toString() + "#VN#" + i), node);
        }
    }

    public void removeNode(T node) {
        for (int i = 0; i < numberOfReplicas; i++) {
            circle.remove(hash(node.toString() + "#VN#" + i));
        }
    }

    public T getNode(Object key) {
        if (circle.isEmpty()) return null;
        long hash = hash(key.toString());
        if (!circle.containsKey(hash)) {
            SortedMap<Long, T> tailMap = circle.tailMap(hash);
            // Wrap around circular ring if hash exceeds all nodes
            hash = tailMap.isEmpty() ? circle.firstKey() : tailMap.firstKey();
        }
        return circle.get(hash);
    }

    private long hash(String key) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] digest = md.digest(key.getBytes());
            return ((long) (digest[3] & 0xFF) << 24) |
                   ((long) (digest[2] & 0xFF) << 16) |
                   ((long) (digest[1] & 0xFF) << 8)  |
                   ((long) (digest[0] & 0xFF));
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Hashing algorithm failed", e);
        }
    }
}`,
    pythonSolutionCode: `import bisect
import hashlib

class ConsistentHashRing:
    """
    Consistent Hash Ring in Python using bisect binary search.
    """
    def __init__(self, nodes=None, replicas=3):
        self.replicas = replicas
        self.ring = dict()
        self.sorted_keys = []
        if nodes:
            for node in nodes:
                self.add_node(node)

    def _hash(self, key: str) -> int:
        return int(hashlib.md5(key.encode('utf-8')).hexdigest(), 16) & 0xFFFFFFFF

    def add_node(self, node: str):
        for i in range(self.replicas):
            h = self._hash(f"{node}#VN#{i}")
            self.ring[h] = node
            bisect.insort(self.sorted_keys, h)

    def remove_node(self, node: str):
        for i in range(self.replicas):
            h = self._hash(f"{node}#VN#{i}")
            del self.ring[h]
            idx = bisect.bisect_left(self.sorted_keys, h)
            self.sorted_keys.pop(idx)

    def get_node(self, key: str) -> str:
        if not self.ring:
            return None
        h = self._hash(key)
        idx = bisect.bisect_right(self.sorted_keys, h)
        # Circular ring wrap-around
        if idx == len(self.sorted_keys):
            idx = 0
        return self.ring[self.sorted_keys[idx]]`
  },
  {
    id: 'dsa-topological-sort',
    title: 'Course Schedule II (Topological Sort / DAG)',
    platform: 'LeetCode',
    difficulty: 'Medium',
    category: 'graphs',
    categoryLabel: 'Graphs & DAG Scheduling',
    systemApplication: 'Used in Build Systems (Gradle/Maven), CI/CD pipelines, Kubernetes Pod Init containers, and Terraform plan dependency resolution.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    problemSummary: 'Given numCourses and a list of prerequisite pairs, return the ordering of courses you should take to finish all courses. If impossible due to a cycle, return an empty array.',
    keyTakeaway: "Kahn's Algorithm (BFS with In-Degree array) detects cycles naturally. If the count of processed nodes does not equal V, a circular dependency deadlock exists.",
    invariants: [
      'Nodes with in-degree 0 have all prerequisite dependencies satisfied and can safely execute.',
      'Every time a node executes, incoming edge counts of dependent nodes are decremented by 1.'
    ],
    testCaseDemo: {
      input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]',
      expectedOutput: '[0, 1, 2, 3] or [0, 2, 1, 3] (Valid DAG topological order)',
      executionTimeMs: 0.32,
      memoryFootprint: '38.1 KB (Heap)',
      executionLog: [
        'GRAPH: Constructed adjacency list for 4 vertices and 4 directed edges.',
        'IN-DEGREE: Initial in-degree vector: [0:0, 1:1, 2:1, 3:2].',
        'QUEUE: Enqueued in-degree 0 source node: [0].',
        'POP(0): Executed vertex 0. Decremented in-degree for dependents: 1->0, 2->0.',
        'ENQUEUE: Added vertices [1, 2] to execution queue.',
        'POP(1), POP(2): Decremented vertex 3 in-degree: 2->1->0.',
        'POP(3): All 4 vertices resolved without circular dependency deadlock.'
      ]
    },
    url: 'https://leetcode.com/problems/course-schedule-ii/',
    solutionCode: `import java.util.*;

/**
 * Dependency Graph Topological Order Generator
 * Resolves complex microservice startup ordering and DAG workflow execution.
 */
public class TopologicalDAGScheduler {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>(numCourses);
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        
        int[] inDegree = new int[numCourses];
        for (int[] pre : prerequisites) {
            int course = pre[0];
            int prerequisite = pre[1];
            adj.get(prerequisite).add(course);
            inDegree[course]++;
        }

        Queue<Integer> queue = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) {
                queue.offer(i);
            }
        }

        int[] order = new int[numCourses];
        int index = 0;

        while (!queue.isEmpty()) {
            int current = queue.poll();
            order[index++] = current;

            for (int neighbor : adj.get(current)) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }

        // Circular dependency detected if not all vertices could be resolved
        return index == numCourses ? order : new int[0];
    }
}`,
    pythonSolutionCode: `from collections import deque
from typing import List

class TopologicalDAGScheduler:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(numCourses)]
        in_degree = [0] * numCourses

        for course, pre in prerequisites:
            adj[pre].append(course)
            in_degree[course] += 1

        queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
        order = []

        while queue:
            node = queue.popleft()
            order.append(node)
            for neighbor in adj[node]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)

        return order if len(order) == numCourses else []`
  },
  {
    id: 'dsa-sliding-window-max',
    title: 'Sliding Window Maximum (Monotonic Queue)',
    platform: 'LeetCode',
    difficulty: 'Hard',
    category: 'sliding-window',
    categoryLabel: 'Sliding Window & Streams',
    systemApplication: 'High-frequency telemetry stream analysis, continuous 99th percentile latency tracking, and sliding-window rate limiters.',
    timeComplexity: 'O(N) Amortized',
    spaceComplexity: 'O(K)',
    problemSummary: 'You are given an array of integers nums and a sliding window of size k moving from left to right. Return the max sliding window value for each window position.',
    keyTakeaway: 'Maintain a monotonically decreasing deque of array indices. Each element is pushed and popped from the deque at most once, resulting in strict linear amortized O(N) runtime.',
    invariants: [
      'Deque elements are stored in strictly descending numerical value order.',
      'The head of the deque always represents the maximum element in the active window.'
    ],
    testCaseDemo: {
      input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3',
      expectedOutput: '[3, 3, 5, 5, 6, 7]',
      executionTimeMs: 0.15,
      memoryFootprint: '24.2 KB (Heap)',
      executionLog: [
        'STREAM: Ingesting metric samples with window size k=3.',
        'WINDOW [1,3,-1]: Evicted 1; Monotonic queue stores [3, -1]. Max = 3.',
        'WINDOW [3,-1,-3]: Monotonic queue stores [3, -1, -3]. Max = 3.',
        'WINDOW [-1,-3,5]: Evicted smaller elements; Monotonic queue stores [5]. Max = 5.',
        'WINDOW [-3,5,3]: Monotonic queue stores [5, 3]. Max = 5.',
        'WINDOW [5,3,6]: Evicted 5, 3; Monotonic queue stores [6]. Max = 6.',
        'WINDOW [3,6,7]: Evicted 6; Monotonic queue stores [7]. Max = 7.'
      ]
    },
    url: 'https://leetcode.com/problems/sliding-window-maximum/',
    solutionCode: `import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Real-Time Stream Window Aggregator
 * Evaluates peak throughput / metric bounds over continuous sliding windows.
 */
public class SlidingWindowMax {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || k <= 0) return new int[0];
        int n = nums.length;
        int[] result = new int[n - k + 1];
        int resIdx = 0;

        // Deque stores indices, values are strictly monotonically decreasing
        Deque<Integer> deque = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            // 1. Evict elements that fell outside the current window
            while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
                deque.pollFirst();
            }

            // 2. Maintain monotonic invariant: remove smaller elements from back
            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
                deque.pollLast();
            }

            deque.offerLast(i);

            // 3. Record window maximum once initial window of size k is formed
            if (i >= k - 1) {
                result[resIdx++] = nums[deque.peekFirst()];
            }
        }

        return result;
    }
}`,
    pythonSolutionCode: `from collections import deque
from typing import List

class SlidingWindowMax:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        q = deque()  # stores indices
        res = []

        for i, num in enumerate(nums):
            # 1. Evict out-of-window indices
            if q and q[0] < i - k + 1:
                q.popleft()

            # 2. Maintain monotonically decreasing order
            while q and nums[q[-1]] < num:
                q.pop()

            q.append(i)

            # 3. Append head as maximum for window
            if i >= k - 1:
                res.append(nums[q[0]])

        return res`
  },
  {
    id: 'dsa-bounded-blocking-queue',
    title: 'Thread-Safe Bounded Blocking Queue',
    platform: 'LeetCode',
    difficulty: 'Medium',
    category: 'concurrency',
    categoryLabel: 'Concurrency & Multi-Threading',
    systemApplication: 'Core implementation behind Java ThreadPoolExecutor, Kafka in-memory producer buffers, and reactive backpressure dispatchers.',
    timeComplexity: 'O(1) Enqueue · O(1) Dequeue',
    spaceComplexity: 'O(Capacity)',
    problemSummary: 'Implement a thread-safe bounded blocking queue supporting enqueue() and dequeue(). Enqueue blocks when full; dequeue blocks when empty.',
    keyTakeaway: 'Uses ReentrantLock with two distinct Conditions (notFull and notEmpty) to prevent missed wakeups and avoid thread starvation under high concurrency.',
    invariants: [
      'Producers block via notFull.await() when queue reaches capacity, preventing memory exhaustion.',
      'Consumers block via notEmpty.await() when empty, avoiding busy spin loops and CPU burning.'
    ],
    testCaseDemo: {
      input: 'capacity = 2; ProducerThread(puts=[10, 20, 30]); ConsumerThread(gets=3);',
      expectedOutput: 'Thread interleaves safely: [enqueue:10, enqueue:20, (blocked:30), dequeue->10, (unblocked:30), enqueue:30, dequeue->20, dequeue->30]',
      executionTimeMs: 0.45,
      memoryFootprint: '16.8 KB (Heap)',
      executionLog: [
        'LOCK: ReentrantLock initialized with Fair=false for maximum throughput.',
        'PRODUCER: Acquired lock. Enqueued element 10. Signaled notEmpty condition.',
        'PRODUCER: Enqueued element 20. Queue full (2/2).',
        'PRODUCER: Attempted enqueue 30 -> Blocked on notFull.await().',
        'CONSUMER: Acquired lock. Dequeued element 10. Signaled notFull condition.',
        'PRODUCER: Awakened from await(). Enqueued element 30 successfully.',
        'CONSUMER: Dequeued remaining elements [20, 30]. Clean exit with zero deadlocks.'
      ]
    },
    solutionCode: `import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

/**
 * High-Throughput Thread-Safe Bounded Queue
 * Demonstrates lock condition variables, zero deadlocks, and graceful backpressure.
 */
public class BoundedBlockingQueue {
    private final int[] buffer;
    private int head = 0;
    private int tail = 0;
    private int size = 0;
    private final int capacity;

    private final ReentrantLock lock = new ReentrantLock();
    private final Condition notFull = lock.newCondition();
    private final Condition notEmpty = lock.newCondition();

    public BoundedBlockingQueue(int capacity) {
        this.capacity = capacity;
        this.buffer = new int[capacity];
    }

    public void enqueue(int element) throws InterruptedException {
        lock.lock();
        try {
            while (size == capacity) {
                notFull.await(); // Block producer until slot opens
            }
            buffer[tail] = element;
            tail = (tail + 1) % capacity;
            size++;
            notEmpty.signal(); // Notify waiting consumers
        } finally {
            lock.unlock();
        }
    }

    public int dequeue() throws InterruptedException {
        lock.lock();
        try {
            while (size == 0) {
                notEmpty.await(); // Block consumer until item is pushed
            }
            int element = buffer[head];
            head = (head + 1) % capacity;
            size--;
            notFull.signal(); // Notify waiting producers
            return element;
        } finally {
            lock.unlock();
        }
    }

    public int size() {
        lock.lock();
        try {
            return size;
        } finally {
            lock.unlock();
        }
    }
}`,
    pythonSolutionCode: `import threading

class BoundedBlockingQueue:
    """
    Python Concurrency Bounded Queue using threading.Condition
    """
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.queue = []
        self.cv = threading.Condition()

    def enqueue(self, element: int) -> None:
        with self.cv:
            while len(self.queue) == self.capacity:
                self.cv.wait()
            self.queue.append(element)
            self.cv.notify()

    def dequeue(self) -> int:
        with self.cv:
            while not self.queue:
                self.cv.wait()
            item = self.queue.pop(0)
            self.cv.notify()
            return item

    def size(self) -> int:
        with self.cv:
            return len(self.queue)`
  },
  {
    id: 'dsa-coin-change',
    title: 'Coin Change (Unbounded Knapsack DP)',
    platform: 'LeetCode',
    difficulty: 'Medium',
    category: 'dp',
    categoryLabel: 'Dynamic Programming',
    systemApplication: 'Financial balance reconciliation, currency unit allocation, and cloud compute instance bin-packing.',
    timeComplexity: 'O(Amount × Coins)',
    spaceComplexity: 'O(Amount)',
    problemSummary: 'Given an array of coins of different denominations and an integer amount, compute the fewest number of coins needed to make up that amount.',
    keyTakeaway: 'Bottom-up tabular dynamic programming. State transition: dp[i] = min(dp[i], dp[i - coin] + 1). Initialized with Amount + 1 sentinel.',
    invariants: [
      'dp[i] represents the optimal global minimum coin count to construct amount i.',
      'Optimal substructure: dp[i] is composed of the sub-problem dp[i - coin] + 1.'
    ],
    testCaseDemo: {
      input: 'coins = [1, 2, 5], amount = 11',
      expectedOutput: '3 (5 + 5 + 1 = 11)',
      executionTimeMs: 0.12,
      memoryFootprint: '12.4 KB (Heap)',
      executionLog: [
        'DP: Initialized dp array of size 12 with sentinel amount+1 (12). Base case dp[0] = 0.',
        'PASS coin=1: Filled single coin transitions dp[1..11] = [1, 2, 3, 4, 5...].',
        'PASS coin=2: Optimized even amounts: dp[2]=1, dp[4]=2, dp[6]=3.',
        'PASS coin=5: Jump optimization: dp[5]=1, dp[10]=2, dp[11] = min(dp[11], dp[6] + 1) = 3.',
        'RESULT: Optimal coins required for amount 11 is 3.'
      ]
    },
    url: 'https://leetcode.com/problems/coin-change/',
    solutionCode: `import java.util.Arrays;

/**
 * Optimal Resource Packing via Dynamic Programming
 */
public class CoinChangeOptimizer {
    public int coinChange(int[] coins, int amount) {
        if (amount < 1) return 0;
        
        int[] dp = new int[amount + 1];
        // Fill with unreachable ceiling bound
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;

        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
    pythonSolutionCode: `from typing import List

class CoinChangeOptimizer:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0

        for coin in coins:
            for i in range(coin, amount + 1):
                dp[i] = min(dp[i], dp[i - coin] + 1)

        return dp[amount] if dp[amount] != float('inf') else -1`
  },
  {
    id: 'dsa-trie-prefix',
    title: 'Prefix Tree / Trie (Search Autocomplete)',
    platform: 'LeetCode',
    difficulty: 'Medium',
    category: 'trees',
    categoryLabel: 'Trees & Prefix Trees',
    systemApplication: 'URL routing tables, IP address longest prefix matching (CIDR), and IDE code symbol search.',
    timeComplexity: 'O(L) Insert · O(L) Search',
    spaceComplexity: 'O(Total Characters)',
    problemSummary: 'Implement a Trie with insert, search, and startsWith methods in strict O(L) time where L is the key length.',
    keyTakeaway: 'Array-based TrieNode child pointers (26 lowercase chars) provide instantaneous direct index lookups without hashing overhead.',
    invariants: [
      'Every path from root to a node marked isEndOfWord=true constitutes a valid registered keyword.',
      'Prefix search terminates in O(L) steps regardless of total dictionary size (even 1,000,000 words).'
    ],
    testCaseDemo: {
      input: 'insert("apple"); search("apple"); search("app"); startsWith("app"); insert("app"); search("app");',
      expectedOutput: '[search("apple")->true, search("app")->false, startsWith("app")->true, search("app")->true]',
      executionTimeMs: 0.09,
      memoryFootprint: '20.1 KB (Heap)',
      executionLog: [
        'INIT: Initialized Root TrieNode with 26 null child pointers.',
        'INSERT("apple"): Created character branch: a -> p -> p -> l -> e (isEnd=true).',
        'SEARCH("apple") -> true: Traversed exact branch, matched isEnd=true.',
        'SEARCH("app") -> false: Node exists, but isEnd was false (prefix only).',
        'STARTSWITH("app") -> true: Branch exists for prefix "app".',
        'INSERT("app"): Set node "p" isEndOfWord = true.',
        'SEARCH("app") -> true: Verified keyword now recognized.'
      ]
    },
    url: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
    solutionCode: `/**
 * Prefix Trie for High-Performance Routing and Symbol Indexing
 */
public class Trie {
    private static class TrieNode {
        private final TrieNode[] children = new TrieNode[26];
        private boolean isEndOfWord = false;
    }

    private final TrieNode root;

    public Trie() {
        this.root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode current = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (current.children[idx] == null) {
                current.children[idx] = new TrieNode();
            }
            current = current.children[idx];
        }
        current.isEndOfWord = true;
    }

    public boolean search(String word) {
        TrieNode node = findPrefixNode(word);
        return node != null && node.isEndOfWord;
    }

    public boolean startsWith(String prefix) {
        return findPrefixNode(prefix) != null;
    }

    private TrieNode findPrefixNode(String str) {
        TrieNode current = root;
        for (char c : str.toCharArray()) {
            int idx = c - 'a';
            if (current.children[idx] == null) return null;
            current = current.children[idx];
        }
        return current;
    }
}`,
    pythonSolutionCode: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for char in word:
            if char not in curr.children:
                curr.children[char] = TrieNode()
            curr = curr.children[char]
        curr.is_end_of_word = True

    def search(self, word: str) -> bool:
        curr = self._find_prefix(word)
        return curr is not None and curr.is_end_of_word

    def startsWith(self, prefix: str) -> bool:
        return self._find_prefix(prefix) is not None

    def _find_prefix(self, prefix: str):
        curr = self.root
        for char in prefix:
            if char not in curr.children:
                return None
            curr = curr.children[char]
        return curr`
  }
];

export const HACKATHON_CHRONOLOGY: HackathonItem[] = [
  {
    id: 'hack-nitr-5',
    title: 'HackNITR 5.0 — National Hackathon',
    event: 'National Collegiate Hackathon · 1,500+ Registrations',
    award: '1st Place Grand Champion & Best Distributed Systems Architecture',
    rank: 'champion',
    year: '2024',
    duration: '36-Hour Sprint',
    role: 'Lead Systems Architect & Backend Dev',
    teamSize: 'Team of 4 Engineers',
    projectTitle: 'AuraMesh — Decentralized Disaster Communications Mesh',
    summary: 'Architected and built an offline-first decentralized mesh network delivering bidirectional emergency telemetry and victim locator beacons when cellular infrastructure is destroyed.',
    problemStatement: 'In extreme flooding and cyclonic disasters, cellular towers collapse within 4 hours, stranding victims without emergency dispatch coordination.',
    solutionArchitecture: 'Engineered lightweight Java Spring Boot edge microservices that discover neighboring devices via Wi-Fi Direct and Bluetooth Low Energy (BLE). Leveraged Conflict-Free Replicated Data Types (CRDTs) to sync SOS queues over intermittent peer-to-peer hops without central server dependency.',
    keyInnovation: 'Implemented Last-Write-Wins Element Set (LWW-Element-Set) CRDTs over local UDP sockets, achieving 100% data consistency across 12 mobile nodes with zero merge conflicts.',
    stack: ['Java 17', 'Spring Boot', 'WebSockets', 'CRDTs', 'Docker', 'SQLite'],
    githubUrl: 'https://github.com/shubhamh4X',
    metrics: [
      { label: 'Sub-Hop Latency', value: '< 18 ms' },
      { label: 'Sync Consistency', value: '100% Conflict-Free' },
      { label: 'Sprint Delivery', value: '36 Hours' }
    ]
  },
  {
    id: 'hack-smart-bengal',
    title: 'Smart Bengal Hackathon — State Level',
    event: 'State Innovation Hackathon · Government of West Bengal',
    award: '1st Place Champion & Governor\'s Technology Trophy',
    rank: 'champion',
    year: '2024',
    duration: '24-Hour Sprint',
    role: 'Backend & AI Systems Lead',
    teamSize: 'Team of 4 Engineers',
    projectTitle: 'KisanSetu — Automated Agricultural Supply Chain & Dynamic Price Discovery',
    summary: 'Built an algorithmic agricultural logistics platform that bypasses predatory cartels through transparent real-time mandi pricing and automated truckload pooling.',
    problemStatement: 'Smallholder farmers lose up to 40% of their profits to unregulated middlemen and incur exorbitant transport rates when shipping partial tractor loads.',
    solutionArchitecture: 'Created a Spring Boot microservice pipeline processing real-time government mandi API price indexes, coupled with a graph-based vehicle routing clustering engine. Built a voice interface using Whisper AI so rural farmers could check fair pricing in their native Bengali dialect.',
    keyInnovation: 'Graph-based greedy clustering algorithm for spatial transport pooling, cutting per-farmer shipping expenses by 42% while guaranteeing vehicle utilization.',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'FastAPI', 'Whisper AI', 'Redis'],
    githubUrl: 'https://github.com/shubhamh4X',
    metrics: [
      { label: 'Transport Cost Drop', value: '42%' },
      { label: 'Voice Response', value: '< 1.4s' },
      { label: 'Farmers Served in Sim', value: '2,500+' }
    ]
  },
  {
    id: 'hack-a-league',
    title: 'Hack-A-League AI Championship',
    event: 'Pan-India AI/ML Hackathon · 300+ Teams',
    award: '1st Place Winner — Best Autonomous Systems Architecture',
    rank: 'champion',
    year: '2025',
    duration: '36-Hour Sprint',
    role: 'AI & Systems Engineer',
    teamSize: 'Team of 3 Engineers',
    projectTitle: 'Synthetix — Self-Healing Autonomous Web Ingestion Engine',
    summary: 'Engineered an autonomous web crawler and RAG pipeline that detects DOM layout breakages and uses an LLM supervisor to rewrite broken selectors in real-time.',
    problemStatement: 'Enterprise web scrapers fail constantly when target web apps push UI updates, resulting in silent data ingestion pipeline failures.',
    solutionArchitecture: 'Paired Playwright with a FastAPI backend and pgvector database. An anomaly supervisor evaluates extracted schemas against pydantic models; on failure, it dispatches an LLM agent to inspect the new DOM AST, test candidate CSS/XPath selectors, and hot-patch the scraper without downtime.',
    keyInnovation: 'Sub-1.2s automated selector repair loop with schema contract validation, restoring broken feeds with zero operator intervention.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Playwright', 'Docker'],
    githubUrl: 'https://github.com/shubhamh4X',
    metrics: [
      { label: 'Healing Latency', value: '< 1.2s' },
      { label: 'Ingestion Uptime', value: '99.9%' },
      { label: 'Accuracy Score', value: '98.4%' }
    ]
  },
  {
    id: 'hack-innoventure',
    title: 'INNOVENTURE College Innovation Hackathon',
    event: 'National Technical Festival & Hackathon',
    award: 'Finalist & Best High-Concurrency Architecture Award',
    rank: 'finalist',
    year: '2023',
    duration: '36-Hour Sprint',
    role: 'Lead Backend Engineer',
    teamSize: 'Team of 4 Engineers',
    projectTitle: 'CampusPulse — High-Throughput Anti-Scalp Ticketing Engine',
    summary: 'Built a high-concurrency ticket reservation engine supporting 10,000+ concurrent requests during peak campus concert drops with zero overselling.',
    problemStatement: 'Campus event drops crashed servers within seconds and scalpers used automation scripts to hoard passes.',
    solutionArchitecture: 'Designed a Java Spring Boot backend backed by Redis distributed locks (Redlock algorithm) and atomic token queues. Integrated cryptographically signed dynamic QR codes refreshing every 30 seconds to eliminate ticket scalping.',
    keyInnovation: 'Atomic Redis lock pipeline guaranteeing zero double-bookings under 12,000 requests/second load test simulated with k6.',
    stack: ['Java', 'Spring Boot', 'Redis', 'MySQL', 'JWT', 'k6'],
    githubUrl: 'https://github.com/shubhamh4X',
    metrics: [
      { label: 'Throughput Peak', value: '12k req/s' },
      { label: 'Double Booking Rate', value: '0.00%' },
      { label: 'P99 Latency', value: '8.4 ms' }
    ]
  },
  {
    id: 'hack-google-solution',
    title: 'Google Solution Challenge — Regional Chapter',
    event: 'Global Collegiate Engineering Challenge',
    award: 'Regional Finalist & UN SDG Sustainability Commendation',
    rank: 'runner-up',
    year: '2024',
    duration: '48-Hour Sprint',
    role: 'Full-Stack Systems Engineer',
    teamSize: 'Team of 3 Engineers',
    projectTitle: 'EcoRoute — Carbon-Optimized Multi-Modal Transit Engine',
    summary: 'Created an intelligent commuter transit engine factoring vehicle emission coefficients, real-time bus telemetry, and cycling corridors.',
    problemStatement: 'Urban navigation systems exclusively optimize for shortest time rather than environmental carbon footprint.',
    solutionArchitecture: 'Implemented a multi-objective Dijkstra graph solver in Python that weights distance, elevation delta, transit frequency, and carbon expenditure.',
    keyInnovation: 'Pareto-optimal path routing presenting users with the best balance of travel time versus carbon emissions saved.',
    stack: ['Python', 'FastAPI', 'OpenStreetMap', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/shubhamh4X',
    metrics: [
      { label: 'Average CO2 Saved', value: '34%' },
      { label: 'Routing Latency', value: '< 45 ms' },
      { label: 'Regional Finalist', value: 'Top 10' }
    ]
  }
];
