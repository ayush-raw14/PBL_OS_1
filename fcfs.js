function runFCFS(processes) {
  window.resetSimulationUI();
  if (processes.length === 0) return alert("Add some processes first.");

  let queue = [...processes].sort((a, b) => a.arrival - b.arrival);
  let index = 0;
  let currentProcess = null;
  let results = [];
  window.clock = 0;

  window.interval = setInterval(() => {
    if (!currentProcess && index < queue.length && queue[index].arrival <= window.clock) {
      currentProcess = { ...queue[index] };
      currentProcess.startTime = window.clock;
      queue[index].startTime = window.clock;
      index++;
    }

    if (currentProcess) {
      window.appendGanttBlock(currentProcess.pid, window.COLORS[results.length % window.COLORS.length], `Time ${window.clock}: ${currentProcess.pid}`);
      currentProcess.remaining--;
      if (currentProcess.remaining === 0) {
        currentProcess.completion = window.clock + 1;
        currentProcess.turnaround = currentProcess.completion - currentProcess.arrival;
        currentProcess.waiting = currentProcess.turnaround - currentProcess.burst;
        results.push(currentProcess);
        currentProcess = null;
      }
    } else {
      window.appendGanttBlock("Idle", "#aaa", `Time ${window.clock}: Idle`);
    }

    window.clock++;

    if (index >= queue.length && !currentProcess) {
      clearInterval(window.interval);
      window.interval = null;
      window.appendFinalTimeLabel();
      window.displayResults(results);
    }
  }, 500);
}
