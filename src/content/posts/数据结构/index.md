---
title: 数据结构讲义
published: 2026-01-21
description: "这是一份面向数据结构新手（非编程新手）的讲义，系统覆盖本科数据结构核心内容，不啰嗦，不引入算法课内容，作为教科书的补充与结构地图。"
image: ""
tags: [data, algo]
category: "misc"
draft: false
---

# 第一部分：线性结构

> 数据元素之间是"一对一"的关系，就像排队。

为什么需要线性结构？

假设要存储一个班级 100 个学生的成绩：

- ❌ 方案 1：定义 100 个变量 `score1, score2, ..., score100` → 不现实
- ✅ 方案 2：使用数组 `int scores[100]` → 一次性申请连续空间

**线性结构解决的核心问题：批量存储、顺序访问**

---

## 1.1 顺序表/向量/一维张量/数组

### 存储原理

```
内存地址：  100   104   108   112   116
数组元素：  [10]  [20]  [30]  [40]  [50]
下标：       0     1     2     3     4
```

- 连续的内存空间
- 通过下标直接计算地址：`地址 = 起始地址 + 下标 × 元素大小`

### 基本操作

**访问元素：**

```cpp
int x = arr[i];  // O(1)
```

直接计算地址，一步到位。
**插入元素：**

```cpp
// 在位置i插入元素x，需要把i及之后元素后移
for (int j = n-1; j >= i; j--) {
    arr[j+1] = arr[j];
}
arr[i] = x;
n++;
// 时间：O(n)
```

**删除元素：**

```cpp
// 删除位置i的元素，需要把i之后元素前移
for (int j = i; j < n-1; j++) {
    arr[j] = arr[j+1];
}
n--;
// 时间：O(n)
```

### 时间复杂度

| 操作 | 时间复杂度 |
| ---- | ---------- |
| 访问 | O(1)       |
| 查找 | O(n)       |
| 插入 | O(n)       |
| 删除 | O(n)       |

### 优缺点

- ✅ 支持随机访问
- ✅ 内存连续，缓存友好
- ❌ 大小固定
- ❌ 插入删除效率低

---

## 1.2 动态数组

### 核心思想

当数组满了，创建一个更大的数组（通常 2 倍），把数据复制过去。

```
初始容量4：
[10][20][__][__]  size=2, capacity=4

插入30, 40后满了：
[10][20][30][40]  size=4, capacity=4

插入50，扩容：
[10][20][30][40][50][__][__][__]  size=5, capacity=8
```

### 手动实现

为了理解扩容原理，下面给出完整的类实现。**实际使用时直接用 `vector<int> v;` 即可。**

```cpp
class DynamicArray {
private:
    int* data;
    int size;
    int capacity;

    void resize(int newCapacity) {
        int* newData = new int[newCapacity];
        for (int i = 0; i < size; i++) {
            newData[i] = data[i];
        }
        delete[] data;
        data = newData;
        capacity = newCapacity;
    }

public:
    DynamicArray(int initialCapacity = 10) {
        data = new int[initialCapacity];
        size = 0;
        capacity = initialCapacity;
    }

    ~DynamicArray() {
        delete[] data;
    }

    void push_back(int value) {
        if (size == capacity) {
            resize(capacity * 2);  // 容量翻倍
        }
        data[size++] = value;
    }

    void pop_back() {
        if (size > 0) size--;
    }

    int& operator[](int index) {
        return data[index];
    }

    int getSize() const { return size; }
};
```

### 扩容策略分析

**为什么容量翻倍？**

假设初始容量 1，插入 n 个元素：

- 扩容序列：1 → 2 → 4 → 8 → ... → n
- 扩容次数：log₂(n) 次
- 复制元素总数：1 + 2 + 4 + ... + n/2 = n-1

**均摊分析：**

```
总代价 = n次普通插入 + (n-1)次复制 = 2n-1
平均每次插入代价 = (2n-1)/n ≈ 2 = O(1)
```

虽然单次扩容是 O(n)，但**均摊下来每次插入仍是 O(1)**。

### 缩容策略

当使用率很低时缩容：

```cpp
if (size > 0 && size == capacity / 4) {
    resize(capacity / 2);
}
```

**为什么是 1/4 而不是 1/2？**
避免"抖动"：

```
容量4，size在2附近波动：
- 删到size=1，缩容到2
- 加到size=2，扩容到4
- 删到size=1，缩容到2  ← 反复扩缩！

用1/4阈值：
size在1~2之间变化时，容量保持4不变
```

### STL 实现：vector

```cpp
vector<int> v;

// 基本操作
v.push_back(10);           // 尾部添加
v.pop_back();              // 尾部删除
v[0] = 5;                  // 访问
v.at(1);                   // 带边界检查的访问

// 大小相关
v.size();                  // 元素个数
v.capacity();              // 容量
v.empty();                 // 是否为空
v.clear();                 // 清空

// 迭代器操作
v.insert(v.begin()+2, 20); // 在位置2插入
v.erase(v.begin()+1);      // 删除位置1
v.front();                 // 第一个元素
v.back();                  // 最后一个元素

// 遍历
for (int i = 0; i < v.size(); i++) {
    cout << v[i] << " ";
}

for (int x : v) {
    cout << x << " ";
}
```

---

## 1.3 链表

### 存储原理

数据分散存储，通过指针连接。

```cpp
class ListNode {
public:
    int val;
    ListNode* next;

    ListNode(int x) : val(x), next(nullptr) {}
};
```

**内存示意：**

```
head → [10|next] → [20|next] → [30|nullptr]
```

节点在内存中是分散的，不连续。

### 基本操作

**遍历：**

```cpp
ListNode* p = head;
while (p != nullptr) {
    cout << p->val << " ";
    p = p->next;
}
// 时间：O(n)
```

**插入（在 p 后）：**

```cpp
ListNode* newNode = new ListNode(x);
newNode->next = p->next;
p->next = newNode;
// 时间：O(1)，前提是已知位置p
```

示意：

```
插入前：[10] → [30] → [40]
              ↑ p
插入后：[10] → [20] → [30] → [40]
              ↑新节点
```

**删除（删除 p 的下一个）：**

```cpp
if (p->next != nullptr) {
    ListNode* temp = p->next;
    p->next = temp->next;
    delete temp;
}
// 时间：O(1)
```

### 双向链表

```cpp
class ListNode {
public:
    int val;
    ListNode* prev;
    ListNode* next;

    ListNode(int x) : val(x), prev(nullptr), next(nullptr) {}
};
```

**示意：**

```
nullptr ← [10] ⇄ [20] ⇄ [30] → nullptr
```

**优势：** 可以双向遍历，删除节点不需要前驱。

### 循环链表

尾节点指向头节点，形成环。

```
head → [10] → [20] → [30] → [40] ┐
       ↑                          │
       └──────────────────────────┘
```

用途：循环调度、约瑟夫问题

### STL：list

```cpp
list<int> lst;

// 头尾操作
lst.push_front(10);        // 头部插入
lst.push_back(20);         // 尾部插入
lst.pop_front();           // 头部删除
lst.pop_back();            // 尾部删除

// 访问
lst.front();               // 第一个元素
lst.back();                // 最后一个元素

// 大小
lst.size();
lst.empty();
lst.clear();

// 迭代器操作
auto it = lst.begin();
advance(it, 2);            // 移动迭代器到位置2
lst.insert(it, 15);        // 在it位置插入
lst.erase(it);             // 删除it位置

// 遍历
for (int x : lst) {
    cout << x << " ";
}
```

### 时间复杂度

| 操作     | 数组     | 链表      |
| -------- | -------- | --------- |
| 随机访问 | O(1)     | O(n)      |
| 头部插入 | O(n)     | O(1)      |
| 尾部插入 | O(1)均摊 | O(1)      |
| 中间插入 | O(n)     | O(1)\*    |
| 空间     | 连续     | 分散+指针 |

\*已知位置

---

## 1.4 受限的访问模式（栈、队列）

### 栈（Stack）

**后进先出（LIFO：Last In First Out）**

就像一摞盘子：

- 只能从顶部放入（push）
- 只能从顶部取出（pop）

```
    ← push/pop
    ┌────┐
    │ 30 │ ← top（栈顶）
    ├────┤
    │ 20 │
    ├────┤
    │ 10 │
    └────┘
```

#### 手动实现

```cpp
class Stack {
private:
    vector<int> data;

public:
    void push(int x) {
        data.push_back(x);
    }

    void pop() {
        if (!data.empty()) {
            data.pop_back();
        }
    }

	int top() {
	    if (!data.empty()) {  // 边界检查
	        return data.back();
	    }
	    throw runtime_error("Stack is empty");
	}

    bool isEmpty() {
        return data.empty();
    }

    int size() {
        return data.size();
    }
};

```

#### 时间复杂度

| 操作      | 时间复杂度 |
| --------- | ---------- |
| push(x)   | O(1)\*     |
| pop()     | O(1)       |
| top()     | O(1)       |
| isEmpty() | O(1)       |
| size()    | O(1)       |

**说明：**

- **push(x)**: 平均 O(1)，最坏情况 O(n)。vector 的 `push_back()` 在容量足够时是 O(1)，但当需要扩容时需要重新分配内存并复制所有元素,此时为 O(n)。不过由于扩容采用倍增策略,**摊销时间复杂度**为 O(1)。

- **pop()**: O(1)。vector 的 `pop_back()` 只需移除末尾元素,不涉及元素移动。

- **top()**: O(1)。直接访问 vector 末尾元素。

- **isEmpty()**: O(1)。只需检查 vector 的 empty() 状态。

- **size()**: O(1)。vector 内部维护了大小信息。

#### STL：stack

```cpp
stack<int> s;

s.push(10);      // 入栈
s.pop();         // 出栈
s.top();         // 栈顶元素
s.empty();       // 是否为空
s.size();        // 大小
```

### 队列（Queue）

**先进先出（FIFO：First In First Out）**

就像排队：

- 从尾部进入（enqueue）
- 从头部离开（dequeue）

```
dequeue ←─────────────← enqueue
         ┌───┬───┬───┐
         │10 │20 │30 │
         └───┴───┴───┘
        front      rear
```

#### 循环队列（数组实现）

**为什么需要循环？**

- 相比普通队列，避免了"假溢出"问题
- 所有操作都是真正的 O(1) 时间复杂度
- 空间利用率高，固定使用 O(k) 空间

```
普通队列问题：
[_][_][20][30][40]  ← rear
        ↑ front
前面空着但无法使用

循环队列：
    rear ↓
[40][_][_][_][20]
              ↑ front
看成环形，rear绕回前面
```

