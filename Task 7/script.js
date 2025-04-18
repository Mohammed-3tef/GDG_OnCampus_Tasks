// ------------------- PROBLEM A : Summation time

function summationTime(nums){
    let result = 0;
    nums.forEach((item) => {
        result += item;
    });
    return Math.abs(result);
}

// console.log(summationTime([7, 2, 1, 3]));
// console.log(summationTime([-1, 2, -3]));

// ------------------- PROBLEM B : Searching

function searching(nums, element){
    return nums.indexOf(element);
}

// console.log(searching([3, 0, 1], 0));
// console.log(searching([1, 3, 0, 4, 5], 10));
// console.log(searching([2, 3, 2, 1], 2));

// ------------------- PROBLEM C : Replacement

function replacement(nums){
    let result = [];
    nums.forEach((item) => {
        if (item > 0) result.push(1);
        else if (item < 0) result.push(2);
        else result.push(0);
    })
    return result;
}

// console.log(replacement([1, -2, 0, 3, 4]))

// ------------------- PROBLEM D : Positions in array

function positionsInArray(nums){
    nums.forEach((item, index) => {
        if (item <= 10) {
            console.log(`A[${index}] = ${item}`)
        }
    })
}

// positionsInArray([1, 2, 100, 0, 30]);

// ------------------- PROBLEM E : Array Editing

function arrayEditing(nums, element){
    const temp = nums.filter((item) => {
        return item <= 100;
    })
    
    const result = temp.filter((item, index) => {
        return index < element;
    })
    
    return result;
}

// console.log(arrayEditing([5, 200, 15, 300, 8, 100, 55], 3))

// ------------------- PROBLEM F : Filter and Modify

function filterAndModify(nums){
    let result = nums.filter((item) => {
        return item %2 == 0;
    })
    
    result.forEach((_, index) => {
        result[index] *= 2;
    })
    
    return result;
}

// console.log(filterAndModify([3, 4, 7, 10, 9, 2]))