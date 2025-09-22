const widthBot = "12";
const height = "8"

// Calculates the ratios of the trapezoid for dice icon.
const widthTopLeft = widthBot / 2.5;
const widthTopRight = (widthBot * 2) / 3.4;
const points = `${widthTopLeft} 0, ${widthTopRight} 0, ${widthBot} ${height}, 0 ${height}`;
const viewBox = `0 0 ${widthBot} ${height}`;

const textX = widthBot / 2;
const textY = "5";


class DiceOneColor extends HTMLElement {
    constructor() {
        super();

        let color = this.getAttribute('c') || 'white';
        const number = this.getAttribute('n') || '';
        const plus = this.hasAttribute('p');

        if (color === 'blue') {
            color = '#1096d4'
        }

        this.innerHTML = `
      <div class="trapezoid-wrapper">
        <svg class="trapezoid" width=${widthBot} height=${height} viewBox="${viewBox}">
          <!-- trapezoid shape with border -->
          <polygon 
            points="${points}"
            fill="${color}" 
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

class DiceTwoColors extends HTMLElement {
    constructor() {
        super();

        let color_1 = this.getAttribute('c1') || 'white';
        let color_2 = this.getAttribute('c2') || 'white';
        const number = this.getAttribute('n') || '';
        const plus = this.hasAttribute('p');

        if (color_1 === 'blue') {
            color_1 = '#1096d4'
        }
        if (color_2 === 'blue') {
            color_2 = '#1096d4'
        }

        const gradientId = `twoColorGradient-${plus}-${color_1}-${color_2}`;

        this.innerHTML = `
      <div class="trapezoid-wrapper ${plus ? 'has-plus' : ''}">
        <svg class="trapezoid" width=${widthBot} height=${height} viewBox="${viewBox}">
          <defs>
            <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="${color_1}" />
              <stop offset="48%" stop-color="${color_1}" />
              <stop offset="49%" stop-color="black" />
              <stop offset="50%" stop-color="black" />
              <stop offset="52%" stop-color="${color_2}" />
              <stop offset="100%" stop-color="${color_2}" />
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
      </div>
    `;
    }
}

customElements.define('dice-one', DiceOneColor);
customElements.define('dice-two', DiceTwoColors);