```cpp
class CircularQueue {
private:
    vector<int> data;
    int front, rear, size, capacity;

public:
    CircularQueue(int k) : capacity(k), front(0), rear(0), size(0) {
        data.resize(k);
    }

    bool enqueue(int value) {
        if (size == capacity) return false;
        data[rear] = value;
        rear = (rear + 1) % capacity;
        size++;
        return true;
    }

    bool dequeue() {
        if (size == 0) return false;
        front = (front + 1) % capacity;
        size--;
        return true;
    }

    int getFront() {
        return size == 0 ? -1 : data[front];
    }

    bool isEmpty() {
        return size == 0;
    }

    bool isFull() {
        return size == capacity;
    }
};
```

#### 时间复杂度

| 操作             | 时间复杂度 |
| ---------------- | ---------- |
| CircularQueue(k) | O(k)       |
| enqueue(value)   | O(1)       |
| dequeue()        | O(1)       |
| getFront()       | O(1)       |
| isEmpty()        | O(1)       |
| isFull()         | O(1)       |

**说明：**

- **CircularQueue(k)**: O(k)。构造函数中 `data.resize(k)` 需要分配 k 个元素的空间。

- **enqueue(value)**: O(1)。直接通过索引访问并赋值，取模运算也是常数时间。

- **dequeue()**: O(1)。只需移动 front 指针，不涉及元素移动。

- **getFront()**: O(1)。直接通过索引访问队首元素。

- **isEmpty()**: O(1)。只需检查 size 是否为 0。

- **isFull()**: O(1)。只需比较 size 和 capacity。

#### STL：queue

两端都可以插入和删除。

```
← push/pop          push/pop →
   ┌───┬───┬───┬───┐
   │10 │20 │30 │40 │
   └───┴───┴───┴───┘
  front          rear
```

```cpp
queue<int> q;

q.push(10);      // 入队
q.pop();         // 出队
q.front();       // 队首
q.back();        // 队尾
q.empty();       // 是否为空
q.size();        // 大小
```

#### STL：deque（双端队列）

```cpp
deque<int> dq;

dq.push_front(10);     // 头部插入
dq.push_back(20);      // 尾部插入
dq.pop_front();        // 头部删除
dq.pop_back();         // 尾部删除
dq[i];                 // 随机访问！
dq.front();
dq.back();
```

---

# 第二部分：树形结构

> 数据元素之间是"一对多"的层次关系。

为什么线性结构不够用？

**问题场景：** 在 100,000 条有序数据中查找某个值

- 数组顺序查找：O(n) = 100,000 次比较
- 数组二分查找：O(log n) ≈ 17 次比较 ✓

二分查找很快，但有个前提：**数据必须有序**

**新问题：** 如果频繁插入删除呢？

- 数组插入/删除：O(n) - 需要移动大量元素
- 链表插入/删除：O(1) - 但又不能二分查找了

**矛盾：**

- 想要快速查找 → 需要有序 + 随机访问
- 想要快速插入删除 → 需要链式结构

**解决方案：树形结构**

- 通过"层次关系"，既能快速查找 O(log n)
- 又能快速插入删除 O(log n)

---

## 2.0 树的基本概念

```
        A          ← 根节点
       /│\
      B C D        ← A的子节点
     /│   │\
    E F   G H      ← 叶子节点(没有子节点)
```

#### 术语

- **节点(Node)**: 树中的基本单元，包含数据和指向子节点的指针
- **根节点(Root)**: 树的顶端节点，没有父节点(如 A)
- **父节点(Parent)**: 有子节点的节点(如 A 是 B、C、D 的父节点)
- **子节点(Child)**: 节点的直接后代(如 B、C、D 是 A 的子节点)
- **叶子节点(Leaf)**: 没有子节点的节点(如 E、F、G、H)
- **兄弟节点(Sibling)**: 拥有相同父节点的节点(如 B、C、D 互为兄弟)
- **祖先节点(Ancestor)**: 从根到该节点路径上的所有节点(如 E 的祖先: A、B)
- **后代节点(Descendant)**: 节点的子树中的所有节点(如 A 的后代: B、C、D、E、F、G、H)

#### 度量指标

- **节点的度(Degree)**: 节点的子节点个数(如 A 的度为 3，B 的度为 2)
- **树的度**: 树中所有节点度的最大值(该树的度为 3)
- **深度(Depth)**: 从根节点到该节点的边数(如 E 的深度为 2)
- **高度(Height)**: 从该节点到叶子节点的最长路径的边数(如 A 的高度为 2)
- **层(Level)**: 节点的深度 + 1(根节点为第 1 层)

#### 树的性质

- 有 n 个节点的树有 n-1 条边
- 任意两个节点之间有且仅有一条路径
- 树是无环连通图

---

## 2.1 树的存储方式

### 链式存储(常用)

**二叉树节点定义:**

```cpp
class TreeNode {
public:
    int val;
    TreeNode* left;   // 左子节点
    TreeNode* right;  // 右子节点
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
```

**多叉树节点定义:**

```cpp
class TreeNode {
public:
    int val;
    vector<TreeNode*> children;  // 子节点列表
    TreeNode(int x) : val(x) {}
};

// 或者使用"左孩子右兄弟"表示法
class TreeNode {
public:
    int val;
    TreeNode* firstChild;   // 第一个子节点
    TreeNode* nextSibling;  // 下一个兄弟节点
    TreeNode(int x) : val(x), firstChild(nullptr), nextSibling(nullptr) {}
};
```

**特点:**

- 空间复杂度: O(n)
- 插入/删除灵活
- 适合动态变化的树

### 数组存储(适合完全二叉树)

```cpp
vector<int> tree;  // 从索引1开始存储

// 对于索引 i 的节点:
// 左子节点: 2*i
// 右子节点: 2*i + 1
// 父节点: i/2
```

**示例:**

```
        1
       / \
      2   3
     / \  /
    4  5 6

数组: [0, 1, 2, 3, 4, 5, 6]
索引:  0  1  2  3  4  5  6
```

**特点:**

- 空间复杂度:
  - 完全二叉树: O(n)
  - 稀疏树: O(2^h)，浪费空间
- 查找父子节点: O(1)
- 适合堆、完全二叉树

### 父节点数组

```cpp
vector<int> parent(n);  // parent[i] 存储节点 i 的父节点

// 示例:
//     0
//    /|\
//   1 2 3
//  /|
// 4 5

parent = [-1, 0, 0, 0, 1, 1];
//         0  1  2  3  4  5
```

**特点:**

- 空间复杂度: O(n)
- 向上查找快，向下查找慢
- 适合并查集、需要频繁查找祖先的场景

### 邻接表(通用树)

```cpp
vector<vector<int>> adj(n);  // adj[i] 存储节点 i 的所有子节点

// 示例(同上):
adj[0] = {1, 2, 3};
adj[1] = {4, 5};
adj[2] = {};
adj[3] = {};
adj[4] = {};
adj[5] = {};
```

**特点:**

- 空间复杂度: O(n)
- 灵活，适合任意结构的树
- 适合图转树、多叉树

### 三元组表示(较少用)

```cpp
class Edge {
public:
    int parent;
    int child;
    int weight;  // 可选
};
vector<Edge> edges;
```

### 存储方式对比

| 存储方式   | 空间复杂度  | 适用场景         | 优点           | 缺点           |
| ---------- | ----------- | ---------------- | -------------- | -------------- |
| 链式存储   | O(n)        | 通用             | 灵活、直观     | 指针开销       |
| 数组存储   | O(n)~O(2^h) | 完全二叉树、堆   | 访问快、无指针 | 稀疏树浪费空间 |
| 父节点数组 | O(n)        | 并查集、祖先查询 | 简单、省空间   | 查找子节点慢   |
| 邻接表     | O(n)        | 多叉树、图转树   | 灵活、省空间   | 需要额外结构   |

**选择建议:**

- **二叉树**: 优先链式存储
- **堆/完全二叉树**: 数组存储
- **多叉树**: 链式存储(children 数组)或邻接表
- **需要快速查找祖先**: 父节点数组
- **树的动态变化**: 链式存储

---

## 2.2 二叉树

每个节点最多有 2 个子节点（左子、右子）。

```cpp
class TreeNode {
public:
    int val;
    TreeNode* left;
    TreeNode* right;

    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
```

### 二叉树的类型

#### 满二叉树

每一层都是满的。

```
        1
       / \
      2   3
     /│\ /│\
    4 5 6 7 8
```

节点数：2^h - 1（h 是高度）

#### 完全二叉树

除了最后一层，其他层都是满的，最后一层从左到右连续。

```
        1
       / \
      2   3
     /│\ /
    4 5 6
```

**完全二叉树可以用数组存储：**

```
数组：[1, 2, 3, 4, 5, 6]

节点i的左子：2i + 1
节点i的右子：2i + 2
节点i的父节点：(i-1) / 2
```

### 树的遍历

```
        A
       / \
      B   C
     / \   \
    D   E   F
```

#### 深度优先遍历 (DFS)

| 遍历方式             | 访问顺序     | 示例结果    |
| -------------------- | ------------ | ----------- |
| **前序(Pre-order)**  | 根 → 左 → 右 | A B D E C F |
| **中序(In-order)**   | 左 → 根 → 右 | D B E A C F |
| **后序(Post-order)** | 左 → 右 → 根 | D E B F C A |

**前序遍历(Pre-order Traversal)：根 → 左 → 右**

```cpp
void preOrder(TreeNode* root) {
    if (root == nullptr) return;
    cout << root->val << " ";
    preOrder(root->left);
    preOrder(root->right);
}
```

**中序遍历：左 → 根 → 右**

```cpp
void inOrder(TreeNode* root) {
    if (root == nullptr) return;
    inOrder(root->left);
    cout << root->val << " ";
    inOrder(root->right);
}
```

**后序遍历：左 → 右 → 根**

```cpp
void postOrder(TreeNode* root) {
    if (root == nullptr) return;
    postOrder(root->left);
    postOrder(root->right);
    cout << root->val << " ";
}
```

#### 广度优先遍历 (BFS)

| 遍历方式              | 访问顺序     | 示例结果    |
| --------------------- | ------------ | ----------- |
| **层序(Level-order)** | 逐层从左到右 | A B C D E F |

```
        A          ← 第1层
       / \
      B   C        ← 第2层
     / \   \
    D   E   F      ← 第3层
```

**层序：用队列**

```cpp
void levelOrder(TreeNode* root) {
    if (root == nullptr) return;
    queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        TreeNode* node = q.front();
        q.pop();
        cout << node->val << " ";

        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
}
```

---

## 2.3 二叉搜索树 (Binary Search Tree, BST)

二叉搜索树是一种特殊的二叉树，满足以下性质：

