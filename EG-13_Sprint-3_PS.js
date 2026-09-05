/**
 * 01. Contains Duplicate
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  return new Set(nums).size !== nums.length;
};

/**
 * 02. Move Zeroes
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let insertPosition = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[insertPosition] = nums[i];
      insertPosition++;
    }
  }

  while (insertPosition < nums.length) {
    nums[insertPosition] = 0;
    insertPosition++;
  }
};

/**
 * 03. Valid Anagram
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  const characterCount = new Map();

  for (const character of s) {
    characterCount.set(character, (characterCount.get(character) || 0) + 1);
  }

  for (const character of t) {
    const count = characterCount.get(character);

    if (!count) return false;

    if (count === 1) {
      characterCount.delete(character);
    } else {
      characterCount.set(character, count - 1);
    }
  }

  return true;
};

/**
 * 04. Ransom Note
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  const availableCharacters = new Map();

  for (const character of magazine) {
    availableCharacters.set(
      character,
      (availableCharacters.get(character) || 0) + 1
    );
  }

  for (const character of ransomNote) {
    const count = availableCharacters.get(character);

    if (!count) return false;

    availableCharacters.set(character, count - 1);
  }

  return true;
};

/**
 * 05. Majority Element
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let candidate = nums[0];
  let count = 0;

  for (const number of nums) {
    if (count === 0) candidate = number;
    count += number === candidate ? 1 : -1;
  }

  return candidate;
};

/**
 * 06. 3Sum
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    if (nums[i] > 0) break;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;

        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
};

/**
 * 07. Subarray Sum Equals K
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  const prefixFrequency = new Map([[0, 1]]);
  let prefixSum = 0;
  let totalSubarrays = 0;

  for (const number of nums) {
    prefixSum += number;
    totalSubarrays += prefixFrequency.get(prefixSum - k) || 0;
    prefixFrequency.set(prefixSum, (prefixFrequency.get(prefixSum) || 0) + 1);
  }

  return totalSubarrays;
};

/**
 * 08. Top K Frequent Elements
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const frequency = new Map();

  for (const number of nums) {
    frequency.set(number, (frequency.get(number) || 0) + 1);
  }

  const buckets = Array.from({ length: nums.length + 1 }, () => []);

  for (const [number, count] of frequency) {
    buckets[count].push(number);
  }

  const result = [];

  for (let count = buckets.length - 1; count >= 0; count--) {
    for (const number of buckets[count]) {
      result.push(number);
      if (result.length === k) return result;
    }
  }

  return result;
};

/**
 * 09. Longest Consecutive Sequence
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  const numbers = new Set(nums);
  let longestLength = 0;

  for (const number of numbers) {
    if (!numbers.has(number - 1)) {
      let currentNumber = number;
      let currentLength = 1;

      while (numbers.has(currentNumber + 1)) {
        currentNumber++;
        currentLength++;
      }

      longestLength = Math.max(longestLength, currentLength);
    }
  }

  return longestLength;
};

/**
 * 10. Sort Colors
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  let low = 0;
  let current = 0;
  let high = nums.length - 1;

  while (current <= high) {
    if (nums[current] === 0) {
      [nums[low], nums[current]] = [nums[current], nums[low]];
      low++;
      current++;
    } else if (nums[current] === 2) {
      [nums[current], nums[high]] = [nums[high], nums[current]];
      high--;
    } else {
      current++;
    }
  }
};