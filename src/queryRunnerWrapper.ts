/**
 * Wraps the original TypeORM query runner to intercept some calls
 * and manipulate the transactional context.
 */
import { QueryRunner } from 'typeorm';

interface QueryRunnerWrapper extends QueryRunner {
  releaseQueryRunner(): Promise<void>;
}

const wrap = (originalQueryRunner: QueryRunner): QueryRunnerWrapper => {
  const originalRelease = originalQueryRunner.release.bind(originalQueryRunner);
  originalQueryRunner.release = () => {
    return Promise.resolve();
  };

  (originalQueryRunner as QueryRunnerWrapper).releaseQueryRunner = () => {
    originalQueryRunner.release = originalRelease;
    return originalQueryRunner.release();
  };

  return originalQueryRunner as QueryRunnerWrapper;
};

export { QueryRunnerWrapper, wrap };
