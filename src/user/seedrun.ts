import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { user } from './entity/user.entity';
import { role } from '../role/entity/role.entity';

dotenv.config();

async function runSeed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'yourpass',
    database: process.env.DB_NAME || 'fullapp',
    entities: [user, role],
    synchronize: true,
  });
  await dataSource.initialize();

  try {
    const repo = dataSource.getRepository(user);
    const roleRepo = dataSource.getRepository(role);
    const email = 'superadmin@example.com';
    const password = 'admin@123';

    let superAdminRole = await roleRepo.findOne({ where: { name: 'SUPERADMIN' } });
    if (!superAdminRole) {
      superAdminRole = roleRepo.create({
        name: 'SUPERADMIN',
        status: true,
      });
      await roleRepo.save(superAdminRole);
    }

    const hashed = await bcrypt.hash(password, 10);
    const entity = repo.create({
      role: superAdminRole,
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
