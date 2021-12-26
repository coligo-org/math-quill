import CUSTOM_OPERATORS from './operators';

window.mathquill4quill = deps => {
  const dependencies = deps || {};

  const Quill = dependencies.Quill || window.Quill;
  const MathQuill = dependencies.MathQuill || window.MathQuill;
  const katex = dependencies.katex || window.katex;
  const localStorage = dependencies.localStorage || window.localStorage;

  function setCacheItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      // eslint-disable-line no-empty
    }
  }

  function getCacheItem(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return '';
    }
  }

  function removeCacheItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      // eslint-disable-line no-empty
    }
  }

  function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  function isOperatorCommand(operator) {
    return /^\\[A-Za-z]+$/.test(operator);
  }

  function enableMathQuillFormulaAuthoring(quill, config) {
    const options = config || {};
    function areAllDependenciesMet() {
      if (!Quill) {
        console.log('Quill.js not loaded'); // eslint-disable-line no-console
        return false;
      }

      if (!MathQuill) {
        console.log('MathQuill.js not loaded'); // eslint-disable-line no-console
        return false;
      }

      if (!katex) {
        console.log('katex.js not loaded'); // eslint-disable-line no-console
        return false;
      }

      if (!quill.options.modules.formula) {
        console.log('Formula module not enabled'); // eslint-disable-line no-console
        return false;
      }

      if (!MutationObserver) {
        console.log('MutationObserver not defined'); // eslint-disable-line no-console
        return false;
      }

      return true;
    }

    if (!areAllDependenciesMet()) {
      return;
    }

    function fetchHistoryList(key) {
      try {
        return JSON.parse(localStorage.getItem(key)) || [];
      } catch (e) {
        return [];
      }
    }

    const historyCacheKey =
      options.historyCacheKey || '__mathquill4quill_historylist_cache__';
    const historyList = fetchHistoryList(historyCacheKey);
    const historySize = options.historySize || 10;
    const displayHistory = options.displayHistory || false;

    function addItemToHistoryList(key) {
      const item = getCacheItem(key);
      if (item && item.length > 0) {
        const index = historyList.indexOf(item);
        if (index !== -1) {
          historyList.splice(index, 1);
        }
        historyList.unshift(item);
        if (historyList.length > historySize) historyList.pop();
        try {
          localStorage.setItem(historyCacheKey, JSON.stringify(historyList));
        } catch (e) {
          // eslint-disable-line no-empty
        }
      }
    }

    function getTooltip() {
      return quill.container.getElementsByClassName('ql-tooltip')[0];
    }

    function getSaveButton() {
      const tooltip = getTooltip();
      return tooltip.getElementsByClassName('ql-action')[0];
    }

    function getLatexInput() {
      const tooltip = getTooltip();
      return tooltip.getElementsByTagName('input')[0];
    }

    function newMathquillInput() {
      const autofocus = options.autofocus == null ? true : options.autofocus;
      const mathQuillConfig =
        options.mathQuillConfig != null ? options.mathQuillConfig : {};
      const cacheKey = options.cacheKey || '__mathquill4quill_cache__';
      let mqInput = null;
      let mqField = null;
      let latexInputStyle = null;

      function applyMathquillInputStyles(inputField) {
        inputField.setAttribute('class', 'mathquill4quill-mathquill-input');
      }

      function applyLatexInputStyles(latexInput) {
        latexInput.setAttribute('class', 'mathquill4quill-latex-input');
      }

      function syncMathquillToQuill(setLatexInputValue, saveButton) {
        const handlers =
          mathQuillConfig.handlers == null ? {} : mathQuillConfig.handlers;
        mathQuillConfig.handlers = {
          ...handlers,
          edit() {
            const latex = mqField?.latex() || '';
            setLatexInputValue(latex);
            setCacheItem(cacheKey, latex);
          },
          enter() {
            saveButton.click();
          },
        };
        const mathQuillField = MathQuill.getInterface(2).MathField(
          mqInput,
          mathQuillConfig,
        );

        const cachedLatex = getCacheItem(cacheKey);
        if (cachedLatex) {
          mathQuillField.latex(cachedLatex);
        }

        saveButton.addEventListener('click', () => {
          addItemToHistoryList(cacheKey);
          removeCacheItem(cacheKey);
        });

        return mathQuillField;
      }

      function autofocusFormulaField(mathQuillField) {
        if (!autofocus) {
          return;
        }

        window.setTimeout(() => mathQuillField.focus(), 1);
      }

      return {
        render() {
          if (mqInput != null) {
            return null;
          }

          const latexInput = getLatexInput();
          const saveButton = getSaveButton();

          mqInput = document.createElement('span');
          applyMathquillInputStyles(mqInput);

          latexInputStyle = latexInput.className;
          applyLatexInputStyles(latexInput);
          const setLatexInputValue = value => {
            latexInput.value = value;
          };
          mqField = syncMathquillToQuill(setLatexInputValue, saveButton);
          autofocusFormulaField(mqField);

          insertAfter(mqInput, latexInput);
          return mqField;
        },
        destroy() {
          if (mqInput == null) {
            return;
          }

          const latexInput = getLatexInput();

          latexInput.setAttribute('class', latexInputStyle);

          mqInput.remove();
          mqInput = null;
        },
      };
    }

    function newOperatorButtons() {
      /*
       structured as
       {
         "Basic": {
            buttons: [
              [["\\pm","\\pm"],["\\pm","\\pm"]],
            ],
        },
         "Advanced": {
            buttons: [
              [["\\pm","\\pm"],["\\pm","\\pm"]],
            ],
        },
       }
      */
      const operators = options.operators || [];

      let mainContainer = null;
      let headerContainer = null;
      let buttonContainer = null;
      let footer = null;
      let inputContainer = null;

      function applyOperatorMainContainerStyles(container) {
        container.setAttribute(
          'class',
          'mathquill4quill-operator-main-container',
        );
      }
      function applyOperatorFooterStyles(container) {
        container.setAttribute('class', 'mathquill4quill-operator-footer');
      }
      function applyOperatorHeaderContainerStyles(container) {
        container.setAttribute(
          'class',
          'mathquill4quill-operator-header-container',
        );
      }
      Object.keys(operators).forEach(key => {
        operators[
          key
        ].applyOperatorButtonStyles = function applyOperatorButtonStyles(
          button,
        ) {
          button.setAttribute('class', 'mathquill4quill-operator-button');
        };
        operators[
          key
        ].applyOperatorContainerStyles = function applyOperatorContainerStyles(
          container,
        ) {
          container.setAttribute(
            'class',
            'mathquill4quill-operator-container hidden',
          );
          container.setAttribute('id', key);
        };
      });

      function createOperatorButton(element, mqField) {
        const displayOperator = element[0];
        const operator = element[1];

        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('data-value', operator);

        katex.render(displayOperator, button, {
          throwOnError: false,
        });
        button.onclick = () => {
          if (isOperatorCommand(operator)) {
            mqField.cmd(operator);
          } else {
            mqField.write(operator);
          }
          mqField.focus();
        };

        return button;
      }

      return {
        render(mqField) {
          if (inputContainer != null || operators.length === 0) {
            return;
          }
          const tooltip = getTooltip();
          mainContainer = document.createElement('div');
          applyOperatorMainContainerStyles(mainContainer);

          // header goes headerContainer
          headerContainer = document.createElement('div');
          applyOperatorHeaderContainerStyles(headerContainer);
          mainContainer.appendChild(headerContainer);
          // create a nav
          const navContainer = document.createElement('nav');
          headerContainer.appendChild(navContainer);
          // inside nav create unordered list
          const navbar = document.createElement('ul');
          navContainer.appendChild(navbar);

          // scrollables all to footer
          footer = document.createElement('div');
          applyOperatorFooterStyles(footer);
          mainContainer.appendChild(footer);
          Object.keys(operators).forEach(key => {
            // inside ul create a three list item then append all anchor tags below
            const navList = document.createElement('li');
            navbar.appendChild(navList);
            const basicLink = document.createElement('a');
            const basicText = document.createTextNode(key);
            basicLink.setAttribute('id', key);
            basicLink.appendChild(basicText);
            basicLink.onclick = () => {
              operators[key].buttonLink.classList.add('selected');
              operators[key].container.classList.remove('hidden');
              Object.keys(operators).forEach(otherKey => {
                if (key === otherKey) return;
                operators[otherKey].buttonLink.classList.remove('selected');
                operators[otherKey].container.classList.add('hidden');
              });
            };
            navList.appendChild(basicLink);

            inputContainer = document.createElement('div');
            operators[key].applyOperatorContainerStyles(inputContainer);
            buttonContainer = document.createElement('div');
            inputContainer.appendChild(buttonContainer);
            footer.appendChild(inputContainer);

            operators[key].container = inputContainer;
            operators[key].buttonLink = basicLink;

            // create the buttons
            operators[key].buttons.forEach(element => {
              const button = createOperatorButton(element, mqField);
              operators[key].applyOperatorButtonStyles(button);
              inputContainer.appendChild(button);
            });
          });
          operators[Object.keys(operators)[0]].buttonLink.classList.add(
            'selected',
          );
          operators[Object.keys(operators)[0]].container.classList.remove(
            'hidden',
          );
          tooltip.appendChild(mainContainer);
        },
        destroy() {
          if (inputContainer == null) {
            return;
          }

          inputContainer.remove();
          inputContainer = null;
          mainContainer.remove();
          mainContainer = null;
        },
      };
    }

    function newHistoryList() {
      const history = historyList || [];
      let historyDiv = null;

      function applyHistoryButtonStyles(button) {
        button.setAttribute('class', 'mathquill4quill-history-button');
      }

      function applyHistoryContainerStyles(container) {
        container.setAttribute('class', 'mathquill4quill-history-container');
      }
      function fixToolTipHeight() {
        const tooltip = getTooltip();

        if (
          tooltip.getBoundingClientRect().top -
            quill.container.getBoundingClientRect().top <
          0
        ) {
          tooltip.style.top = '0px';
        }
      }
      function createHistoryButton(latex, mqField) {
        const button = document.createElement('button');
        button.setAttribute('type', 'button');

        katex.render(latex, button, {
          throwOnError: false,
        });
        button.onclick = () => {
          mqField.write(latex);
          mqField.focus();
        };

        return button;
      }

      return {
        render(mqField) {
          fixToolTipHeight();

          if (historyDiv != null || !displayHistory || history.length === 0) {
            return;
          }

          const tooltip = getTooltip();

          historyDiv = document.createElement('div');
          const container = document.createElement('div');
          applyHistoryContainerStyles(container);
          const header = document.createElement('p');
          header.innerHTML = `Past formulas (max ${historySize})`;
          historyDiv.appendChild(header);

          history.forEach(element => {
            const button = createHistoryButton(element, mqField);
            applyHistoryButtonStyles(button);
            container.appendChild(button);
          });
          historyDiv.appendChild(container);
          tooltip.appendChild(historyDiv);
        },
        destroy() {
          if (historyDiv == null) {
            return;
          }

          historyDiv.remove();
          historyDiv = null;
        },
      };
    }

    const tooltip = getTooltip();

    const mqInput = newMathquillInput();
    const operatorButtons = newOperatorButtons();
    const historyListButtons = newHistoryList();

    const observer = new MutationObserver(() => {
      const isFormulaTooltipActive =
        !tooltip.classList.contains('ql-hidden') &&
        tooltip.attributes['data-mode'] &&
        tooltip.attributes['data-mode'].value === 'formula';

      if (isFormulaTooltipActive) {
        const mqField = mqInput.render();
        operatorButtons.render(mqField);
        historyListButtons.render(mqField);
      } else {
        mqInput.destroy();
        operatorButtons.destroy();
        historyListButtons.destroy();
      }
    });

    observer.observe(tooltip, {
      attributes: true,
      attributeFilter: ['class', 'data-mode'],
    });
  }

  return enableMathQuillFormulaAuthoring;
};

export const operators = CUSTOM_OPERATORS;
export const { mathquill4quill } = window;
