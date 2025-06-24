//lower number = higher priority
function runPriority() {  
  if (processes.length === 0 || interval) return;

  window.resetSimulationUI(); // clear UI and reset clock

  const queue = [...processes].map(p => ({
    ...p,
    remaining: p.burst,
    completed: false,
  }));

  let results = [];
  let completed = 0;
  window.clock = 0;
  let currentProcess = null;

  // Create a color map for consistent process colors
  const processColorMap = {};
  processes.forEach((p, index) => {
    processColorMap[p.pid] = window.COLORS[index % window.COLORS.length];
  });

  window.interval = setInterval(() => {
    // Get ready queue (arrived and not completed)
    const readyQueue = queue.filter(p => p.arrival <= window.clock && !p.completed);

    if (readyQueue.length > 0) {
      // Preempt: always pick the highest-priority process (lower number = higher priority)
      readyQueue.sort((a, b) => a.priority - b.priority || a.arrival - b.arrival);

      // Check for preemption - switch if different process has higher priority
      if (!currentProcess || currentProcess.pid !== readyQueue[0].pid) {
        currentProcess = readyQueue[0];
      }

      // Execute one unit of time
      currentProcess.remaining--;

      // Use consistent color for each process
      window.appendGanttBlock(
        currentProcess.pid,
        processColorMap[currentProcess.pid],
        `Time ${window.clock}: ${currentProcess.pid} (Priority: ${currentProcess.priority})`,
        window.clock
      );

      // If process completed
      if (currentProcess.remaining === 0) {
        currentProcess.completion = window.clock + 1;
        currentProcess.turnaround = currentProcess.completion - currentProcess.arrival;
        currentProcess.waiting = currentProcess.turnaround - currentProcess.burst;
        currentProcess.completed = true;
        results.push(currentProcess);
        completed++;
        currentProcess = null;
      }

    } else {
      // System idle - no processes ready
      window.appendGanttBlock("Idle", "#aaa", `Time ${window.clock}: Idle`, window.clock);
    }

    // Increment clock
    window.clock++;

    // Check if all processes completed
    if (completed === queue.length) {
      clearInterval(window.interval);
      window.interval = null;
      window.appendFinalTimeLabel();
      window.displayResults(results);
    }
  }, 500);
}
