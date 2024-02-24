document.addEventListener("DOMContentLoaded", function () {
    generateBars();
});

function generateBars() {
    const arrayContainer = document.getElementById("arrayContainer");
    arrayContainer.innerHTML = '';

    const arrayLength = 30; // Adjust the array length as needed
    const dataArray = generateRandomArray(arrayLength);

    for (let i = 0; i < dataArray.length; i++) {
        const barHeight = dataArray[i];

        const bar = document.createElement("div");
        bar.style.height = `${barHeight}px`;
        bar.classList.add("bar");

        arrayContainer.appendChild(bar);
    }
}

async function visualizeBubbleSort() {
    const bars = document.querySelectorAll(".bar");

    for (let i = 0; i < bars.length - 1; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            await visualizeComparison(bars[j], bars[j + 1]);
            await visualizeSwap(bars[j], bars[j + 1]);
        }
    }
}

async function visualizeSelectionSort() {
    const bars = document.querySelectorAll(".bar");

    for (let i = 0; i < bars.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < bars.length; j++) {
            await visualizeComparison(bars[j], bars[minIndex]);
            if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
                minIndex = j;
            }
        }
        await visualizeSwap(bars[i], bars[minIndex]);
    }
}

async function visualizeInsertionSort() {
    const bars = document.querySelectorAll(".bar");

    for (let i = 1; i < bars.length; i++) {
        const key = parseInt(bars[i].style.height);
        let j = i - 1;

        while (j >= 0 && parseInt(bars[j].style.height) > key) {
            await visualizeComparison(bars[j], bars[i]);
            bars[j + 1].style.height = bars[j].style.height;
            j = j - 1;
        }

        bars[j + 1].style.height = `${key}px`;
        await new Promise(resolve => setTimeout(resolve, 300)); // Delay for visualization
    }
}

async function visualizeComparison(bar1, bar2) {
    // Highlight bars being compared
    bar1.style.backgroundColor = "#e74c3c";
    bar2.style.backgroundColor = "#e74c3c";

    // Wait for a short time to visualize the comparison
    await new Promise(resolve => setTimeout(resolve, 300)); // Adjust the delay as needed

    // Reset bar colors
    bar1.style.backgroundColor = "darkgoldenrod";
    bar2.style.backgroundColor = "darkgoldenrod";
}

async function visualizeSwap(bar1, bar2) {
    const height1 = parseInt(bar1.style.height);
    const height2 = parseInt(bar2.style.height);

    // Swap heights
    bar1.style.height = `${height2}px`;
    bar2.style.height = `${height1}px`;

    // Wait for a short time to visualize the swap
    await new Promise(resolve => setTimeout(resolve, 100)); // Adjust the delay as needed
}

function generateRandomArray(length) {
    const randomArray = [];
    for (let i = 0; i < length; i++) {
        randomArray.push(Math.floor(Math.random() * 500) + 50); // Adjust the range as needed
    }
    return randomArray;
}