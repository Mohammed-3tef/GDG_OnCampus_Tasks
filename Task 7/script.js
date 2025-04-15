// ---- PROBLEM 1: https://leetcode.com/problems/to-be-or-not-to-be/?envType=study-plan-v2&envId=30-days-of-javascript

/*
 * @param {string} val
 * @return {Object}
*/
var expect = function(val) {
    return {
        toBe: (val2) => {
            if (val !== val2) {throw new Error("Not Equal");}
            else {return true;}
        },
        notToBe: (val2) => {
            if (val === val2) {throw new Error("Equal");}
            else {return true;}
        }
    }
};

// ---- PROBLEM 2: https://leetcode.com/problems/counter-ii/?envType=study-plan-v2&envId=30-days-of-javascript

/*
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
*/
var createCounter = function(init) {
    var con = init;
    return {
        increment: () => {
            return ++init;
        },
        decrement: () => {
            return --init;
        },
        reset: () => {
            init = con;
            return init;
        }
    }
};

// ---- PROBLEM 3: https://leetcode.com/problems/remove-duplicates-from-sorted-array/?envType=study-plan-v2&envId=top-interview-150

/*
 * @param {number[]} nums
 * @return {number}
*/
var removeDuplicates = function(nums) {
    if (nums.length === 0) return 0;

    let j = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[j] !== nums[i]) nums[++j] = nums[i];
    }
    return j + 1;
}

// ---- PROBLEM 4: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/?envType=study-plan-v2&envId=top-interview-150

/*
 * @param {number[]} prices
 * @return {number}
*/
var maxProfit = function(prices) {
    let buy = prices[0];
    let profit = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < buy) {
            buy = prices[i];
        } else if (prices[i] - buy > profit) {
            profit = prices[i] - buy;
        }
    }
    return profit;
};

// ---- PROBLEM 5: https://leetcode.com/problems/majority-element/?envType=study-plan-v2&envId=top-interview-150

/*
 * @param {number[]} nums
 * @return {number}
*/
var majorityElement = function(nums) {
    let result = nums[0]
    let count = 0

    for (let num of nums) {
        if (count === 0) result = num;
        count += (num === result ? 1 : -1);
    }
    return result;
};