1. **左子树**的所有节点值 < 根节点值
2. **右子树**的所有节点值 > 根节点值
3. 左右子树也都是二叉搜索树

```
        8
       / \
      3   10
     / \    \
    1   6    14
       / \   /
      4   7 13
```

#### 关键性质

BST 的**中序遍历**结果是**有序递增序列**！

示例:

```
        8
       / \
      3   10
     / \    \
    1   6   14

中序遍历: 1, 3, 6, 8, 10, 14  ← 有序!
```

### 查找

**思路**: 利用 BST 性质，比较目标值与当前节点

- 目标值 < 当前值 → 去左子树
- 目标值 > 当前值 → 去右子树
- 相等 → 找到

```cpp
TreeNode* search(TreeNode* root, int target) {
    if (root == nullptr || root->val == target) {
        return root;
    }

    if (target < root->val) {
        return search(root->left, target);   // 去左子树
    } else {
        return search(root->right, target);  // 去右子树
    }
}

// 迭代版本
TreeNode* searchIterative(TreeNode* root, int target) {
    while (root != nullptr && root->val != target) {
        root = (target < root->val) ? root->left : root->right;
    }
    return root;
}
```

### 插入

```cpp
TreeNode* insert(TreeNode* root, int val) {
    if (root == nullptr) {
        return new TreeNode(val);  // 找到插入位置
    }

    if (val < root->val) {
        root->left = insert(root->left, val);   // 插入左子树
    } else if (val > root->val) {
        root->right = insert(root->right, val); // 插入右子树
    }
    // val == root->val 时不插入(避免重复)

    return root;
}
```

**示例**:

```
插入 5:
        8              8
       / \            / \
      3   10   →     3   10
     / \            / \
    1   6          1   6
                      /
                     5
```

### 删除

**最复杂的操作**，需要考虑三种情况：

**情况 1**: 删除叶子节点 → 直接删除

```
删除 1:
        8              8
       / \            / \
      3   10   →     3   10
     / \              \
    1   6              6
```

**情况 2**: 删除只有一个子节点的节点 → 用子节点替代

```
删除 10:
        8              8
       / \            / \
      3   10   →     3   14
         /  \             /
       12   14          12
```

**情况 3**: 删除有两个子节点的节点 → 找**后继节点**(右子树最小值)或**前驱节点**(左子树最大值)替代

```
删除 3:
        8              8
       / \            / \
      3   10   →     4   10      (用后继节点4替代3)
     / \            / \
    1   6          1   6
       / \              \
      4   7              7
```

```cpp
TreeNode* deleteNode(TreeNode* root, int key) {
    if (root == nullptr) return nullptr;

    if (key < root->val) {
        root->left = deleteNode(root->left, key);
    } else if (key > root->val) {
        root->right = deleteNode(root->right, key);
    } else {
        // 找到要删除的节点

        // 情况1 & 2: 0个或1个子节点
        if (root->left == nullptr) {
            TreeNode* temp = root->right;
            delete root;
            return temp;
        } else if (root->right == nullptr) {
            TreeNode* temp = root->left;
            delete root;
            return temp;
        }

        // 情况3: 2个子节点 - 找右子树最小值(后继)
        TreeNode* successor = findMin(root->right);
        root->val = successor->val;  // 用后继值替代
        root->right = deleteNode(root->right, successor->val); // 删除后继
    }

    return root;
}

// 最小值: 一直向左
TreeNode* findMin(TreeNode* node) {
    while (node->left != nullptr) {
        node = node->left;
    }
    return node;
}
```

### 复杂度

| 操作 | 平均     | 最坏 |
| ---- | -------- | ---- |
| 查找 | O(log n) | O(n) |
| 插入 | O(log n) | O(n) |
| 删除 | O(log n) | O(n) |

**空间复杂度:** O(n)

---

## 2.4 平衡二叉树 (Balanced Binary Tree)

### 问题引入

BST 为什么不够用？

回顾 BST 的最坏情况：

```
插入1,2,3,4,5:
1
 \
  2
   \
    3
     \
      4
       \
        5  ← 退化成链表！查找O(n)
```

**根本原因：** BST 不保证平衡性

**解决思路：** 在插入/删除时，通过**旋转**保持树的平衡

**进化路径：**

```
BST (无平衡保证)
  ↓ 严格平衡
AVL树 (任意节点左右子树高度差≤1, 查找最快)
  ↓ 放宽限制
红黑树 (弱平衡, 插入删除更快, C++ STL采用)
  ↓ 适应磁盘IO
B树/B+树 (多路平衡树, 数据库索引)
```

### 核心概念

**平衡二叉树**：任意节点的左右子树高度差不超过 1 的二叉树

**平衡因子 (Balance Factor)** = 左子树高度 - 右子树高度

- 平衡二叉树的平衡因子只能是: **-1, 0, 1**

```
        平衡 ✓                    不平衡 ✗

          5                          5
         / \                        /
        3   8                      3
       / \   \                    /
      1   4   9                  2
                                /
平衡因子都是 -1,0,1              1        ← 节点5的平衡因子为2
```

### 1. AVL 树

**最严格的平衡树**，由 Adelson-Velsky 和 Landis 发明

**特点**:

- 任意节点平衡因子 ∈ {-1, 0, 1}
- 插入/删除后通过**旋转**恢复平衡
- 查找效率最高，但维护成本较高

```cpp
class AVLNode {
public:
    int val;
    int height;
    AVLNode* left;
    AVLNode* right;

    AVLNode(int x) : val(x), height(1), left(nullptr), right(nullptr) {}
};
```

#### 旋转操作

AVL 树通过**旋转**保持平衡，有 4 种情况：

1. **LL (左左)**: 在左子树的左边插入 → **右旋**
2. **RR (右右)**: 在右子树的右边插入 → **左旋**
3. **LR (左右)**: 在左子树的右边插入 → **先左旋后右旋**
4. **RL (右左)**: 在右子树的左边插入 → **先右旋后左旋**

##### 1. 右旋 (LL 情况)

```
      y                    x
     / \    右旋          / \
    x   C   --->         A   y
   / \                      / \
  A   B                    B   C
```

```cpp
TreeNode* rightRotate(TreeNode* y) {
    TreeNode* x = y->left;
    TreeNode* B = x->right;

    // 执行旋转
    x->right = y;
    y->left = B;

    // 更新高度
    y->height = max(height(y->left), height(y->right)) + 1;
    x->height = max(height(x->left), height(x->right)) + 1;

    return x;  // 新的根节点
}
```

##### 2. 左旋 (RR 情况)

```
    x                      y
   / \      左旋          / \
  A   y     --->         x   C
     / \                / \
    B   C              A   B
```

```cpp
TreeNode* leftRotate(TreeNode* x) {
    TreeNode* y = x->right;
    TreeNode* B = y->left;

    // 执行旋转
    y->left = x;
    x->right = B;

    // 更新高度
    x->height = max(height(x->left), height(x->right)) + 1;
    y->height = max(height(y->left), height(y->right)) + 1;

    return y;  // 新的根节点
}
```

##### 3. 先左旋后右旋 (LR 情况)

```
      z              z                x
     / \            / \              / \
    y   D   -->    x   D    -->     y   z
   / \            / \              / \ / \
  A   x          y   C            A  B C  D
     / \        / \
    B   C      A   B

    步骤1:          步骤2:
    左旋y          右旋z
```

##### 4. 先右旋后左旋 (RL 情况)

```
    z                z              x
   / \              / \            / \
  A   y     -->    A   x    -->   z   y
     / \              / \        / \ / \
    x   D            B   y      A  B C  D
   / \                  / \
  B   C                C   D

  步骤1:               步骤2:
  右旋y               左旋z
```

#### 插入操作

```cpp
AVLNode* insert(AVLNode* node, int key) {
    // 1. 正常BST插入
    if (node == nullptr)
        return new AVLNode(key);

    if (key < node->val)
        node->left = insert(node->left, key);
    else if (key > node->val)
        node->right = insert(node->right, key);
    else
        return node;

    // 2. 更新高度
    node->height = 1 + max(height(node->left), height(node->right));

    // 3. 计算平衡因子
    int balance = height(node->left) - height(node->right);

    // 4. 如果失衡，进行旋转

    // LL
    if (balance > 1 && key < node->left->val)
        return rightRotate(node);

    // RR
    if (balance < -1 && key > node->right->val)
        return leftRotate(node);

    // LR
    if (balance > 1 && key > node->left->val) {
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }

    // RL
    if (balance < -1 && key < node->right->val) {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }

    return node;
}
```

#### 时间复杂度

| 操作 | 时间            |
| ---- | --------------- |
| 查找 | O(log n) - 保证 |
| 插入 | O(log n)        |
| 删除 | O(log n)        |

**优点：** 严格平衡，查找效率高
**缺点：** 插入删除时旋转次数多

### 2. 红黑树 (Red-Black Tree)

**应用最广的平衡树** (C++ STL map/set, Java TreeMap)

**性质**:

1. 每个节点是红色或黑色
2. 根节点是黑色
3. 叶子节点是黑色
4. 红色节点的子节点必须是黑色(不能有连续红节点)
5. 从任一节点到其叶子的所有路径包含相同数目的黑色节点

```
         13(B)
        /     \
      8(R)    17(B)
     /   \       \
   1(B)  11(B)  25(R)
              /    \
            22(B)  27(B)
```

**特点**:

- 近似平衡(最长路径 ≤ 2× 最短路径)
- 插入/删除最多 3 次旋转
- 比 AVL 树插入删除快，查找稍慢

```cpp
enum Color { RED, BLACK };

class RBNode {
public:
    int val;
    Color color;
    RBNode *left, *right, *parent;

    RBNode(int x) : val(x), color(RED),
                    left(nullptr), right(nullptr), parent(nullptr) {}
};
```

#### 插入修复

插入节点标记为**红色**，可能违反性质 4（连续红色）。

**修复策略（3 种情况）：**

**情况 1：叔叔是红色** → 变色

```
        (B)G
       /    \
    (R)P    (R)U
   /
(R)N

解决：P和U变黑，G变红
        (R)G
       /    \
    (B)P    (B)U
   /
(R)N
```

**情况 2：叔叔是黑色，N 在 P 右侧（LR 型）** → 左旋

```
    (B)G
   /    \
(R)P    (B)U
   \
   (R)N

解决：左旋P，转化为情况3
```

**情况 3：叔叔是黑色，N 在 P 左侧（LL 型）** → 右旋+变色

```
    (B)G
   /    \
(R)P    (B)U
 /
(R)N

解决：右旋G，P变黑，G变红
      (B)P
     /    \
  (R)N    (R)G
              \
              (B)U
```

