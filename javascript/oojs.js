// Class constructorral
class UIComponent {
  constructor(tagName, className) {
    this.element = document.createElement(tagName);
    if (className) {
      this.element.className = className;
    }
  }

  // Metódus a HTML-be illesztéshez (alapból a body végére)
  mount() {
    document.body.appendChild(this.element);
  }
}

/**
 * Származtatott osztály (Számológép alkalmazás)
 * Demonstrálja az extends (Öröklődés)-t és a super()(Meghívja a szülő konstruktorát) hívást.
 */
class CalculatorApp extends UIComponent {
  constructor() {
    // Ősosztály konstruktorának hívása
    super('div', 'calc-container');

    this.currentValue = '0';
    this.previousValue = null;
    this.operator = null;

    this.initUI();
  }

  // Inicializálja a grafikus felületet
  initUI() {
    // Kijelző
    this.display = document.createElement('div');
    this.display.className = 'calc-display';
    this.display.textContent = this.currentValue;
    this.element.appendChild(this.display);

    // Gombok gridje
    const grid = document.createElement('div');
    grid.className = 'calc-grid';

    const buttons = [
      '7', '8', '9', '/',
      '4', '5', '6', '*',
      '1', '2', '3', '-',
      '0', '.', '=', '+'
    ];

    // Törlés gomb (Clear)
    const clearBtn = document.createElement('button');
    clearBtn.className = 'calc-btn clear';
    clearBtn.textContent = 'C';
    clearBtn.onclick = () => this.clear();
    grid.appendChild(clearBtn);

    // Többi gomb
    buttons.forEach(label => {
      const btn = document.createElement('button');
      btn.textContent = label;
      btn.className = 'calc-btn';

      if (['/', '*', '-', '+'].includes(label)) {
        btn.classList.add('operator');
        btn.onclick = () => this.handleOperator(label);
      } else if (label === '=') {
        btn.classList.add('equals');
        btn.onclick = () => this.calculate();
      } else {
        btn.onclick = () => this.handleNumber(label);
      }

      grid.appendChild(btn);
    });

    this.element.appendChild(grid);
  }

  // Frissíti a kijelzőt
  updateDisplay() {
    this.display.textContent = this.currentValue;
  }

  // Szám gombok kezelése
  handleNumber(num) {
    if (this.currentValue === '0') { //nem csak értéket néz hanem típust is
      this.currentValue = num;
    } else {
      this.currentValue += num;
    }
    this.updateDisplay();
  }

  // Operátorok kezelése
  handleOperator(op) {
    if (this.operator !== null) {
      this.calculate();
    }
    this.previousValue = this.currentValue;
    this.currentValue = '0';
    this.operator = op;
  }

  // Számítás elvégzése
  calculate() {
    if (this.operator === null || this.previousValue === null) return;

    let result;
    const prev = parseFloat(this.previousValue);
    const current = parseFloat(this.currentValue);

    switch (this.operator) {
      case '+': result = prev + current; break;
      case '-': result = prev - current; break;
      case '*': result = prev * current; break;
      case '/':
        result = current === 0 ? 'Hiba' : prev / current;
        break;
    }

    this.currentValue = String(result);
    this.operator = null;
    this.previousValue = null;
    this.updateDisplay();
  }

  // Törlés
  clear() {
    this.currentValue = '0';
    this.operator = null;
    this.previousValue = null;
    this.updateDisplay();
  }

  // Felülírjuk az ős mount metódusát, hogy a megfelelő konténerbe kerüljön, mert alapból a body végére rakja
  mount() {
    const wrapper = document.getElementById('app-wrapper');
    if (wrapper) {
      wrapper.appendChild(this.element);
    } else {
      super.mount(); // Ha nincs wrapper, az ős metódusát használjuk fallbackként
    }
  }
}

// OOJS Alkalmazás inicializálása és megjelenítése
const app = new CalculatorApp();
app.mount();
