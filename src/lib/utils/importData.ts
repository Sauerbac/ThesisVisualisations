import * as d3 from "d3";




// export function getData(file: string) {
//     return d3.csv(file)
//         .then(data => {
//             // Process the data here  
//             let all_weights_per_run = d3.group(data, d => d.identity)
//             // all_weights_per_run.forEach(e => console.log(e))
//             return all_weights_per_run.values().next().value
//         })
//         .catch(error => {
//             console.error("Error reading CSV file:", error);
//         });

// }

export async function getData(file: string) {
    const data = await d3.csv(file);

    // Process the data here  
    const all_weights_per_run = d3.group(data, d => d.identity);

    // // Return the first group  
    // return all_weights_per_run.values();
    let all_weights_per_step = new Array(292)

    for (let i = 0; i <= 291; i += 1) {
        let single_step_weights = new Array(729)
        for (const [index, weights_per_run] of all_weights_per_run.entries()) {
            single_step_weights[index] = weights_per_run[i]
        }
        all_weights_per_step[i] = single_step_weights
    }

    return all_weights_per_step
}


export function getColorHex(value: number) {
    let min = 284313662.9046873
    let max = 5334595499.027434
    const colorScale = d3.scaleSequentialLog()
        .domain([min, max])
        .interpolator(d3.interpolateViridis);

    return colorScale(value);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export function getColorRGB(value: number) {
    let min = 284313662.9046873
    let max = 5334595499.027434
    const colorScale = d3.scaleSequentialLog()
        .domain([min, max])
        .interpolator(d3.interpolateViridis);

    return hexToRgb(colorScale(value));
}