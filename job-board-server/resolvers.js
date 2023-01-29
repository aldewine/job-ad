import { Job, Company, User } from './db.js';

function rejectIf(condition) {
  if(condition) {
    throw new Error("Unauthorized");
  }
}

export const resolvers = {
    Query: {
      jobs: () => Job.findAll(),
      job: (_root, args) => Job.findById(args.jobId),
      company: (_root, args) => Company.findById(args.companyId),
    },

    Mutation: {
      createJob: (_root, { input }, { user }) => {
        rejectIf(!user);
        return Job.create({ ...input, companyId: user.companyId });
      },
      deleteJob: async (_root, { jobId }, { user }) => {
        rejectIf(!user);
        const job = await Job.findById(jobId);
        rejectIf(user.companyId !== job.companyId);
        return Job.delete(jobId);
      },
      updateJob: async (_root, { input }, { user }) => {
        rejectIf(!user);
        const job = await Job.findById(input.id);
        rejectIf(user.companyId !== job.companyId);
        return Job.update({ ...input, companyId: user.companyId });
      },
    },

    Job: {
      company: (job) => Company.findById(job.companyId), 
    },

    Company: {
      jobs: (company) => Job.findAll((job) => job.companyId === company.id),
    }
};
