import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { user } from './entity/user.entity';

async function runSeed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Pratham@21',
    database: 'fullapp',
    entities: [user],
    synchronize: true,
  });
  await dataSource.initialize();

  try {
    const repo = dataSource.getRepository(user);
    const email = 'superadmin@example.com';
    const password = 'admin@123';

    const hashed = await bcrypt.hash(password, 10);
    const entity = repo.create({
      role: 'SUPERADMIN',
      email,
      pass: hashed,
    });
    await repo.save(entity);
    console.log('Superadmin created successfully:', email);
  } catch (error: any) {
    console.error('Seed runner error:', error.message);
  }
}
void runSeed();
