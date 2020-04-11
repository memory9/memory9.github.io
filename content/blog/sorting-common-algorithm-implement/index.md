---
title: 常见的排序算法及其实现
date: "2020-04-10"
description: 本文记录常见的排序算法及其实现思路与代码。
---

本文记录常见的排序算法及其实现思路与代码。

## 基本的排序算法

### 冒泡排序

  **基本思想**

  给定一个数组，把数组里的元素都倒入水池中，这些元素通过相互之间的比较，按照大小顺序一个个像气泡一样浮出水面。

  **实现思路**

  每一轮都从杂乱无章的数组头部开始，每两个元素比较大小并进行交换，直到这一轮当中最大的（最小的）元素被放置在数组的尾部，然后不断重复这个过程，直到所有的元素都排好位置。

  **代码**

  ```js
    // 假设从小到大排序
    function bubbleSort(arr) {
      const len = arr.length
      for (let i = 0; i < len; i++) {
        for (j = 0; j < len - 1 - i; j++) {
          if (arr[j] > arr[j+1]) {
            // 如果前一个元素大于后一个元素，就交换
            [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
          }
        }
      }

      return arr
    }

    bubbleSort([2, 1, 7, 9, 5, 8]) // [1, 2, 5, 7, 8, 9]
  ```

  **算法分析**

  时间复杂度：O(n2)

  空间复杂度：O(1)

### 插入排序

  **基本思想**

  不断的将未排好序的数插入到已经排好序的部分

  **特点**

  对于插入排序，经过每一轮排序之后，数组**前端**的数都是排好序

  **代码**

  ```js
    function insertSort(arr) {
      const len = arr.length
      // 认为数组的第一项已经排好序了，所以从第二项开始进行遍历
      for (let i = 1, j, current; i < len; i++) {
        // 把当前 i 指向的值用 current 保存
        current = arr[i]
        for (j = i - 1; j >= 0 && arr[j] > current; j--) {
          // j 内循环，和 current 值比较，若 j 所指向的值比 current 值大，则该数右移一位
          arr[j+1] = arr[j]
        }

        // current 值应该插入的位置
        arr[j+1] = current
      }

      return arr
    }

    insertSort([2, 1, 7, 9, 5, 8]) // [1, 2, 5, 7, 8, 9]
  ```

  **算法分析**

  时间复杂度：O(n2)

  空间复杂度：O(1)

## 常考的排序算法

### 归并排序

  **基本思想**

  核心是**分治**，就是把一个复杂的问题分成两个或多个相同或相似的子问题，然后把子问题分成更小的子问题，直到子问题可以简单的直接求解，最原问题的解就是子问题解的合并。

  **实现**

  一开始先把数组从中间划分成两个子数组，一直递归地把子数组划分成更小的子数组，直到子数组里面只有一个元素，才开始排序。

  排序的方法就是按照大小顺序，合并两个元素，接着按照递归的返回顺序，不断地合并排好序的子数组，直到最后把整个数组的顺序排好。

  **代码**

  ```js
  function merge(left, right) {
    const result = []

    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        result.push(left.shift())
      } else {
        result.push(right.shift())
      }
    }

    while (left.length) {
      result.push(left.shift())
    }

    while (right.length) {
      result.push(right.shift())
    }

    return result
  }

  function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr
    }

    const pivotIndex = Math.floor(arr.length / 2)
    const left = arr.slice(0, pivotIndex)
    const right = arr.slice(pivotIndex)

    return merge(mergeSort(left), mergeSort(right))
  }

  mergeSort([2, 1, 7, 9, 5, 8]) // [1, 2, 5, 7, 8, 9]
  ```

  **算法分析**

  时间复杂度：O(nlogn)

  空间复杂度：O(n)

### 快速排序

  **基本思想**

  分治思想，自上而下

  **实现**

  把原始数组筛选成较小和较大的两个子数组，然后递归地排序两个子数组

  **代码**

  ```js
  function quickSort(arr) {
    if (arr.length <= 1) {
      return arr
    }

    const midIndex = Math.floor(arr.length / 2)
    const midValue = arr.splice(midIndex, 1)[0]
    const left = [], right = []
    arr.forEach((v) => {
      if (v <= midValue) {
        left.push(v)
      } else {
        right.push(v)
      }
    })

    return quickSort(left).concat(midValue, quickSort(right))
  }

  quickSort([2, 1, 7, 9, 5, 8]) // [1, 2, 5, 7, 8, 9]
  ```

  **算法分析**

  时间复杂度：O(nlogn)

  空间复杂度：O(logn)

### 拓扑排序

## 其他的排序算法

### 堆排序

### 桶排序

## 总结
