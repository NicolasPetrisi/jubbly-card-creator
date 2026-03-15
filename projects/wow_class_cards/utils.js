const widthBot = "12";
const height = "8"

// Calculates the ratios of the trapezoid for dice icon.
const widthTopLeft = widthBot / 2.5;
const widthTopRight = (widthBot * 2) / 3.4;
const points = `${widthTopLeft} 0, ${widthTopRight} 0, ${widthBot} ${height}, 0 ${height}`;
const viewBox = `0 0 ${widthBot} ${height}`;

const textX = widthBot / 2;
const textY = "5";

// Defines the color codings.
const colorMap = new Map();
colorMap.set('bl', "black");
colorMap.set("b", "#1096d4");
colorMap.set("r", "red");
colorMap.set("g", "green");

class Dice extends HTMLElement {
    constructor() {
        super();

        let colors = [];

        this.extractColors('r', colors);
        this.extractColors('g', colors);
        this.extractColors('b', colors);

        if (colors.length > 2) {
            throw new Error("At most 2 colors at the same time are supported! Found attributes: " + this.getAttributeNames());
        } else if (colors.length === 0) {
            // Default to black if no color is given to the dice.
            colors.push(colorMap.get('bl'));
        }

        const number = this.getAttribute('n') || '';
        const plus = this.hasAttribute('p');

        if (colors.length < 2) {
            this.innerHTML = `
                <div class="trapezoid-wrapper">
                  <svg class="trapezoid" width=${widthBot} height=${height} viewBox="${viewBox}">
                    <!-- trapezoid shape with border -->
                    <polygon 
                      points="${points}"
                      fill="${colors[0]}" 
                      stroke="black" 
                      stroke-width="0.5"/>
                    <!-- centered number -->
                    <text 
                      x="${textX}" 
                      y="${textY}"  
                      text-anchor="middle" 
                      dominant-baseline="middle" 
                      class="trapezoid-num">${number}</text>
                  </svg>
                  ${plus ? `<div class="trapezoid-plus">+</div>` : ''}
                </div>`;

        } else {

            const gradientId = `twoColorGradient-${plus}-${colors[0]}-${colors[1]}`;

            this.innerHTML = `
                <div class="trapezoid-wrapper ${plus ? 'has-plus' : ''}">
                  <svg class="trapezoid" width=${widthBot} height=${height} viewBox="${viewBox}">
                    <defs>
                      <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="${colors[0]}" />
                        <stop offset="48%" stop-color="${colors[0]}" />
                        <stop offset="49%" stop-color="black" />
                        <stop offset="50%" stop-color="black" />
                        <stop offset="52%" stop-color="${colors[1]}" />
                        <stop offset="100%" stop-color="${colors[1]}" />
                      </linearGradient>
                    </defs>
                    <!-- trapezoid shape with border -->
                    <polygon 
                      points="${points}"
                      fill="url(#${gradientId})" 
                      stroke="black" 
                      stroke-width="0.5"/>
                    <!-- centered number -->
                    <text 
                      x="${textX}" 
                      y="${textY}" 
                      text-anchor="middle" 
                      dominant-baseline="middle" 
                      class="trapezoid-num">${number}</text>
                  </svg>
                  ${plus ? `<div class="trapezoid-plus">+</div>` : ''}
                </div>`;
        }

    }

    extractColors(colorQualifier, colors) {
        if (this.hasAttribute(colorQualifier)) {
            colors.push(colorMap.get(colorQualifier));
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    customElements.define('dice-', Dice);
});

/**
 * Returns a padding string between 35 and 10 based on the text length (after filtering out HTML elements), where 35
 * is for the shortest texts and 10 for the longest. Anything with length 40 and down will get 35 padding, and anything
 * with more than 40 length will get a quadratic decreasing value from 35 down to a minimum of 10.
 *
 * @param text The text to get the number based on the length of.
 * @param hasUniqueType If the description will have a "unique type" banner above it, meaning there will be additional
 * padding already existing.
 * @returns {string} The padding string to be used for the given text.
 */
window.descriptionTopPadding = function descriptionTopPadding(text = '', hasUniqueType) {
    // To compensate for the fact that double newline (i.e, leaving a blank line) functionally results in as if roughly
    // 30 characters were used. A single newline is then estimated to be 1/5 of that.
    const withDoubleNewlines = text.replace(/<br><br>/g, 'a'.repeat(25));
    const withNewlines = withDoubleNewlines.replace(/<br>/g, 'a'.repeat(5));
    const textOnly = withNewlines.replace(/<[^>]*>/g, '');

    const len = textOnly.trim().length;

    const reductionThreshold = 10;
    const minimumPadding = hasUniqueType ? 0 : 5;

    // This is to compensate for the extra "padding" the unique type banner
    // above gives in addition to the padding we're calculating here.
    const uniqueTypeCompensation = hasUniqueType ? 10 : 0;

    if (len <= reductionThreshold) {
        return `${35 - uniqueTypeCompensation}px`;
    }

    // The function below has roughly these points of reference:
    // - 10 len -> 35 padding
    // - 50 len -> 33 padding
    // - 100 len -> 25 padding
    // - 150 len -> 10 padding
    // - 177 len -> 10 padding (which is the minimum)
    const calculatedValue = 35 - (Math.pow(len - reductionThreshold, 2) / 1000);

    return `${Math.round(Math.max(minimumPadding, calculatedValue - uniqueTypeCompensation))}px`;
};



