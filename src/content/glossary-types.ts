export type Term = {
  id: string;
  term: string;
  also?: string;
  letter: string;
  definition: string;
  /** One line on why it matters to a business owner. Optional. */
  matters?: string;
  /** Slug of the service page this term belongs to. */
  service?: string;
  /** Ids of related terms. */
  related?: string[];
  /** True where the figure or rule moves with the Budget — re-check each February. */
  verify?: boolean;
};