**具体实现较复杂，实际工程中直接用 STL。**

#### 时间复杂度

| 操作 | 时间     |
| ---- | -------- |
| 查找 | O(log n) |
| 插入 | O(log n) |
| 删除 | O(log n) |

#### STL set（有序集合，元素唯一）

```cpp
set<int> s;

// 插入
s.insert(30);
s.insert(10);
s.insert(20);

// 查找
if (s.find(20) != s.end()) {
    cout << "找到" << endl;
}

s.count(10);  // 返回0或1

// 删除
s.erase(10);

// 遍历（自动排序）
for (int x : s) {
    cout << x << " ";  // 10 20 30
}

// 其他操作
s.size();
s.empty();
s.clear();
s.begin();  // 最小元素
s.rbegin(); // 最大元素
```

#### STL map（有序键值对，key 唯一）

```cpp
map<string, int> m;

// 插入
m["Alice"] = 85;
m["Bob"] = 90;
m.insert({"Charlie", 78});

// 访问
cout << m["Alice"] << endl;

// 查找
if (m.find("Bob") != m.end()) {
    cout << "找到" << endl;
}

m.count("Alice");  // 返回0或1

// 删除
m.erase("Charlie");

// 遍历（按key排序）
for (auto& p : m) {
    cout << p.first << ": " << p.second << endl;
}

// 其他操作
m.size();
m.empty();
m.clear();
```

### 3. B 树 / B+ 树

**多路平衡查找树**，主要用于**数据库和文件系统**

**二叉树的问题：**

```
       10
      /  \
     5    15
    / \   / \
   3   7 12  20

查找20需要3次磁盘IO（访问10, 15, 20）
树越高，IO越多
```

**B 树的思路：**

- 每个节点存**多个 key**，减少树高
- 一个节点正好**一页**，减少 IO 次数

**B 树特点**:

- 每个节点可以有多个子节点(不只是 2 个)
- 所有叶子节点在同一层
- 适合磁盘存储(减少 I/O 次数)

#### B 树

一棵**m 阶 B 树**满足：

1. 每个节点最多 m 个子节点
2. 除根外，每个节点至少⌈m/2⌉个子节点
3. 根节点至少 2 个子节点（除非是叶子）
4. 所有叶子在同一层
5. 节点有 k 个 key，就有 k+1 个子节点

```
3阶B树（每个节点最多2个key，3个子节点）：

        [10, 20]
       /    |    \
    [5]   [15]   [25, 30]
```

**性质：**

- key 按升序排列
- key[i]的左子树所有 key < key[i]
- key[i]的右子树所有 key > key[i]

```cpp
class BTreeNode {
public:
    vector<int> keys;           // key数组
    vector<BTreeNode*> children; // 子节点指针
    bool isLeaf;
    int n;                      // 当前key个数

    BTreeNode(bool leaf) : isLeaf(leaf), n(0) {}
};
```

##### 插入操作

**情况 1：节点未满** → 直接插入

```
插入12到节点[10, 20]：
[10, 12, 20]
```

**情况 2：节点已满** → 分裂

```
插入25到已满节点[10, 20, 30]（3阶B树，最多2个key）：

步骤1：临时插入
[10, 20, 25, 30]

步骤2：找中间key（20和25之间，取20），分裂
       [20]        ← 提升到父节点
      /    \
   [10]    [25, 30]
```

如果父节点也满了，继续向上分裂，直到根。

###### 查找操作

```cpp
BTreeNode* search(BTreeNode* node, int key) {
    int i = 0;
    // 找第一个 ≥ key的位置
    while (i < node->n && key > node->keys[i])
        i++;

    if (i < node->n && key == node->keys[i])
        return node;  // 找到

    if (node->isLeaf)
        return nullptr;  // 未找到

    return search(node->children[i], key);  // 递归查找子树
}
```

##### 时间复杂度

**m 阶 B 树，n 个 key：**

- 树高：O(log_m n)
- 查找：O(log_m n)次磁盘 IO
- 插入/删除：O(log_m n)次磁盘 IO

**例如：** m=1000 的 B 树，存 1 亿条记录，树高只有 3-4 层！

#### B+树

B+树是 B 树的变种，**更适合数据库**。

**与 B 树的区别：**

1. **所有数据都存在叶子节点**，内部节点只存索引
2. **叶子节点形成链表**，便于范围查询

```
B+树：
        [10, 20]         ← 内部节点，只有索引
       /    |    \
    [5]   [15]   [25]    ← 叶子节点，存数据
     ↓     ↓      ↓
    数据   数据    数据
     ↔     ↔      ↔      ← 叶子节点连成链表
```

**B+树的优点：**

1. 内部节点不存数据，可以存**更多 key**，树更矮
2. 叶子节点链表，**范围查询快**（如：查找 10-30 之间的数据）
3. 所有查询都到达叶子，**性能稳定**

### 平衡树对比

| 特性          | AVL 树            | 红黑树                        | B 树/B+树       |
| ------------- | ----------------- | ----------------------------- | --------------- |
| **平衡程度**  | 严格（高度差 ≤1） | 近似（最长路径 ≤2× 最短路径） | 完全平衡        |
| **查找速度**  | 最快              | 较快                          | 快(磁盘)        |
| **插入/删除** | 较慢(多次旋转)    | 快(最多 3 次旋转)             | 适中            |
| **适用场景**  | 查找密集          | 插入删除频繁                  | 数据库索引      |
| **实际应用**  | Windows 内核      | C++ STL, Linux 内核           | MySQL, 文件系统 |

---

## 2.5 堆（Heap）

> 用于维护最值。

**堆**是一种特殊的**完全二叉树**，满足堆性质：

- **最大堆 (Max Heap)**: 父节点 ≥ 子节点
- **最小堆 (Min Heap)**: 父节点 ≤ 子节点

```
最大堆示例:                最小堆示例:
        100                      1
       /   \                   /   \
      19    36                2     3
     / \   / \               / \   / \
    17  3 25  1             17 19 36 7
   / \                     /
  2   7                   25

特点: 根节点最大         特点: 根节点最小
```

**注意：** 堆不是 BST！兄弟节点间无大小关系。

### 数组存储

完全二叉树用数组存储很高效：

```
数组：[90, 80, 70, 50, 40, 30]
下标： 0   1   2   3   4   5

        90(0)
       /      \
    80(1)     70(2)
    / \       /
 50(3) 40(4) 30(5)

规律：
节点i的左子：2i + 1
节点i的右子：2i + 2
节点i的父节点：(i - 1) / 2
```

### 基本操作

#### 上浮

用于插入后维护堆性质。

```
插入 50 到最大堆:

步骤1: 放到末尾           步骤2: 与父节点比较
        100                      100
       /   \                    /   \
      19    36                 19    36
     / \   / \                / \   / \
    17  3 25  1              17 50 25  1  ← 50 > 3, 交换
   / \  /                   / \  /
  2   7 50                 2   7 3

步骤3: 继续上浮            步骤4: 完成
        100                      100
       /   \                    /   \
      50    36                 50    36
     / \   / \                / \   / \
    17 19 25  1              17 19 25  1
   / \  /                   / \  /
  2   7 3                  2   7 3
```

```cpp
void up(vector<int>& heap, int index) {
    while (index > 0) {
        int parent = (index - 1) / 2;

        // 最大堆: 如果子节点 > 父节点，交换
        if (heap[index] > heap[parent]) {
            swap(heap[index], heap[parent]);
            index = parent;
        } else {
            break;
        }
    }
}

void push(vector<int>& heap, int val) {
    heap.push_back(val);
    ip(heap, heap.size() - 1);
}
// 时间：O(log n)
```

#### 下沉

用于删除堆顶后维护堆性质。

```
删除堆顶 100:

步骤1: 用末尾元素替换     步骤2: 与较大子节点比较
        3                        50
       /   \                    /   \
      19    36       →         19    36
     / \   / \                / \   / \
    17 50 25  1              17  3 25  1
   / \                      / \
  2   7                    2   7

步骤3: 继续下沉            步骤4: 完成
        50                       50
       /   \                    /   \
      19    36                 19    36
     / \   / \                / \   / \
    17  3 25  1              17  7 25  1
   / \                      / \
  2   7                    2   3
```

```cpp
void down(vector<int>& heap, int i) {
    int n = heap.size();
    while (2 * i + 1 < n) {
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        int largest = i;

        if (heap[left] > heap[largest])
            largest = left;
        if (right < n && heap[right] > heap[largest])
            largest = right;

        if (largest != i) {
            swap(heap[i], heap[largest]);
            i = largest;
        } else {
            break;
        }
    }
}

int pop(vector<int>& heap) {
    int maxVal = heap[0];
    heap[0] = heap.back();
    heap.pop_back();
    if (!heap.empty()) {
        down(heap, 0);
    }
    return maxVal;
}
// 时间：O(log n)
```

#### 建堆（Heapify）

给定无序数组，如何建堆？

##### 逐个插入 - O(n log n)

```cpp
void buildHeapByInsert(vector<int>& arr) {
    MaxHeap heap;
    for (int num : arr) {
        heap.push(num);  // 每次 O(log n)
    }
}
```

##### 自底向上 - O(n) ⭐ 推荐

**从最后一个非叶子节点开始，逐个下沉**

```cpp
void heapify(vector<int>& arr) {
    // 从最后一个非叶子节点开始，往前sift down
    for (int i = arr.size() / 2 - 1; i >= 0; i--) {
        siftDown(arr, i);
    }
}
```

**为什么是 O(n)？**

数学分析：

- 叶子节点（约 n/2 个）不需要调整
- 倒数第二层（约 n/4 个）最多下沉 1 次
- 倒数第三层（约 n/8 个）最多下沉 2 次
- 总操作数: n/4×1 + n/8×2 + n/16×3 + ... = O(n)

**示例：**

```
数组：[3, 5, 1, 10, 2, 7]

初始树：
        3
       / \
      5   1
     /|\  /
    10 2 7

从i=2开始（最后非叶节点）：
i=2: 1下沉（与7交换）
i=1: 5下沉（与10交换）
i=0: 3下沉（与10交换，再与7交换）

最终最大堆：
        10
       /  \
      5    7
     / \   /
    3  2  1
```

### 时间复杂度

| 操作           | 时间复杂度 |
| -------------- | ---------- |
| 插入 (push)    | O(log n)   |
| 删除堆顶 (pop) | O(log n)   |
| 查看堆顶 (top) | O(1)       |
| 建堆 (heapify) | O(n)       |

**空间复杂度**: O(n)

### STL：优先队列 priority_queue

