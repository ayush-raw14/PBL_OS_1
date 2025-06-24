function runRR(processes, quantum) {
  window.resetSimulationUI();
  if (processes.length === 0) return alert("Add some processes first.");
  if (!quantum || quantum <= 0) return alert("Time quantum must be positive.");

  let queue = [...processes].map(p => ({ ...p, remaining: p.burst, addedToQueue: false }));
  let readyQueue = [];
  window.clock = 0;
  let results = [];
  let currentProcess = null;
  let timeSlice = 0;

  const processColorMap = {};
  processes.forEach((p, index) => {
    processColorMap[p.pid] = window.COLORS[index % window.COLORS.length];
  });

  window.interval = setInterval(() => {
    queue.forEach(p => {
      if (p.arrival === window.clock && !p.addedToQueue) {
        readyQueue.push(p);
        p.addedToQueue = true;
      }
    });

    if (!currentProcess && readyQueue.length > 0) {
      currentProcess = readyQueue.shift();
      if (!currentProcess.startTime) currentProcess.startTime = window.clock;
      timeSlice = 0;
    }

    if (currentProcess) {
      window.appendGanttBlock(currentProcess.pid, processColorMap[currentProcess.pid], `Time ${window.clock}: ${currentProcess.pid}`);
      currentProcess.remaining--;
      timeSlice++;

      if (currentProcess.remaining === 0) {
        currentProcess.completion = window.clock + 1;
        currentProcess.turnaround = currentProcess.completion - currentProcess.arrival;
        currentProcess.waiting = currentProcess.turnaround - currentProcess.burst;
        results.push(currentProcess);
        currentProcess = null;
        timeSlice = 0;
      } else if (timeSlice === quantum) {
        readyQueue.push(currentProcess);
        currentProcess = null;
        timeSlice = 0;
      }
    } else {
      window.appendGanttBlock("Idle", "#aaa", `Time ${window.clock}: Idle`);
    }

    window.clock++;

    if (queue.every(p => p.remaining === 0) && readyQueue.length === 0 && !currentProcess) {
      clearInterval(window.interval);
      window.interval = null;
      window.appendFinalTimeLabel();
      window.displayResults(results);
    }
  }, 500);
}
