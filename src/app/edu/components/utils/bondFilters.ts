import { Bond, BondCategory } from "../types/bond";

export const getFilteredBonds = (bonds: Bond[], category: BondCategory) => {
  switch (category) {
    case "short-tenure":
      return bonds.filter(bond => {
        const tenureYears = parseInt(bond.tenure.split(' ')[0]);
        return tenureYears <= 3;
      });
    case "high-rated":
      return bonds.filter(bond => bond.rating === "AAA");
    case "high-returns":
      return bonds.filter(bond => bond.currentYield >= 8.0).sort((a, b) => b.currentYield - a.currentYield);
    case "government-bonds":
      return bonds.filter(bond => bond.type === "Government");
    default:
      return bonds;
  }
};
