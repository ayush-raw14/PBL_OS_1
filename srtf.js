function runSRTF(processes) {
  window.resetSimulationUI();
  if (processes.length === 0) return alert("Add some processes first.");

  let queue = [...processes].map(p => ({ ...p, remaining: p.burst }));
  let completed = [];
  window.clock = 0;
  let currentProcess = null;

  const processColorMap = {};
  processes.forEach((p, index) => {
    processColorMap[p.pid] = window.COLORS[index % window.COLORS.length];
  });

  window.interval = setInterval(() => {
    let available = queue.filter(p => p.arrival <= window.clock && p.remaining > 0);
    if (available.length > 0) {
      available.sort((a, b) => a.remaining - b.remaining || a.arrival - b.arrival);
      let nextProc = available[0];
      if (!currentProcess || currentProcess.pid !== nextProc.pid) {
        currentProcess = nextProc;
        if (!currentProcess.startTime) currentProcess.startTime = window.clock;
      }
    } else {
      currentProcess = null;
    }

    if (currentProcess) {
      window.appendGanttBlock(currentProcess.pid, processColorMap[currentProcess.pid], `Time ${window.clock}: ${currentProcess.pid} (Remaining: ${currentProcess.remaining})`);
      currentProcess.remaining--;
      if (currentProcess.remaining === 0) {
        currentProcess.completion = window.clock + 1;
        currentProcess.turnaround = currentProcess.completion - currentProcess.arrival;
        currentProcess.waiting = currentProcess.turnaround - currentProcess.burst;
        completed.push(currentProcess);
        currentProcess = null;
      }
    } else {
      window.appendGanttBlock("Idle", "#aaa", `Time ${window.clock}: Idle`);
    }

    window.clock++;

    if (completed.length === processes.length) {
      clearInterval(window.interval);
      window.interval = null;
      window.appendFinalTimeLabel();
      window.displayResults(completed);
    }
  }, 500);
}
