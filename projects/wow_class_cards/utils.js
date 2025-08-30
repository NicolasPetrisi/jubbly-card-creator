import './card.scss';


class DiceOneColor extends HTMLElement {
    constructor() {
        super();

        const color = this.getAttribute('c') || 'white';
        const number = this.getAttribute('n') || '';
        const plus = this.getAttribute('p') || 'n';

        this.innerHTML = `
           <div class="trapezoid-wrapper ${plus === 'y' ? 'has-plus' : ''}">
             <div class="trapezoid-container">
               <div class="trapezoid" style="background: ${color};">
                 <div class="trapezoid-num">${number}</div>
               </div>
             </div>
             ${plus === 'y' ? `<div class="trapezoid-plus">+</div>` : ''}
           </div>`;
    }
}

class DiceTwoColors extends HTMLElement {
    constructor() {
        super();

        const color_1 = this.getAttribute('c1') || 'white';
        const color_2 = this.getAttribute('c2') || 'white';
        const number = this.getAttribute('n') || '';

        this.innerHTML = `
      <div class="trapezoid-container">
      <!-- These gradient numbers are a bit skewed, but it makes it more centered in print mode -->
        <div class="trapezoid" style="
          background: linear-gradient(to right, 
            ${color_1} 0%, 
            ${color_1} 52%, 
            black 53%, 
            black 55%, 
            ${color_2} 56%, 
            ${color_2} 100%);"> 
          <div class="trapezoid-num">${number}</div>
        </div>
      </div>
    `;
    }
}

customElements.define('dice-one', DiceOneColor);
customElements.define('dice-two', DiceTwoColors);