```cpp
// 最大堆（默认）
priority_queue<int> maxHeap;

maxHeap.push(30);
maxHeap.push(10);
maxHeap.push(50);

cout << maxHeap.top() << endl;  // 50
maxHeap.pop();
cout << maxHeap.top() << endl;  // 30

maxHeap.size();
maxHeap.empty();
```

**最小堆：**

```cpp
priority_queue<int, vector<int>, greater<int>> minHeap;

minHeap.push(30);
minHeap.push(10);
minHeap.push(50);

cout << minHeap.top() << endl;  // 10
```

**自定义比较：**

```cpp
class Compare {
public:
    bool operator()(int a, int b) {
        return a > b;  // 最小堆
    }
};
priority_queue<int, vector<int>, Compare> customHeap;
```

---

## 2.6 Huffman 树

> 哈夫曼树是一种**一次性编码结构构造**的数据结构，不支持动态插入与删除。

### 核心思想

为了解码无歧义，要求：**任何字符的编码都不是另一个字符编码的前缀**

```
❌ 错误的编码：
A → 0
B → 01   ← B的编码是A的前缀！

解码"01"时无法确定是"AB"还是"B"

✅ 正确的编码（前缀编码）：
A → 0
B → 10
```

前缀编码可以用**二叉树**表示：

- 左分支：0
- 右分支：1
- 叶子节点：字符
- 从根到叶的路径：编码

```
示例：
        root
       /    \
      0      1
     A      / \
           0   1
          B   / \
             0   1
            R   / \
               0   1
              C   D

编码：
A: 0
B: 10
R: 110
C: 1110
D: 1111
```

#### 带权路径长度（WPL）

**定义：**

```
WPL = Σ(叶子节点的权值 × 路径长度)

权值 = 字符出现频率
路径长度 = 根到叶子的边数
```

**示例：**

```
字符频率：
A: 5
B: 2
R: 2
C: 1
D: 1

上面的树：
WPL = 5×1 + 2×2 + 2×3 + 1×4 + 1×4
    = 5 + 4 + 6 + 4 + 4
    = 23
```

**目标：构造 WPL 最小的二叉树 → 编码总长度最短**

### 构造

每次选择**频率最小的两个节点**合并。

**输入：** n 个字符及其频率

**步骤：**

1. 将 n 个字符作为 n 棵树（每棵树只有一个节点）
2. 用优先队列（最小堆）存储这些树，按权值排序
3. 重复以下步骤直到只剩一棵树：
   - 取出权值最小的两棵树
   - 创建新节点作为它们的父节点，权值 = 两子树权值之和
   - 将新树放回优先队列

**示例：构造 ABRACADABRA 的哈夫曼树**

```
初始频率：
A:5  B:2  R:2  C:1  D:1

步骤1：合并C(1)和D(1)
    2
   / \
  C:1 D:1

剩余：A:5  B:2  R:2  [C+D:2]

步骤2：合并B(2)和[C+D](2)
      4
     / \
    B:2  2
        / \
       C:1 D:1

剩余：A:5  R:2  [B+C+D:4]

步骤3：合并R(2)和[B+C+D](4)
        6
       / \
      R:2  4
          / \
         B:2  2
             / \
            C:1 D:1

剩余：A:5  [R+B+C+D:6]

步骤4：合并A(5)和[R+B+C+D](6)
           11
          /  \
        A:5   6
             / \
            R:2  4
                / \
               B:2  2
                   / \
                  C:1 D:1

最终哈夫曼树构造完成！
```

**读取编码：**

```
从根到叶的路径，左=0，右=1

A: 左 → 0
R: 右→左 → 10
B: 右→右→左 → 110
C: 右→右→右→左 → 1110
D: 右→右→右→右 → 1111
```

**WPL 计算：**

```
WPL = 5×1 + 2×2 + 2×3 + 1×4 + 1×4
    = 5 + 4 + 6 + 4 + 4
    = 23
```

### 代码实现

```cpp
class HuffmanNode {
public:
    char ch;
    int freq;
    HuffmanNode *left, *right;

    HuffmanNode(char c, int f) : ch(c), freq(f), left(nullptr), right(nullptr) {}
    HuffmanNode(int f, HuffmanNode* l, HuffmanNode* r)
        : ch('\0'), freq(f), left(l), right(r) {}
};

// 比较器：按频率排序（最小堆）
class Compare {
public:
    bool operator()(HuffmanNode* a, HuffmanNode* b) {
        return a->freq > b->freq;
    }
};

// 构造哈夫曼树
HuffmanNode* buildHuffmanTree(vector<pair<char, int>>& charFreq) {
    priority_queue<HuffmanNode*, vector<HuffmanNode*>, Compare> pq;

    // 步骤1：初始化，每个字符作为一棵树
    for (auto& p : charFreq) {
        pq.push(new HuffmanNode(p.first, p.second));
    }

    // 步骤2：不断合并最小的两棵树
    while (pq.size() > 1) {
        HuffmanNode* left = pq.top(); pq.pop();
        HuffmanNode* right = pq.top(); pq.pop();

        // 创建父节点
        int sumFreq = left->freq + right->freq;
        HuffmanNode* parent = new HuffmanNode(sumFreq, left, right);

        pq.push(parent);
    }

    return pq.top();  // 返回根节点
}

// 生成编码表
void generateCodes(HuffmanNode* root, string code,
                   unordered_map<char, string>& codes) {
    if (root == nullptr) return;

    // 叶子节点：存储编码
    if (root->left == nullptr && root->right == nullptr) {
        codes[root->ch] = code;
        return;
    }

    // 递归处理左右子树
    generateCodes(root->left, code + "0", codes);
    generateCodes(root->right, code + "1", codes);
}

// 编码
string encode(string text, unordered_map<char, string>& codes) {
    string result = "";
    for (char c : text) {
        result += codes[c];
    }
    return result;
}

// 解码
string decode(string encoded, HuffmanNode* root) {
    string result = "";
    HuffmanNode* curr = root;

    for (char bit : encoded) {
        if (bit == '0') {
            curr = curr->left;
        } else {
            curr = curr->right;
        }

        // 到达叶子节点
        if (curr->left == nullptr && curr->right == nullptr) {
            result += curr->ch;
            curr = root;  // 回到根节点
        }
    }

    return result;
}
```

### 时间复杂度

| 操作         | 时间               |
| ------------ | ------------------ |
| 构造哈夫曼树 | O(n log n)         |
| 生成编码表   | O(n)               |
| 编码         | O(m)，m 是文本长度 |
| 解码         | O(k)，k 是编码长度 |

**构造过程：**

- n 个字符，需要合并 n-1 次
- 每次合并涉及堆操作：O(log n)
- 总时间：O(n log n)

### 最优性证明

**定理：** 哈夫曼算法构造的树具有最小的 WPL。

**证明思路（贪心选择性质）：**

1. **最优树的性质：** 频率最小的两个字符一定是兄弟节点，且在最深层

2. **贪心选择：** 哈夫曼算法每次选择频率最小的两个节点合并

3. **归纳证明：**
   - 假设 n-1 个节点时算法最优
   - 对于 n 个节点，合并最小的两个后，问题规模变为 n-1
   - 由归纳假设，剩余部分最优
   - 因此 n 个节点时也最优

---

## 2.7 树状数组 (Binary Indexed Tree / Fenwick Tree)

> 区间和查询的高效方案

### 问题场景

假设有一个数组，需要频繁进行以下操作：

1. 修改某个位置的值
2. 查询某个区间的和

**朴素方法：**

| 方法     | 单点修改 | 区间查询 | 问题                   |
| -------- | -------- | -------- | ---------------------- |
| 直接遍历 | O(1)     | O(n)     | 查询太慢               |
| 前缀和   | O(n)     | O(1)     | 修改需要重算整个前缀和 |

**能否做到修改和查询都快？** → 树状数组：**O(log n)**

### 核心思想

利用二进制特性，每个位置存储一段区间的和：

```
arr = [1, 3, 5, 7, 9, 11, 13, 15]
下标   1  2  3  4  5  6   7   8

BIT:
bit[1] = arr[1]                    = 1        (管辖1个元素)
bit[2] = arr[1] + arr[2]           = 4        (管辖2个元素)
bit[3] = arr[3]                    = 5        (管辖1个元素)
bit[4] = arr[1]~arr[4]的和         = 16       (管辖4个元素)
bit[5] = arr[5]                    = 9        (管辖1个元素)
bit[6] = arr[5] + arr[6]           = 20       (管辖2个元素)
bit[7] = arr[7]                    = 13       (管辖1个元素)
bit[8] = arr[1]~arr[8]的和         = 64       (管辖8个元素)

规律: bit[i] 管辖 lowbit(i) 个元素
lowbit(i) = i & (-i)  // 提取最低位的1
```

**lowbit 原理：**

```
i = 6 (二进制 0110)
-i 的补码:
  ~6 = ...11111001  (按位取反)
  +1 = ...11111010  (加1)

i & (-i):
  0110
& 1010
------
  0010 = 2

所以 bit[6] 管辖 2 个元素: arr[5], arr[6]
```

**可视化：**

```
数组下标的二进制表示决定了管辖范围:

下标  二进制  lowbit  管辖范围
1     001     1       [1, 1]
2     010     2       [1, 2]
3     011     1       [3, 3]
4     100     4       [1, 4]
5     101     1       [5, 5]
6     110     2       [5, 6]
7     111     1       [7, 7]
8     1000    8       [1, 8]
```

### 实现

```cpp
class BIT {
private:
    vector<int> tree;
    int n;

    int lowbit(int x) {
        return x & (-x);
    }

public:
    BIT(int size) : n(size) {
        tree.resize(n + 1, 0);  // 下标从1开始
    }

    // 单点修改: arr[index] += val
    void update(int index, int val) {
        index++;  // 转换为1-based索引
        while (index <= n) {
            tree[index] += val;
            index += lowbit(index);  // 跳到父节点
        }
    }

    // 前缀和: sum(arr[0]...arr[index])
    int query(int index) {
        index++;  // 转换为1-based索引
        int sum = 0;
        while (index > 0) {
            sum += tree[index];
            index -= lowbit(index);  // 跳到下一个需要的区间
        }
        return sum;
    }

    // 区间和: sum(arr[L]...arr[R])
    int rangeQuery(int L, int R) {
        return query(R) - (L > 0 ? query(L - 1) : 0);
    }
};
```

### 操作详解

#### 单点修改 update(2, 5)

修改 arr[2] += 5，需要更新所有包含 arr[2] 的 bit 节点：

```
更新路径: 3 → 4 → 8

index = 3 (二进制 011, lowbit=1)
  tree[3] += 5
  index = 3 + 1 = 4

index = 4 (二进制 100, lowbit=4)
  tree[4] += 5
  index = 4 + 4 = 8

index = 8 (二进制 1000, lowbit=8)
  tree[8] += 5
  index = 8 + 8 = 16 > n，结束
```

