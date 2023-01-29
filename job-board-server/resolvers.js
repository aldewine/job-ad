import { Job, Company } from './db.js';

export const resolvers = {
    Query: {
      jobs: () => Job.findAll(),
      job: (_root, args) => Job.findById(args.jobId),
      company: (_root, args) => Company.findById(args.companyId),
    },

    Mutation: {
      createJob: (_root, { input }) => Job.create(input),
    },

    Job: {
      company: (job) => Company.findById(job.companyId), 
    },

    Company: {
      jobs: (company) => Job.findAll((job) => job.companyId === company.id),
    }
};
