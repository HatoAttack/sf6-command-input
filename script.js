
    // 定数
    const ARROW_MAP = {
      '1': '↙', '2': '↓', '3': '↘',
      '4': '←', '5': 'N', '6': '→',
      '7': '↖', '8': '↑', '9': '↗'
    };
    
    // UI要素の参照
    const directionGrid = document.getElementById('directionGrid');
    const specialDirections = document.getElementById('specialDirections');
    const classicButtons = document.getElementById('classicButtons');
    const modernButtons = document.getElementById('modernButtons');
    const saButtons = document.getElementById('saButtons');
    const saButtonsModern = document.getElementById('saButtonsModern');
    const specialInputs = document.getElementById('specialInputs');
    const specialCommandButtons = document.getElementById('specialCommandButtons');
    const specialCommandButtonsModern = document.getElementById('specialCommandButtonsModern');
    const additionalInputs = document.getElementById('additionalInputs');
    const outputBox = document.getElementById('output');
    const memoBox = document.getElementById('memo');
    const customInputField = document.getElementById('customInputField');
    
    // 状態管理
    let output = '';
    let history = [];
    let lastWasDirection = false;
    let customText = "";
    let savedCombos = [];
    let untitledCounter = 1;
    
    // 方向キーグリッド初期化
    function initDirectionGrid() {
      for (let i = 7; i <= 9; i++) {
        createDirectionButton(i);
      }
      for (let i = 4; i <= 6; i++) {
        createDirectionButton(i);
      }
      for (let i = 1; i <= 3; i++) {
        createDirectionButton(i);
      }
    }
    
    function createDirectionButton(value) {
      const button = document.createElement('button');
      button.className = 'direction-button';
      button.setAttribute('data-value', value);
      button.textContent = ARROW_MAP[value];
      button.onclick = () => addInput(value.toString());
      directionGrid.appendChild(button);
    }
    
    // 特殊方向入力初期化
    function initSpecialDirections() {
      const commands = [
        { text: '波動', value: '236' },
        { text: '昇龍', value: '623' },
        { text: '竜巻', value: '214' },
        { text: '逆昇龍', value: '412' },
        { text: 'ヨガ', value: '41236' },
        { text: '逆ヨガ', value: '63214' },
        { text: 'タメ', value: 'タメ' },
        { text: '1回転', value: '1回転' },
        { text: '2回転', value: '2回転' }
      ];
      
      commands.forEach(cmd => {
        const button = document.createElement('button');
        button.textContent = cmd.text;
        button.onclick = () => addInput(cmd.value);
        specialDirections.appendChild(button);
      });
    }
    
    // 特殊コマンドボタン初期化
    function initSpecialCommandButtons() {
      const commands = [
        { text: '＋', value: '+' },
        { text: '＞(次)', value: ' > ' }
      ];
      
      // クラシックモード用
      const container = document.getElementById('specialCommandButtons');
      commands.forEach(cmd => {
        const button = document.createElement('button');
        button.textContent = cmd.text;
        button.onclick = () => addInput(cmd.value);
        container.appendChild(button);
      });
      
      // 3つ目のボタンはプレースホルダーとして追加（グリッドを整える）
      const placeholderButton = document.createElement('button');
      placeholderButton.style.visibility = 'hidden';
      container.appendChild(placeholderButton);
      
      // モダンモード用も同じボタンを複製
      const containerModern = document.getElementById('specialCommandButtonsModern');
      commands.forEach(cmd => {
        const button = document.createElement('button');
        button.textContent = cmd.text;
        button.onclick = () => addInput(cmd.value);
        containerModern.appendChild(button);
      });
      
      // 3つ目のボタンはプレースホルダーとして追加（グリッドを整える）
      const placeholderButtonModern = document.createElement('button');
      placeholderButtonModern.style.visibility = 'hidden';
      containerModern.appendChild(placeholderButtonModern);
    }
    
    
    function initAttackButtons() {
      
      const classicAttacks = [
        { text: 'P', value: 'P', class: 'btn-pk-essential' },
        { text: '小P', value: '小P', class: 'btn-small' },
        { text: '中P', value: '中P', class: 'btn-middle' },
        { text: '大P', value: '大P', class: 'btn-large' },
        { text: 'K', value: 'K', class: 'btn-pk-essential' },
        { text: '小K', value: '小K', class: 'btn-small' },
        { text: '中K', value: '中K', class: 'btn-middle' },
        { text: '大K', value: '大K', class: 'btn-large' }
      ];
      
      classicAttacks.forEach(atk => {
        const button = document.createElement('button');
        button.textContent = atk.text;
        button.className = `btn-attack ${atk.class}`;
        button.onclick = () => addInput(atk.value, true);
        classicButtons.appendChild(button);
      });
      
      
      const modernAttacks = [
        { text: '弱', value: '弱', class: 'btn-small' },
        { text: '中', value: '中', class: 'btn-middle' },
        { text: '強', value: '強', class: 'btn-large' },
        { text: '必殺', value: '必殺', class: 'btn-pk-essential' },
        { text: 'アシスト', value: 'アシスト', class: '' }
      ];
      
      
      modernAttacks.forEach(atk => {
        const button = document.createElement('button');
        button.textContent = atk.text;
        if (atk.class) button.className = `btn-attack ${atk.class}`;
        button.onclick = () => addInput(atk.value, true);
        modernButtons.appendChild(button);
      });
      
      
      const createSAButtons = (container) => {
        for (let i = 1; i <= 3; i++) {
          const button = document.createElement('button');
          button.textContent = `SA${i}`;
          button.onclick = () => addInput(`SA${i}`);
          container.appendChild(button);
        }
      };
      
      createSAButtons(saButtons);
      createSAButtons(saButtonsModern);
    }
    
    
    function initSpecialInputs() {
      const inputs = [
        { text: 'キャンセルラッシュ', value: '(CR)', longText: true },
        { text: 'ドライブラッシュ', value: '(DR)', longText: true },
        { text: 'ジャンプ', value: 'J' },
        { text: '前ジャンプ', value: '前J' },
        { text: '前ステ', value: '(前ステ)' },
        { text: '近距離', value: '(近距離)' },
        { text: '遅らせ', value: '(遅らせ)' },
        { text: '微歩き', value: '(微歩き)' },
        { text: 'カウンター時', value: '(カウンター時)' },
        { text: 'パニカン時', value: '(パニカン時)' }
      ];
      
      inputs.forEach(inp => {
        const button = document.createElement('button');
        button.textContent = inp.text;
        if (inp.longText) {
          button.className = 'long-text-button';
        }
        button.onclick = () => addInput(inp.value);
        specialInputs.appendChild(button);
      });
    }
    
    
    function getMode() {
      return document.querySelector('input[name="mode"]:checked').value;
    }
    
    function convertToArrow(seq) {
      return seq.split('').map(c => ARROW_MAP[c] || c).join('');
    }
    
    
    function addInput(value, isAttack = false) {
      history.push(output);
      let mode = getMode();
      let insert = value;
      
      if (!isNaN(value)) {
        insert = (mode === 'arrow') ? convertToArrow(value) : value;
        lastWasDirection = true;
      } else if (isAttack && lastWasDirection) {
        insert = (mode === 'arrow') ? '+' + value : value;
        lastWasDirection = false;
      } else {
        lastWasDirection = false;
      }
      
      output += insert;
      outputBox.textContent = output;
      saveState();
    }
    
    
    function addCustomInput() {
      const inputValue = customInputField.value.trim();
      
      if (inputValue === "") {
        alert("入力内容を入力してください");
        return;
      }
      
      addInput(inputValue);
      customInputField.value = ""; 
    }
    
    function customInput() {
      if (customText === "") {
        let userInput = prompt("任意の入力をしてください");
        if (userInput !== null && userInput.trim() !== "") {
          customText = userInput.trim();
          let btn = document.getElementById("customInputButton");
          btn.textContent = customText;
          btn.style.color = "red";
        } else {
          return;
        }
      }
      addInput(customText);
    }
    
    function undoOutput() {
      if (history.length > 0) {
        output = history.pop();
        outputBox.textContent = output;
        saveState();
      }
    }
    
    function copyOutput() {
      navigator.clipboard.writeText(output + '\n' + memoBox.value);
      alert('コピーしました');
    }
    
    function clearOutput() {
      output = '';
      outputBox.textContent = '';
      memoBox.value = '';
      lastWasDirection = false;
      history = [];
      localStorage.removeItem('sf6_output');
      localStorage.removeItem('sf6_memo');
    }
    
    function saveState() {
      localStorage.setItem('sf6_output', output);
      localStorage.setItem('sf6_memo', memoBox.value);
    }
    
    function convertOutputMode() {
      let mode = getMode();
      let newOutput = output;
      
      if (mode === 'arrow') {
        newOutput = newOutput.replace(/[123456789]/g, m => ARROW_MAP[m]);
        newOutput = newOutput.replace(/([↖↗↙↘←→↑↓N])([A-Za-z一-龥])/g, '$1+$2');
      } else {
        const reverseMap = Object.fromEntries(Object.entries(ARROW_MAP).map(([k, v]) => [v, k]));
        newOutput = newOutput.replace(/[↖↗↙↘←→↑↓N]/g, m => reverseMap[m] || m);
        newOutput = newOutput.replace(/([1-9])\+([A-Za-z一-龥])/g, '$1$2');
      }
      
      output = newOutput;
      outputBox.textContent = output;
      saveState();
    }
    
    
    function updateDirectionButtons() {
      const mode = getMode();
      const buttons = document.querySelectorAll('.direction-button');
      
      buttons.forEach(button => {
        const value = button.getAttribute('data-value');
        button.textContent = mode === 'arrow' ? (ARROW_MAP[value] || value) : value;
      });
    }
    
    
    function formatDate() {
      let now = new Date();
      let year = now.getFullYear();
      let month = String(now.getMonth() + 1).padStart(2, '0');
      let day = String(now.getDate()).padStart(2, '0');
      let hour = String(now.getHours()).padStart(2, '0');
      let minute = String(now.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hour}:${minute}`;
    }
    
    function generateID() {
      let now = new Date();
      let dateStr = now.getFullYear() +
                    String(now.getMonth() + 1).padStart(2, '0') +
                    String(now.getDate()).padStart(2, '0') +
                    String(now.getHours()).padStart(2, '0') +
                    String(now.getMinutes()).padStart(2, '0');
      return parseInt(dateStr, 10).toString(16);
    }
    
    function saveCurrentCombo() {
      let combo = output;
      let memoText = memoBox.value;
      
      if (combo.trim() === "") {
        alert("コンボが入力されていません。");
        return;
      }
      
      let titleInput = prompt("コンボのタイトルを入力してください。（空欄の場合は自動で『無題』が割り当てられます）");
      if (titleInput === null) return;
      
      let title = titleInput.trim() === "" ? "無題" + untitledCounter++ : titleInput.trim();
      let nowFormatted = formatDate();
      
      
      let existing = savedCombos.find(item => item.title === title);
      if (existing) {
        existing.combo = combo;
        existing.memo = memoText;
        existing.updatedAt = nowFormatted;
        alert("既存のコンボを上書きしました。");
      } else {
        savedCombos.push({
          id: generateID(),
          title: title,
          combo: combo,
          memo: memoText,
          createdAt: nowFormatted,
          updatedAt: nowFormatted
        });
        alert("新しいコンボが保存されました。");
      }
    }
    
    function exportCombosToCSV(comboArray) {
      if (comboArray.length === 0) {
        alert("保存されたコンボがありません。");
        return;
      }
      
      let csvContent = "ID,タイトル,コンボ,メモ,作成日時,更新日時\n";
      comboArray.forEach(item => {
        csvContent += `${item.id},${item.title},${item.combo},${item.memo},${item.createdAt},${item.updatedAt}\n`;
      });
      
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "combos.csv";
      a.click();
      URL.revokeObjectURL(url);
    }
    
    function handleFileSelect(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = function(e) {
        const text = e.target.result;
        const lines = text.split("\n").filter(line => line.trim() !== "");
        
        if (lines.length <= 1) {
          alert("有効なコンボデータがCSVに見つかりませんでした。");
          return;
        }
        
        let newCombos = [];
        for (let i = 1; i < lines.length; i++) {
          const [id, title, combo, memo, createdAt, updatedAt] = lines[i].split(",");
          if (id) {
            newCombos.push({ id, title, combo, memo, createdAt, updatedAt });
          }
        }
        
        savedCombos = newCombos;
        alert(`${newCombos.length}件のコンボデータが読み込まれました。`);
      };
      
      reader.readAsText(file, "UTF-8");
    }
    
    
    document.querySelectorAll('input[name="mode"]').forEach(radio => {
      radio.addEventListener('change', () => {
        convertOutputMode();
        updateDirectionButtons();
      });
    });
    
    document.querySelectorAll('input[name="style"]').forEach(radio => {
      radio.addEventListener('change', () => {
        const style = document.querySelector('input[name="style"]:checked').value;
        document.getElementById('classic-buttons').style.display = (style === 'classic') ? 'block' : 'none';
        document.getElementById('modern-buttons').style.display = (style === 'modern') ? 'block' : 'none';
      });
    });
    
    
    document.addEventListener("keydown", function(event) {
      if (document.activeElement !== memoBox && 
          document.activeElement !== customInputField && 
          event.key === "Enter") {
        event.preventDefault();
        addInput(' > ');
      }
    });
    
    
    function initCollapsibles() {
      const collapsibles = document.querySelectorAll('.collapsible');
      
      collapsibles.forEach(item => {
        
        item.addEventListener('click', function() {
          this.classList.toggle('collapsed');
          
          
          const id = this.id;
          if (id) {
            localStorage.setItem(`sf6_collapsed_${id}`, this.classList.contains('collapsed'));
          }
        });
        
        
        const id = item.id;
        if (id && localStorage.getItem(`sf6_collapsed_${id}`) === 'true') {
          item.classList.add('collapsed');
        }
      });
    }
    
    
    function init() {
      initDirectionGrid();
      initSpecialDirections();
      initAttackButtons();
      initSpecialInputs();
      initSpecialCommandButtons();
      initCollapsibles();
      updateDirectionButtons();
      
      
      const savedOutput = localStorage.getItem('sf6_output');
      const savedMemo = localStorage.getItem('sf6_memo');
      
      if (savedOutput) {
        output = savedOutput;
        outputBox.textContent = output;
      }
      
      if (savedMemo) {
        memoBox.value = savedMemo;
      }
    }
    
    
    init();
  