**为什么是这条路径？**

- bit[3] 管辖 [3, 3]，包含 arr[2]
- bit[4] 管辖 [1, 4]，包含 arr[2]
- bit[8] 管辖 [1, 8]，包含 arr[2]

#### 前缀和查询 query(6)

查询 sum(arr[0]~arr[6])，需要累加多个 bit 节点：

```
查询路径: 7 → 6 → 4

index = 7 (二进制 111, lowbit=1)
  sum += tree[7]  // arr[7]
  index = 7 - 1 = 6

index = 6 (二进制 110, lowbit=2)
  sum += tree[6]  // arr[5] + arr[6]
  index = 6 - 2 = 4

index = 4 (二进制 100, lowbit=4)
  sum += tree[4]  // arr[1]~arr[4]
  index = 4 - 4 = 0，结束

结果: sum = arr[1]~arr[7]
```

**拼图原理：**

```
[1, 7] = [1, 4] + [5, 6] + [7, 7]
         ↑       ↑        ↑
       tree[4] tree[6]  tree[7]
```

### 建树（初始化）

如果需要根据初始数组建树：

```cpp
BIT(vector<int>& arr) : n(arr.size()) {
    tree.resize(n + 1, 0);
    for (int i = 0; i < n; i++) {
        update(i, arr[i]);  // O(n log n)
    }
}

// 更快的建树方法 O(n)
BIT(vector<int>& arr) : n(arr.size()) {
    tree.resize(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        tree[i] += arr[i - 1];
        int j = i + lowbit(i);
        if (j <= n) {
            tree[j] += tree[i];
        }
    }
}
```

### 时间复杂度

| 操作       | 时间复杂度 |
| ---------- | ---------- |
| 建树       | O(n)       |
| 单点修改   | O(log n)   |
| 前缀和查询 | O(log n)   |
| 区间和查询 | O(log n)   |
| 空间       | O(n)       |

### 优缺点

**优点：**

- 代码简洁（核心代码约 20 行）
- 常数因子小，实际运行快
- 空间占用少 O(n)

**缺点：**

- 只能处理"可逆"操作（加法可以用减法撤销）
- 无法处理区间最值（max/min）、区间 GCD 等
- 区间修改需要差分数组技巧

---

## 2.8 线段树（Segment Tree）

> 功能更强大的区间操作结构

### 为什么需要线段树？

树状数组虽然简洁，但有局限：

**树状数组的问题：**

```
只能处理"可加"操作:
✅ 区间和 - 可以
❌ 区间最大值 - 不行（没有"减法"来撤销）
❌ 区间GCD - 不行
❌ 区间修改 - 需要额外技巧
```

**线段树的优势：**

- 支持任意可结合的操作（和、最值、GCD、乘积等）
- 原生支持区间修改（懒惰标记）
- 更通用，代价是代码更复杂

### 核心思想

线段树是一棵**完全二叉树**，每个节点代表一个区间：

- **根节点**：代表整个数组区间[0, n-1]
- **左子节点**：代表左半段
- **右子节点**：代表右半段
- **叶子节点**：代表单个元素

```
数组：arr = [1, 3, 5, 7, 9, 11]
下标：      0  1  2  3  4  5

线段树（存储区间和）：

                [0-5]:36
               /        \
          [0-2]:9        [3-5]:27
          /    \         /      \
      [0-1]:4  [2]:5  [3-4]:16  [5]:11
      /    \           /    \
   [0]:1  [1]:3     [3]:7  [4]:9

节点含义：
- [0-5]:36 → 区间[0,5]的和是36
- [0-2]:9  → 区间[0,2]的和是9
- [0]:1    → 单个元素arr[0]=1
```

**树的性质：**

- 叶子节点：单个元素
- 内部节点：左右子树的合并结果
- 树高：O(log n)

### 实现

#### 节点定义

```cpp
class SegmentTreeNode {
public:
    int start, end;      // 区间范围[start, end]
    int sum;             // 区间和（可改为max/min/gcd等）
    SegmentTreeNode *left, *right;

    SegmentTreeNode(int s, int e) : start(s), end(e), sum(0),
                                     left(nullptr), right(nullptr) {}
};

class SegmentTree {
private:
    SegmentTreeNode* root;
    vector<int> arr;

    SegmentTreeNode* build(int start, int end);
    int queryHelper(SegmentTreeNode* node, int L, int R);
    void updateHelper(SegmentTreeNode* node, int index, int val);

public:
    SegmentTree(vector<int>& nums);
    int query(int L, int R);
    void update(int index, int val);
};
```

#### 建树（Build）

```cpp
SegmentTreeNode* build(int start, int end) {
    SegmentTreeNode* node = new SegmentTreeNode(start, end);

    // 叶子节点
    if (start == end) {
        node->sum = arr[start];
        return node;
    }

    // 递归构造左右子树
    int mid = start + (end - start) / 2;
    node->left = build(start, mid);
    node->right = build(mid + 1, end);

    // 合并左右子树
    node->sum = node->left->sum + node->right->sum;

    return node;
}

// 时间：O(n)
```

**建树过程示例：**

```
arr = [1, 3, 5, 7]

build(0, 3):
  mid = 1

  build(0, 1):
    mid = 0
    build(0, 0): 返回[0]:1
    build(1, 1): 返回[1]:3
    返回[0-1]:4

  build(2, 3):
    mid = 2
    build(2, 2): 返回[2]:5
    build(3, 3): 返回[3]:7
    返回[2-3]:12

  返回[0-3]:16
```

#### 区间查询（Query）

```cpp
int queryHelper(SegmentTreeNode* node, int L, int R) {
    // 情况1：当前区间完全在[L, R]内
    if (node->start >= L && node->end <= R) {
        return node->sum;
    }

    // 情况2：当前区间与[L, R]无交集
    if (node->start > R || node->end < L) {
        return 0;
    }

    // 情况3：部分重叠，递归查询左右子树
    return queryHelper(node->left, L, R) +
           queryHelper(node->right, L, R);
}

int query(int L, int R) {
    return queryHelper(root, L, R);
}

// 时间：O(log n)
```

**查询示例：** 查询 [1, 3] 的和

```
arr = [1, 3, 5, 7]

query(1, 3):
  当前节点[0-3]，部分重叠

  query左子[0-1]，查询[1, 3]:
    部分重叠
    query左子[0]，查询[1, 3]: 无交集，返回0
    query右子[1]，查询[1, 3]: 完全包含，返回3
    返回 0 + 3 = 3

  query右子[2-3]，查询[1, 3]:
    完全包含，返回12

  返回 3 + 12 = 15  ✓
```

#### 单点修改（Update）

```cpp
void updateHelper(SegmentTreeNode* node, int index, int val) {
    // 找到叶子节点
    if (node->start == node->end) {
        node->sum = val;
        return;
    }

    // 递归更新子树
    int mid = node->start + (node->end - node->start) / 2;
    if (index <= mid) {
        updateHelper(node->left, index, val);
    } else {
        updateHelper(node->right, index, val);
    }

    // 更新当前节点
    node->sum = node->left->sum + node->right->sum;
}

void update(int index, int val) {
    updateHelper(root, index, val);
}

// 时间：O(log n)
```

**更新示例：** 修改 arr[1] = 10

```
原数组：[1, 3, 5, 7]
修改后：[1, 10, 5, 7]

update(1, 10):
  当前节点[0-3]
    mid = 1，index=1 <= mid，递归左子

    update左子[0-1]:
      mid = 0，index=1 > mid，递归右子

      update右子[1]:
        叶子节点，sum = 10

      更新[0-1]: sum = 1 + 10 = 11

    更新[0-3]: sum = 11 + 12 = 23

树的变化：
        [0-3]:16              [0-3]:23
       /        \            /        \
   [0-1]:4    [2-3]:12 → [0-1]:11   [2-3]:12
   /    \      /    \    /    \      /    \
[0]:1 [1]:3 [2]:5 [3]:7 [0]:1 [1]:10 [2]:5 [3]:7
```

### 区间修改（懒惰标记）

如果需要区间修改，如：`updateRange(L, R, val)` - 将区间 [L, R] 所有元素加上 val

**朴素做法：** 遍历 [L, R] 逐个修改 → O(n log n)

**优化思路：延迟更新**

- 修改时只更新涉及的节点，打上"懒惰标记"
- 查询时再向下传递标记

```cpp
class SegmentTreeNode {
public:
    int start, end;
    int sum;
    int lazy;  // 懒惰标记
    SegmentTreeNode *left, *right;

    SegmentTreeNode(int s, int e) : start(s), end(e), sum(0), lazy(0),
                                     left(nullptr), right(nullptr) {}
};

// 下推懒惰标记
void pushDown(SegmentTreeNode* node) {
    if (node->lazy == 0) return;

    int len = node->end - node->start + 1;
    int leftLen = len - len / 2;
    int rightLen = len / 2;

    // 更新左子树
    node->left->sum += node->lazy * leftLen;
    node->left->lazy += node->lazy;

    // 更新右子树
    node->right->sum += node->lazy * rightLen;
    node->right->lazy += node->lazy;

    // 清除当前标记
    node->lazy = 0;
}

// 区间修改：[L, R] 所有元素加 val
void updateRange(SegmentTreeNode* node, int L, int R, int val) {
    // 完全包含
    if (node->start >= L && node->end <= R) {
        int len = node->end - node->start + 1;
        node->sum += val * len;
        node->lazy += val;
        return;
    }

    // 无交集
    if (node->start > R || node->end < L) {
        return;
    }

    // 部分重叠：先下推标记，再递归
    pushDown(node);
    updateRange(node->left, L, R, val);
    updateRange(node->right, L, R, val);

    // 更新当前节点
    node->sum = node->left->sum + node->right->sum;
}

// 区间查询需要先下推标记
int query(SegmentTreeNode* node, int L, int R) {
    if (node->start >= L && node->end <= R) {
        return node->sum;
    }

    if (node->start > R || node->end < L) {
        return 0;
    }

    pushDown(node);  // 先下推标记
    return query(node->left, L, R) + query(node->right, L, R);
}
```

**时间复杂度：** 区间修改和查询都是 O(log n)

### 扩展：其他类型的线段树

#### 区间最大值/最小值

```cpp
// 只需修改合并逻辑
node->maxVal = max(node->left->maxVal, node->right->maxVal);
```

#### 区间 GCD

```cpp
int gcd(int a, int b) {
    return b ? gcd(b, a % b) : a;
}

node->gcdVal = gcd(node->left->gcdVal, node->right->gcdVal);
```

