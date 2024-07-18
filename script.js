let timer;
    let isRunning = false;
    let startTime;
    let pausedTime = 0;
    let laps = [];
    
    const display = document.getElementById('display');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapsList = document.getElementById('laps');
    
    function formatTime(ms) {
        const date = new Date(ms);
        return date.toISOString().substr(11, 8);
    }
    
    function updateDisplay() {
        const elapsedTime = pausedTime + (isRunning ? Date.now() - startTime : 0);
        display.textContent = formatTime(elapsedTime);
    }
    
    function startTimer() {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    }
    
    function pauseTimer() {
        clearInterval(timer);
        pausedTime += Date.now() - startTime;
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
    
    function resetTimer() {
        clearInterval(timer);
        display.textContent = '00:00:00';
        pausedTime = 0;
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        resetBtn.disabled = true;
        lapBtn.disabled = true;
        laps = [];
        lapsList.innerHTML = '';
    }
    
    function lapTimer() {
        laps.unshift(formatTime(pausedTime + (isRunning ? Date.now() - startTime : 0)));
        const lapItem = document.createElement('li');
        lapItem.textContent = laps[0];
        lapsList.prepend(lapItem);
    }
    
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    lapBtn.addEventListener('click', lapTimer);

    window.tailwind.config = {
      darkMode: ['class'],
      theme: {
        extend: {
          colors: {
            border: 'hsl(var(--border))',
            input: 'hsl(var(--input))',
            ring: 'hsl(var(--ring))',
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            primary: {
              DEFAULT: 'hsl(var(--primary))',
              foreground: 'hsl(var(--primary-foreground))'
            },
            secondary: {
              DEFAULT: 'hsl(var(--secondary))',
              foreground: 'hsl(var(--secondary-foreground))'
            },
            destructive: {
              DEFAULT: 'hsl(var(--destructive))',
              foreground: 'hsl(var(--destructive-foreground))'
            },
            muted: {
              DEFAULT: 'hsl(var(--muted))',
              foreground: 'hsl(var(--muted-foreground))'
            },
            accent: {
              DEFAULT: 'hsl(var(--accent))',
              foreground: 'hsl(var(--accent-foreground))'
            },
            popover: {
              DEFAULT: 'hsl(var(--popover))',
              foreground: 'hsl(var(--popover-foreground))'
            },
            card: {
              DEFAULT: 'hsl(var(--card))',
              foreground: 'hsl(var(--card-foreground))'
            },
          },
        }
      }
    }