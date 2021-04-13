// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return {
    specimenNum, 
    dna,
    mutate() {
      const currBaseIndex = Math.floor(Math.random() * 15);
      const randomIndex = Math.floor(Math.random() * 3);
      const base = dnaBases.filter(x => x !== this.dna[currBaseIndex])[randomIndex];
      this.dna[currBaseIndex] = base;
      return this.dna;
    },
    compareDNA(pAequor) {
      const commonDNA = this.dna.reduce((prev, curr, index) => {
        return prev + (this.dna[index] === pAequor.dna[index] ? 1 : 0);
      }, 0);

      console.log(`specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${Math.round(commonDNA / 15 * 100)}% DNA in common`);
    },
    willLikelySurvive() {
      const cChance = this.dna.filter(x => x === 'C').length / 15 * 100;
      const gChance = this.dna.filter(x => x === 'G').length / 15 * 100;
      return cChance >= 60 || gChance >= 60;
    }
  };
};

const pAequor1 = pAequorFactory(1, mockUpStrand());
const pAequor2 = pAequorFactory(2, mockUpStrand());
pAequor1.compareDNA(pAequor2);


const survivors = [];
let specimenNum = 1;
while (survivors.length < 30) {
  let pAequor = pAequorFactory(specimenNum, mockUpStrand());
  if (pAequor.willLikelySurvive()) {
    survivors.push(pAequor);
    specimenNum++;
  }
}
console.log(survivors.length); // should print 30