### 时间复杂度

| 操作                 | 时间     | 空间  |
| -------------------- | -------- | ----- |
| 建树                 | O(n)     | O(4n) |
| 单点修改             | O(log n) | -     |
| 区间修改（懒惰标记） | O(log n) | -     |
| 区间查询             | O(log n) | -     |

**空间分析：**

- 完全二叉树最多有 2n-1 个节点
- 但用指针实现，实际约 4n 空间（预留满二叉树空间）

### 对比总结

| 特性       | 树状数组         | 线段树               |
| ---------- | ---------------- | -------------------- |
| 代码复杂度 | 简单（20 行）    | 复杂（100 行）       |
| 空间       | O(n)             | O(4n)                |
| 常数因子   | 小               | 较大                 |
| 适用操作   | 可逆操作（加法） | 任意可结合操作       |
| 区间修改   | 需要差分技巧     | 原生支持（懒惰标记） |
| 应用场景   | 区间和、竞赛     | 复杂区间操作         |

**选择建议：**

- 只需要区间和 + 单点修改 → **树状数组**（代码短、常数小）
- 需要区间最值 / 区间修改 / 复杂操作 → **线段树**

**STL 替代：** C++ 标准库没有直接的线段树/树状数组实现，需要手写或使用第三方库。

---

# 第三部分：图

数据元素之间是"多对多"的关系。

---

## 3.0 图的基本概念

图 G = (V, E)

- V：顶点集合
- E：边集合

```
无向图：
    A --- B
    |     |
    C --- D

有向图：
    A → B
    ↓   ↓
    C → D

带权图：
    A --5-- B
    |       |
    3       2
    |       |
    C --1-- D
```

### 术语

- **顶点/节点(Vertex/Node)**: 图中的基本单元(如 A、B、C、D)
- **边(Edge)**: 连接两个顶点的线
  - **无向边**: 双向连接，如 A---B
  - **有向边**: 单向连接，如 A→B
- **邻接(Adjacent)**: 两个顶点之间有边直接相连
- **度(Degree)**:
  - **无向图**: 与该顶点相连的边数
  - **有向图**:
    - **入度(In-degree)**: 指向该顶点的边数
    - **出度(Out-degree)**: 从该顶点发出的边数
- **权重(Weight)**: 边上的数值，表示代价、距离等
- **路径(Path)**: 顶点序列，相邻顶点间有边连接
- **简单路径**: 路径中顶点不重复
- **环/回路(Cycle)**: 起点和终点相同的路径

### 分类

- **无向图(Undirected Graph)**: 边没有方向
- **有向图(Directed Graph/Digraph)**: 边有方向
- **加权图(Weighted Graph)**: 边带有权重
- **完全图**: 任意两个顶点之间都有边
  - n 个顶点的无向完全图有 n(n-1)/2 条边
  - n 个顶点的有向完全图有 n(n-1) 条边
- **连通图**: 任意两个顶点之间都有路径可达
- **稀疏图**: 边数远小于完全图(|E| << |V|²)
- **稠密图**: 边数接近完全图

---

## 3.1 图的存储

### 邻接矩阵(Adjacency Matrix)

n×n 矩阵

```
    A --- B
    |     |
    C --- D

     A B C D
   A[0 1 1 0]
   B[1 0 1 1]
   C[1 1 0 1]
   D[0 1 1 0]
```

**复杂度：**
| 操作 | 时间 | 空间 |
|------|------|------|
| 判断有无边 | O(1) | O(V²) |
| 获取邻居 | O(V) | |
| 添加边 | O(1) | |

**适用：** 稠密图

### 邻接表(Adjacency List)

每个顶点维护一个表，存储相邻顶点

```
    A --- B
    |     |
    C --- D

邻接表：
A(0) → [B, C]
B(1) → [A, D]
C(2) → [A, D]
D(3) → [B, C]
```

**复杂度：**
| 操作 | 时间 | 空间 |
|------|------|------|
| 判断有无边 | O(degree) | O(V+E) |
| 获取邻居 | O(degree) | |
| 添加边 | O(1) | |

### 复杂度对比

| 特性       | 邻接矩阵 | 邻接表    |
| ---------- | -------- | --------- |
| 空间       | O(V²)    | O(V+E)    |
| 判断有无边 | O(1)     | O(degree) |
| 遍历邻居   | O(V)     | O(degree) |
| 适合       | 稠密图   | 稀疏图    |

**实际选择：** 大多数图是稀疏的，用邻接表。

---

## 3.3 图的遍历

> 这里只讨论遍历机制，不讨论基于遍历的具体算法问题（如最短路径、连通性判定等）。
> DFS / BFS 本质上描述的是在给定存储结构下，节点被访问的基本顺序规则，属于“如何访问数据”的范畴。

### 深度优先搜索（DFS）

**思想：** 一条路走到底，走不通再回头。

```
    A --- B
    |     |
    C --- D

从A开始DFS：
访问A → 访问B → 访问D → 回溯到A → 访问C
顺序：A → B → D → C
```

**递归实现：**

```cpp
class Graph {
private:
    int numVertices;
    vector<vector<int>> adjList;

    void DFSHelper(int v, vector<bool>& visited) {
        visited[v] = true;
        cout << v << " ";

        for (int neighbor : adjList[v]) {
            if (!visited[neighbor]) {
                DFSHelper(neighbor, visited);
            }
        }
    }

public:
    Graph(int n) : numVertices(n) {
        adjList.resize(n);
    }

    void addEdge(int u, int v) {
        adjList[u].push_back(v);
        adjList[v].push_back(u);
    }

    void DFS(int start) {
        vector<bool> visited(numVertices, false);
        DFSHelper(start, visited);
    }
};
```

**迭代实现（用栈）：**

```cpp
void DFS_iterative(int start) {
    vector<bool> visited(numVertices, false);
    stack<int> s;

    s.push(start);

    while (!s.empty()) {
        int v = s.top();
        s.pop();

        if (visited[v]) continue;

        visited[v] = true;
        cout << v << " ";

        // 反向压栈保持顺序一致
        for (int i = adjList[v].size() - 1; i >= 0; i--) {
            if (!visited[adjList[v][i]]) {
                s.push(adjList[v][i]);
            }
        }
    }
}
```

**时间复杂度：**

- 邻接表：O(V + E)
- 邻接矩阵：O(V²)

### 广度优先搜索（BFS）

**思想：** 一层一层访问，先访问离起点近的。

```
    A --- B
    |     |
    C --- D

从A开始BFS：
第0层：A
第1层：B, C（A的邻居）
第2层：D（B和C的邻居）

顺序：A → B → C → D
```

**实现（用队列）：**

```cpp
void BFS(int start) {
    vector<bool> visited(numVertices, false);
    queue<int> q;

    visited[start] = true;
    q.push(start);

    while (!q.empty()) {
        int v = q.front();
        q.pop();
        cout << v << " ";

        for (int neighbor : adjList[v]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}
```

**BFS 求最短距离：**

```cpp
vector<int> BFS_distance(int start) {
    vector<int> dist(numVertices, -1);
    vector<bool> visited(numVertices, false);
    queue<int> q;

    visited[start] = true;
    dist[start] = 0;
    q.push(start);

    while (!q.empty()) {
        int v = q.front();
        q.pop();

        for (int neighbor : adjList[v]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                dist[neighbor] = dist[v] + 1;
                q.push(neighbor);
            }
        }
    }

    return dist;
}
```

**时间复杂度：**

- 邻接表：O(V + E)
- 邻接矩阵：O(V²)

### 对比

| 特性     | DFS            | BFS            |
| -------- | -------------- | -------------- |
| 数据结构 | 栈（递归）     | 队列           |
| 搜索方式 | 深度优先       | 广度优先       |
| 空间     | O(h)           | O(w)           |
| 最短路径 | 不保证         | 保证（无权图） |
| 应用     | 连通性、环检测 | 最短路径、层次 |

h=深度，w=宽度

---

# 第四部分：特殊数据结构

---

## 4.1 哈希表

通过哈希函数将 key 映射到数组下标，实现 O(1)查找。

```
想存储学号 → 成绩：
20210001 → 85
20210002 → 90

hash(20210001) = 1 → 存在arr[1]
hash(20210002) = 2 → 存在arr[2]
```

### 哈希函数

**1) 除留余数法（最常用）**禁止

```cpp
int hash(int key, int size) {
    return key % size;
}
```

**2) 字符串哈希**

```cpp
int hash(string str, int size) {
    unsigned long hash = 0;
    for (char c : str) {
        hash = hash * 31 + c;
    }
    return hash % size;
}
```

**好的哈希函数：**

- 计算快
- 分布均匀
- 确定性

### 哈希冲突

不同 key 可能映射到同一位置。

```
hash(20210001) = 1
hash(20210011) = 1  ← 冲突！
```

**解决方法：**

### 链地址法（Chaining）

数组每个位置存一个链表。

```
哈希表：
[0] → nullptr
[1] → [20210001, 85] → [20210011, 92] → nullptr
[2] → [20210002, 90] → nullptr
```

```cpp
class HashTable {
private:
    class Node {
    public:
        int key;
        int value;
        Node* next;
        Node(int k, int v) : key(k), value(v), next(nullptr) {}
    };

    vector<Node*> table;
    int size;

public:
    HashTable(int s) : size(s) {
        table.resize(s, nullptr);
    }

    void insert(int key, int value) {
        int index = key % size;

        // 检查key是否已存在
        Node* curr = table[index];
        while (curr) {
            if (curr->key == key) {
                curr->value = value;  // 更新
                return;
            }
            curr = curr->next;
        }

        // 头插法插入新节点
        Node* newNode = new Node(key, value);
        newNode->next = table[index];
        table[index] = newNode;
    }

    int search(int key) {
        int index = key % size;
        Node* curr = table[index];

        while (curr) {
            if (curr->key == key)
                return curr->value;
            curr = curr->next;
        }
        return -1;  // 未找到
    }

    void remove(int key) {
        int index = key % size;
        Node* curr = table[index];
        Node* prev = nullptr;

        while (curr) {
            if (curr->key == key) {
                if (prev == nullptr) {
                    table[index] = curr->next;
                } else {
                    prev->next = curr->next;
                }
                delete curr;
                return;
            }
            prev = curr;
            curr = curr->next;
        }
    }
};
```

**性能：**

- 平均：O(1 + α)，α = n/size（装填因子）
- 最坏：O(n)，所有 key 都冲突

**优点：**

- 实现简单
- 删除方便
- 不会满

**缺点：**

- 额外指针空间
- 缓存不友好

### 开放地址法（Open Addressing）

所有元素都存在数组里，冲突时找下一个空位。

**线性探测：**

