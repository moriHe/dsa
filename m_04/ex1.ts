/*
1) Queue with 2 stacks
Implement a queue with 2 stacks, so that each queue operation takes a constant, amortized number of stack operations
*/

function queueWithTwoStacks() {
    let enqueStack: number[] = [];
    let dequeueStack = [];

    return {
        enque: (val: number) => {
            enqueStack.push(val);
        },
        dequeue: () => {
            if (dequeueStack.length == 0) {
                while (enqueStack.length > 0) {
                    dequeueStack.push(enqueStack.pop())

                }
            }
            return dequeueStack.pop();
        }
    }
}

/*
2) Stack with max
Create a data structure that supports the following two subjects efficiently:
- stack operations (push / pop)
- return-the-maximum-operation

For comparability, assume that the elements are real numbers
*/

function stackWithMax() {
    let stack: number[] = []
    let maxHistory: number[] = [];
    return {
        push: (val: number) => {
            stack.push(val);
            if (maxHistory.length === 0) {
                maxHistory.push(val);
            } else {
                if (maxHistory[maxHistory.length - 1] <= val) {
                    maxHistory.push(val);
                }
            }
        },
        pop: () => {
            let val = stack.pop();
            if (maxHistory[maxHistory.length - 1] === val) {
                maxHistory.pop();
            }
            return val;
            
        },
        max: (): number | undefined => {
            return maxHistory.at(-1);
        }
    }
}

/*
3) Java Generics
Explain, why Java prohibits the creation of generic arrays
*/
/*
It prohibits the genration of generic array, because the generic removes types at the compilation step.
However, arrays check the type at runtime, which would cause an error.
*/