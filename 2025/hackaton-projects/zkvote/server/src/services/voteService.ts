// Voting service for ZKVote


class VoteService {
  private totalVoters: number = 0;
  private votes: Map<string, number> = new Map();

  setTotalVoters(total: number) {
    this.totalVoters = total;
    this.votes.clear();
  }

  clearVotes() {
    this.votes.clear();
  }

  registerVote(voterId: string, option: number) {
    this.votes.set(voterId, option);
  }

  getResults(options: string[]) {
    const counts = Array(options.length).fill(0);
    for (const vote of this.votes.values()) {
      if (typeof vote === 'number' && vote >= 0 && vote < options.length) {
        counts[vote]++;
      }
    }
    return {
      counts,
      total: this.votes.size,
      maxVoters: this.totalVoters
    };
  }
}

export const voteService = new VoteService();
