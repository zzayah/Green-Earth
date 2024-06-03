const { createCanvas } = require('canvas');
const fs = require('fs');

const colors = {
    solar: '#f4ff00', // Yellow
    hydro: '#009fff', // Blue
    wind: '#dfdfdf', // Light Gray
    geothermal: '#ffa63d', // Light Red
    'oil-gas': '#000000', // Dark Gray
    gray: '#808080', // Gray
    green: '#008000', // Green
    default: '#00ff00' // Default color for any new green energy sources
};

function drawSegment(ctx, centerX, centerY, radius, startAngle, endAngle, lineWidth, color) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
}

function calculateTotalPercentage(energySources) {
    let totalPercentage = 0;
    for (const source of energySources) {
        totalPercentage += source.percent || 0;
    }
    return totalPercentage;
}

function calculateGreenEnergyPercentage(energySources) {
    let totalPercentage = 0;
    for (const source of energySources) {
        if (source.name !== 'oil-gas') {
            totalPercentage += source.percent || 0;
        }
    }
    return totalPercentage;
}

function generateSegmentedDial(params) {
    const width = 300; // canvas width
    const height = 300; // canvas height
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 100;
    const lineWidth = 30;
    const borderSize = 5;

    const combineParam = params.find(param => param.name === 'combine');
    const combine = combineParam ? combineParam.value : false;

    const energySources = params.filter(param => param.name !== 'combine');
    let greenEnergyPercentage = 0;

    let currentAngle = -Math.PI / 2;
    for (const source of energySources) {
        const segmentAngle = (source.percent / 100) * 2 * Math.PI;

        const color = colors[source.name] || colors.default;

        if (combine && source.name !== 'oil-gas') {
            drawSegment(ctx, centerX, centerY, radius, currentAngle, currentAngle + segmentAngle, lineWidth, colors.green);
        } else if (segmentAngle !== 0) {
            drawSegment(ctx, centerX, centerY, radius, currentAngle, currentAngle + segmentAngle, lineWidth, color);
        }

        currentAngle += segmentAngle;

        if (currentAngle < 2 * Math.PI) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle);
            ctx.lineWidth = borderSize;
            ctx.strokeStyle = '#000000';
            ctx.stroke();
            ctx.closePath();
        }

        if (source.name !== 'oil-gas') {
            greenEnergyPercentage += source.percent;
        }
    }

    ctx.font = 'bold 50px Arial';
    if (greenEnergyPercentage > 50) {
        ctx.fillStyle = '#008000';
    } else {
        ctx.fillStyle = '#FF0000';
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${greenEnergyPercentage}%`, centerX, centerY);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('segmentedDial.png', buffer);
    console.log('Segmented dial image saved as segmentedDial.png');
}

generateSegmentedDial([
    { name: 'oil-gas', percent: 15 },
    { name: 'hydro', percent: 10 },
    { name: 'solar', percent: 50 },
    { name: 'wind', percent: 20 },
    { name: 'geothermal', percent: 5 },
    { name: 'combine', value: false }
]);
