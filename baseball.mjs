export function battingTeam(state) {
  return state.half === 'TOP' ? 'away' : 'home';
}

export function addRuns(state, runs) {
  state[battingTeam(state)] += runs;
  return state.inning >= 9 && state.half === 'BOTTOM' && state.home > state.away;
}

export function advanceHalf(state) {
  if (state.inning >= 9 && (state.half === 'TOP' ? state.home > state.away : state.home !== state.away)) {
    return 'FINAL';
  }
  state.outs = 0;
  state.bases = [false, false, false];
  if (state.half === 'TOP') {
    state.half = 'BOTTOM';
  } else {
    state.half = 'TOP';
    state.inning++;
  }
  return state.half + ' ' + state.inning;
}

// Only runners forced by the batter's award advance on a walk.
export function awardWalk(bases) {
  let forced = true;
  for (let index = 0; index < bases.length && forced; index++) {
    forced = bases[index];
    bases[index] = true;
  }
  return Number(forced);
}
