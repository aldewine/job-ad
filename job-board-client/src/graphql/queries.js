import { request, gql } from 'graphql-request';
import { getAccessToken } from '../auth';

const GRAPHQL_URL = "http://localhost:9000/graphql";
  
export async function getJob(jobId) {
  const query = gql`
    query jobQuery($jobId: ID!) {
      job(jobId: $jobId) {
        id
        title
        company {
          id
          name
        }
        description
      }
    }
  `;

  const variables = { jobId };
  const { job } = await request(GRAPHQL_URL, query, variables);
  return job;
}

export async function getJobs() {
  const query = gql`
    query jobListQuery {
      jobs {
        id
        title
        description
        company {
          name
        }
      }
    }
  `;

  const { jobs } = await request(GRAPHQL_URL, query);
  return jobs;
}

export async function getCompany(companyId) {
  const query = gql`
    query companyQuery($companyId: ID!) {
      company(companyId: $companyId) {
        name
        description
        jobs {
          id
          title
          description
        }
      }
    }
  `;

  const variables = { companyId };
  const { company } = await request(GRAPHQL_URL, query, variables);
  return company;
}

export async function createJob(input) {
  const query = gql`
    mutation CreateJobMutation($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
      }
    }
  `;

  const variables = { input };
  const headers = { 'Authorization': 'Bearer ' + getAccessToken() }
  const { job } = await request(GRAPHQL_URL, query, variables, headers);
  return job;
}