```
hash(key) 有人了，试 hash(key)+1
hash(key)+1 也有人，试 hash(key)+2
...
```

```cpp
class HashTableOpen {
private:
    vector<int> keys;
    vector<int> values;
    vector<bool> occupied;
    int size;

public:
    HashTableOpen(int s) : size(s) {
        keys.resize(s);
        values.resize(s);
        occupied.resize(s, false);
    }

    void insert(int key, int value) {
        int index = key % size;
        int i = 0;

        while (occupied[index]) {
            if (keys[index] == key) {
                values[index] = value;  // 更新
                return;
            }
            index = (index + 1) % size;  // 线性探测
            i++;
            if (i == size) {
                throw runtime_error("哈希表已满");
            }
        }

        keys[index] = key;
        values[index] = value;
        occupied[index] = true;
    }

    int search(int key) {
        int index = key % size;
        int i = 0;

        while (occupied[index]) {
            if (keys[index] == key)
                return values[index];
            index = (index + 1) % size;
            i++;
            if (i == size) break;
        }
        return -1;
    }
};
```

**删除的问题：**
不能直接删除，要用"墓碑"标记。

```
[1] key1
[2] key2  ← 删除key2
[3] key3

如果直接删除，查找key3会在[2]停止！
需要标记[2]为"已删除但仍占位"
```

**其他探测方法：**

**二次探测：**

```
试探序列：hash(key), hash(key)+1², hash(key)+2², ...
```

**双重哈希：**

```
step = hash2(key)
试探序列：hash(key), hash(key)+step, hash(key)+2*step, ...
```

**优点：**

- 无额外指针
- 缓存友好

**缺点：**

- 删除复杂
- 可能满
- 冲突多时性能下降快

### 装填因子（Load Factor）

```
α = n / size
n: 元素个数
size: 哈希表大小
```

**影响：**

- α 越大，冲突越多
- 链地址法：α 可以>1
- 开放地址法：α 必须<1（通常<0.7）

**扩容策略：**

```cpp
void resize() {
    int oldSize = size;
    int newSize = oldSize * 2;

    vector<Node*> newTable(newSize, nullptr);

    // 重新哈希所有元素
    for (int i = 0; i < oldSize; i++) {
        Node* curr = table[i];
        while (curr) {
            Node* next = curr->next;
            int newIndex = curr->key % newSize;
            curr->next = newTable[newIndex];
            newTable[newIndex] = curr;
            curr = next;
        }
    }

    table = newTable;
    size = newSize;
}
```

**扩容时机：** 通常当 α > 0.75 时扩容

### STL：unordered_set 和 unordered_map

**unordered_set（无序集合）：**

```cpp
unordered_set<int> s;

// 插入
s.insert(30);
s.insert(10);
s.insert(20);

// 查找
if (s.find(20) != s.end()) {
    cout << "找到" << endl;
}

s.count(10);  // 返回0或1

// 删除
s.erase(10);

// 遍历（无序）
for (int x : s) {
    cout << x << " ";
}

// 其他
s.size();
s.empty();
s.clear();
```

**unordered_map（无序键值对）：**

```cpp
unordered_map<string, int> m;

// 插入
m["Alice"] = 85;
m["Bob"] = 90;

// 访问
cout << m["Alice"] << endl;

// 查找
if (m.find("Bob") != m.end()) {
    cout << "找到" << endl;
}

m.count("Alice");  // 返回0或1

// 删除
m.erase("Charlie");

// 遍历（无序）
for (auto& p : m) {
    cout << p.first << ": " << p.second << endl;
}

// 其他
m.size();
m.empty();
m.clear();
```

### set/map vs unordered_set/map

| 特性   | set/map  | unordered_set/map |
| ------ | -------- | ----------------- |
| 底层   | 红黑树   | 哈希表            |
| 有序性 | 有序     | 无序              |
| 查找   | O(log n) | O(1)平均          |
| 插入   | O(log n) | O(1)平均          |
| 删除   | O(log n) | O(1)平均          |
| 最坏   | O(log n) | O(n)              |

**选择原则：**

- 需要有序 → set/map
- 只需要快速查找 → unordered_set/map
- **大多数情况用 unordered 更快**

### 复杂度

| 操作 | 平均 | 最坏 |
| ---- | ---- | ---- |
| 查找 | O(1) | O(n) |
| 插入 | O(1) | O(n) |
| 删除 | O(1) | O(n) |

---

## 4.2 并查集（Union-Find）

维护元素的**集合归属关系**。

**操作：**

- `find(x)`：x 属于哪个集合？
- `union(x, y)`：合并 x 和 y 所在集合

**应用：**

- 判断图的连通性
- 检测环
- 朋友圈问题

用树表示集合，根节点代表集合 ID。

```
三个集合：{1,2,3}, {4,5}, {6}

树表示：
    1        4      6
   / \       |
  2   3      5

find(2) → 1（2的根是1）
find(5) → 4
```

### 问题场景

假设有以下朋友关系：

- Alice 和 Bob 是朋友
- Bob 和 Charlie 是朋友
- David 和 Eve 是朋友

**问题 1：** Alice 和 Charlie 是朋友吗？（间接朋友也算）
**问题 2：** 一共有几个朋友圈？

**朴素方法：**

- 用图存储，DFS/BFS 判断连通性 → O(V+E)
- 如果有 n 次查询，总复杂度 O(n(V+E))

**能否优化？** → 并查集: 每次查询接近 O(1)

### 基础实现

```cpp
class UnionFind {
private:
    vector<int> parent;

public:
    UnionFind(int n) {
        parent.resize(n);
        for (int i = 0; i < n; i++) {
            parent[i] = i;  // 初始时，每个元素自成集合
        }
    }

    // 查找根节点
    int find(int x) {
        if (parent[x] == x)
            return x;
        return find(parent[x]);
    }

    // 合并两个集合
    void unite(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        if (rootX != rootY) {
            parent[rootX] = rootY;
        }
    }

    // 判断是否连通
    bool connected(int x, int y) {
        return find(x) == find(y);
    }
};
```

**问题：** 树可能变得很高，find 变慢。

```
最坏情况：链状
  4
  |
  3
  |
  2
  |
  1
  |
  0

find(0)需要O(n)时间
```

### 路径压缩

在 find 时，把路径上所有节点直接连到根。

```cpp
int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);  // 路径压缩
    }
    return parent[x];
}
```

**效果：**

```
查找前：
    4
    |
    3
    |
    2
    |
    1
    |
    0

find(0)后：
      4
    / | \ \
   0  1 2 3

所有节点直接连到根
```

### 按秩合并

合并时，把矮的树接到高的树下。

```cpp
class UnionFind {
private:
    vector<int> parent;
    vector<int> rank;  // 树的高度

public:
    UnionFind(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }

    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);  // 路径压缩
        }
        return parent[x];
    }

    void unite(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);

        if (rootX == rootY) return;

        // 按秩合并
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
    }

    bool connected(int x, int y) {
        return find(x) == find(y);
    }
};
```

### 复杂度

两个优化一起用：

| 操作  | 时间    |
| ----- | ------- |
| find  | O(α(n)) |
| union | O(α(n)) |

α(n)是**反阿克曼函数**，增长极慢：

- α(10^80) ≈ 4
- **实际中可认为是 O(1)**

---

# 附录

## 时间复杂度总表

### 线性结构

| 数据结构 | 访问 | 查找 | 插入     | 删除   | 空间 |
| -------- | ---- | ---- | -------- | ------ | ---- |
| 数组     | O(1) | O(n) | O(n)     | O(n)   | O(n) |
| 动态数组 | O(1) | O(n) | O(1)均摊 | O(n)   | O(n) |
| 链表     | O(n) | O(n) | O(1)\*   | O(1)\* | O(n) |
| 栈       | -    | -    | O(1)     | O(1)   | O(n) |
| 队列     | -    | -    | O(1)     | O(1)   | O(n) |

\*已知位置

### 树形结构

| 数据结构 | 查找     | 插入     | 删除     | 空间  | 备注          |
| -------- | -------- | -------- | -------- | ----- | ------------- |
| BST      | O(log n) | O(log n) | O(log n) | O(n)  | 最坏 O(n)     |
| AVL 树   | O(log n) | O(log n) | O(log n) | O(n)  | 严格平衡      |
| 红黑树   | O(log n) | O(log n) | O(log n) | O(n)  | 弱平衡        |
| B/B+树   | O(log n) | O(log n) | O(log n) | O(n)  | 磁盘友好      |
| 堆       | O(n)     | O(log n) | O(log n) | O(n)  | 查看堆顶 O(1) |
| 哈夫曼树 | -        | -        | -        | O(n)  | 编码用        |
| 线段树   | O(log n) | O(log n) | -        | O(4n) | 区间操作      |
| 树状数组 | O(log n) | O(log n) | -        | O(n)  | 区间和        |

### 图

| 存储方式 | 空间   | 判断边 | 获取邻居 |
| -------- | ------ | ------ | -------- |
| 邻接矩阵 | O(V²)  | O(1)   | O(V)     |
| 邻接表   | O(V+E) | O(度)  | O(度)    |

| 遍历方式 | 时间(邻接表) | 时间(邻接矩阵) | 空间 |
| -------- | ------------ | -------------- | ---- |
| DFS      | O(V+E)       | O(V²)          | O(V) |
| BFS      | O(V+E)       | O(V²)          | O(V) |

### 特殊结构

| 数据结构 | 查找         | 插入         | 删除     | 空间 |
| -------- | ------------ | ------------ | -------- | ---- |
| 哈希表   | O(1)平均     | O(1)平均     | O(1)平均 | O(n) |
| 并查集   | O(α(n))≈O(1) | O(α(n))≈O(1) | -        | O(n) |

---

## 本讲义的范围

**聚焦数据结构**，不涉及算法：

### ✅ 包含的内容（数据结构课）

- 数据的**存储方式**
- 基本的**增删改查**操作
- **遍历**方法（DFS/BFS）

> 本讲义中的“遍历、构造、维护”等过程，
> 均用于说明数据结构本身的组织方式与基本操作。
> 不将其作为“解决具体问题的算法”来讨论。

### ❌ 不包含的内容（算法课）

- 基于数据结构解决具体问题的算法设计
- 最短路径、最优解、判定类问题
- 图算法：Dijkstra、Floyd、最短路径、最小生成树、拓扑排序
- 字符串算法：KMP、AC 自动机
- 高级数据结构：跳表、布隆过滤器、伸展树

### 边界示例

- ✅ 图的邻接表存储 → 数据结构
- ✅ 图的 DFS/BFS 遍历 → 数据结构（基本访问）
- ❌ Dijkstra 最短路径 → 算法课
